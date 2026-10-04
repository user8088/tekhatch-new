"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { stage, useTick } from "@/lib/stage";
import { clamp, smooth } from "@/lib/utils";

const N = 1600;
const NA = 96;
const ND = N - NA;
const TAU = Math.PI * 2;
const SPIN = 0.12;
/** Bar heights of the growth shape, one per milestone. */
const LEVELS = [5, 8, 12, 16, 21];
const BASE = -2.3;

// Particle behaviours within a shape
const STATIC = 0;
const HATCH = 1;
const DEBRIS = 2;
const ORBIT = 3;
const ELECTRON = 4;
const BAR = 5;
const RISER = 6;
const CITY = 7;

type Seed = {
  x?: number;
  y?: number;
  z?: number;
  type?: number;
  p1?: number;
  p2?: number;
  sc?: number;
};

type Targets = {
  pos: Float32Array;
  type: Uint8Array;
  p1: Float32Array;
  p2: Float32Array;
  sc: Float32Array;
};

function shuffle<T>(a: T[]) {
  for (let k = a.length - 1; k > 0; k--) {
    const r = (Math.random() * (k + 1)) | 0;
    [a[k], a[r]] = [a[r], a[k]];
  }
  return a;
}

function targets(n: number, seeds: Seed[]): Targets {
  const T = {
    pos: new Float32Array(n * 3),
    type: new Uint8Array(n),
    p1: new Float32Array(n),
    p2: new Float32Array(n),
    sc: new Float32Array(n).fill(1),
  };
  seeds.forEach((o, k) => {
    T.pos[k * 3] = o.x ?? 0;
    T.pos[k * 3 + 1] = o.y ?? 0;
    T.pos[k * 3 + 2] = o.z ?? 0;
    T.type[k] = o.type ?? STATIC;
    T.p1[k] = o.p1 ?? 0;
    T.p2[k] = o.p2 ?? 0;
    T.sc[k] = o.sc ?? 1;
  });
  return T;
}

/** The five formations the particles morph between: cube, atom, growth, city, globe. */
function buildShapes() {
  const shapes: { d: Targets; a: Targets }[] = [];

  // 0 CUBE — a shell with a hatch on the front face, ringed by debris
  {
    const S = 14, sp = 0.24, h = (S - 1) / 2;
    const shell: Seed[] = [], hatch: Seed[] = [];
    for (let x = 0; x < S; x++) for (let y = 0; y < S; y++) for (let z = 0; z < S; z++) {
      if (!(x === 0 || y === 0 || z === 0 || x === S - 1 || y === S - 1 || z === S - 1)) continue;
      const o: Seed = { x: (x - h) * sp, y: (y - h) * sp, z: (z - h) * sp };
      if (z === S - 1 && Math.abs(x - h) < 2.1 && Math.abs(y - h) < 2.1) {
        o.type = HATCH;
        hatch.push(o);
      } else shell.push(o);
    }
    shuffle(shell);
    const accShell = shell.splice(0, 30), darkList = shell.concat(hatch);
    const ringN = ND - darkList.length + (NA - 30), ring: Seed[] = [];
    for (let k = 0; k < ringN; k++) {
      ring.push({
        type: DEBRIS,
        y: ((Math.random() + Math.random() + Math.random() - 1.5) / 1.5) * 0.3,
        p1: Math.random() * TAU,
        p2: 2.7 + Math.random() * 1.7,
        sc: 0.4 + Math.random() * 0.25,
      });
    }
    shuffle(ring);
    const accRing = ring.splice(0, NA - 30);
    shapes.push({ d: targets(ND, darkList.concat(ring)), a: targets(NA, accShell.concat(accRing)) });
  }

  // 1 ATOM — a hollow nucleus with three orbits
  {
    const nuc: Seed[] = [], sp = 0.22;
    for (let x = -4; x <= 4; x++) for (let y = -4; y <= 4; y++) for (let z = -4; z <= 4; z++) {
      const r = Math.hypot(x, y, z) * sp;
      if (r < 0.86 && r > 0.4) nuc.push({ x: x * sp, y: y * sp, z: z * sp, sc: 0.95 });
    }
    const rest = ND - nuc.length, per = Math.ceil(rest / 3), orb: Seed[] = [];
    for (let k = 0; k < rest; k++) {
      orb.push({ type: ORBIT, p1: k % 3, p2: (Math.floor(k / 3) / per) * TAU, sc: 0.36 });
    }
    const el: Seed[] = [];
    for (let k = 0; k < NA; k++) {
      const ring = k % 3, c = Math.floor(k / 3);
      el.push({ type: ELECTRON, p1: ring, p2: ring * 2.1 - c * 0.045, sc: 0.75 - c * 0.018 });
    }
    shapes.push({ d: targets(ND, nuc.concat(orb)), a: targets(NA, el) });
  }

  // 2 GROWTH — five bars on a plate
  {
    const bars: Seed[] = [], plate: Seed[] = [];
    for (let b = 0; b < 5; b++) for (let l = 0; l < LEVELS[b]; l++) for (let ix = 0; ix < 4; ix++) for (let iz = 0; iz < 4; iz++) {
      bars.push({ type: BAR, x: (b - 2) * 1.45 + (ix - 1.5) * 0.24, z: (iz - 1.5) * 0.24, p1: b, p2: l });
    }
    const need = ND - bars.length, cols = 32, rows = Math.ceil(need / cols);
    for (let k = 0; k < need; k++) {
      plate.push({
        x: ((k % cols) - (cols - 1) / 2) * 0.24,
        y: BASE - 0.3,
        z: (Math.floor(k / cols) - (rows - 1) / 2) * 0.24,
        sc: 0.92,
      });
    }
    const ris: Seed[] = [];
    for (let k = 0; k < NA; k++) {
      const b = k % 5;
      ris.push({
        type: RISER,
        x: (b - 2) * 1.45 + (Math.random() - 0.5) * 0.9,
        z: (Math.random() - 0.5) * 0.9,
        p1: b,
        p2: Math.random(),
        sc: 0.55,
      });
    }
    shapes.push({ d: targets(ND, bars.concat(plate)), a: targets(NA, ris) });
  }

  // 3 CITY — a 40×40 grid of towers
  {
    const cells: Seed[] = shuffle(Array.from({ length: N }, (_, k) => k)).map((c) => ({
      type: CITY,
      p1: c % 40,
      p2: Math.floor(c / 40),
    }));
    shapes.push({
      d: targets(ND, cells.slice(0, ND)),
      a: targets(NA, cells.slice(ND).map((o) => ({ ...o, sc: 1.6 }))),
    });
  }

  // 4 GLOBE
  {
    const fib = (n: number, R: number, off: number, sc: number): Seed[] =>
      Array.from({ length: n }, (_, k) => {
        const phi = Math.acos(1 - (2 * (k + 0.5)) / n), th = Math.PI * (1 + Math.sqrt(5)) * (k + off);
        return { x: R * Math.sin(phi) * Math.cos(th), y: R * Math.cos(phi), z: R * Math.sin(phi) * Math.sin(th), sc };
      });
    shapes.push({ d: targets(ND, fib(ND, 2.35, 0, 0.62)), a: targets(NA, fib(NA, 2.42, 0.37, 0.8)) });
  }

  return shapes;
}

// The design's colours are tuned as raw linear values, so skip the sRGB conversion.
const lin = (hex: string) => new THREE.Color().setStyle(hex, THREE.LinearSRGBColorSpace);

function createScene(host: HTMLDivElement) {
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  host.appendChild(renderer.domElement);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(32, window.innerWidth / window.innerHeight, 0.1, 100);
  camera.position.set(0, 0, 13);

  const shapes = buildShapes();

  const geo = new THREE.BoxGeometry(0.2, 0.2, 0.2);
  const darkMat = new THREE.MeshStandardMaterial({ color: lin("#16181D"), metalness: 0.75, roughness: 0.32 });
  const accMat = new THREE.MeshBasicMaterial({ color: 0xffffff, toneMapped: false });
  const dark = new THREE.InstancedMesh(geo, darkMat, ND);
  const accent = new THREE.InstancedMesh(geo, accMat, NA);
  [dark, accent].forEach((m) => {
    m.instanceMatrix.setUsage(THREE.DynamicDrawUsage);
    m.frustumCulled = false;
  });
  for (let k = 0; k < NA; k++) accent.setColorAt(k, lin(Math.random() < 0.6 ? "#F97316" : "#0EA5E9"));
  if (accent.instanceColor) accent.instanceColor.needsUpdate = true;

  const group = new THREE.Group();
  group.add(dark, accent);
  scene.add(group);

  const core = new THREE.Group();
  const coreMat = new THREE.MeshBasicMaterial({ color: lin("#FFB27A"), toneMapped: false });
  const coreGeos = [new THREE.SphereGeometry(0.42, 32, 32)];
  core.add(new THREE.Mesh(coreGeos[0], coreMat));
  const glowMats = [[0.85, 0.28], [1.4, 0.1], [2.2, 0.05]].map(([r, opacity]) => {
    const m = new THREE.MeshBasicMaterial({
      color: lin("#F97316"),
      transparent: true,
      opacity,
      blending: THREE.AdditiveBlending,
      depthWrite: false,
      toneMapped: false,
    });
    const g = new THREE.SphereGeometry(r, 32, 32);
    coreGeos.push(g);
    core.add(new THREE.Mesh(g, m));
    return m;
  });
  group.add(core);

  // Intensities are the design's (pre-physical-lighting) values scaled to three's current units.
  const coreLight = new THREE.PointLight(lin("#F97316"), 0, 7, 1);
  group.add(coreLight);
  scene.add(new THREE.AmbientLight(0xffffff, 0.12 * Math.PI));
  const key = new THREE.DirectionalLight(0xffffff, 0.75 * Math.PI);
  key.position.set(3, 5, 6);
  scene.add(key);
  const rim = new THREE.DirectionalLight(lin("#0EA5E9"), Math.PI);
  rim.position.set(-6, -2, -4);
  scene.add(rim);
  const warm = new THREE.PointLight(lin("#F97316"), 3.6, 30, 0);
  warm.position.set(5, -3, 4);
  scene.add(warm);

  // Live position / scale / rotation per particle, and the snapshot each morph starts from
  const P = new Float32Array(N * 3), SC = new Float32Array(N * 3), Q = new Float32Array(N * 4);
  const PP = new Float32Array(N * 3), PS = new Float32Array(N * 3), PQ = new Float32Array(N * 4);
  const R = new Float32Array(N), DIR = new Float32Array(N * 3);
  const e = new THREE.Euler(), tq = new THREE.Quaternion();
  for (let k = 0; k < N; k++) {
    P.set([(Math.random() * 2 - 1) * 9, (Math.random() * 2 - 1) * 4.5, -6 + Math.random() * 9], k * 3);
    R[k] = Math.random();
    const a = Math.random() * TAU, b = Math.acos(Math.random() * 2 - 1);
    DIR.set([Math.sin(b) * Math.cos(a), Math.cos(b), Math.sin(b) * Math.sin(a)], k * 3);
    e.set(Math.random() * 6, Math.random() * 6, Math.random() * 6);
    tq.setFromEuler(e);
    tq.toArray(PQ, k * 4);
    tq.toArray(Q, k * 4);
    const s0 = 0.5 + R[k] * 0.9;
    PS.set([s0, s0, s0], k * 3);
    SC.set([s0, s0, s0], k * 3);
  }
  PP.set(P);

  const dummy = new THREE.Object3D(), v = new THREE.Vector3();
  const gq = new THREE.Quaternion(), sq = new THREE.Quaternion(), rq = new THREE.Quaternion();
  const tmp4 = [0, 0, 0, 0];
  const holdUntil = performance.now() + 700;
  let sections: HTMLElement[] = [];
  let tp = 0, lastShape = 0, mess = 0, open = 0, glow = 1, twist = 0, coreS = 0;

  function update(t: number) {
    const vw = window.innerWidth, vh = window.innerHeight;
    if (!sections.length) sections = Array.from(document.querySelectorAll<HTMLElement>("[data-morph]"));
    let secIdx = 0, target = 0, glowT = 1;
    sections.forEach((s, i) => {
      const r = s.getBoundingClientRect();
      if (r.top <= vh * 0.5 && r.bottom > vh * 0.5) {
        secIdx = i;
        target = Number(s.dataset.morph);
        glowT = Number(s.dataset.glow);
      }
    });
    const sid = sections[secIdx]?.id ?? "";
    stage.section = sid;

    const now = performance.now();
    const shape = now > holdUntil ? target : 0;
    if (shape !== lastShape) {
      lastShape = shape;
      PP.set(P);
      PS.set(SC);
      PQ.set(Q);
      tp = 0;
      mess = 0.85;
    }
    if (now > holdUntil) tp = Math.min(1, tp + (1 - tp) * 0.035 + 0.0012);

    // The hatch is wide open on the hero and contact, and scrubs open through the manifesto.
    const onManifesto = sid === "manifesto";
    const edge = secIdx === 0 || secIdx === sections.length - 1;
    const openT = shape !== 0 ? 0 : onManifesto ? smooth(clamp(stage.manifesto * 1.5 - 0.35)) : edge ? 1 : 0.12;
    if (now > holdUntil + 1300) open += (openT - open) * (onManifesto ? 0.08 : 0.04);

    glow += (glowT - glow) * 0.05;
    host.style.opacity = glow.toFixed(3);
    stage.twistVel *= 0.94;
    twist += stage.twistVel;
    stage.burst *= 0.955;

    const nx = stage.mouse.x / vw - 0.5, ny = stage.mouse.y / vh - 0.5;
    const eul = [
      [0.38 + ny * 0.25, -0.55 + t * SPIN + twist + nx * 0.5, 0],
      [0.22 + ny * 0.2, t * SPIN * 0.7 + twist + nx * 0.4, 0],
      [0.26 + ny * 0.1, -0.42 + nx * 0.35 + twist, 0],
      [0.62, nx * 0.3 + twist * 0.5, 0],
      [0.3 + ny * 0.15, t * SPIN * 1.2 + twist + nx * 0.4, 0.18],
    ][shape];
    e.set(eul[0], eul[1], eul[2]);
    sq.setFromEuler(e);
    gq.slerp(sq, 0.1);
    e.set(0.35, 0, 0.18);
    rq.setFromEuler(e);

    const viewH = 2 * Math.tan((camera.fov * Math.PI) / 360) * camera.position.z;
    const mxw = nx * viewH * camera.aspect, myw = -ny * viewH;
    const ms = Math.max(0, stage.milestone);
    const S = shapes[shape], repel = shape === 0 || shape === 1 || shape === 4;

    for (let i = 0; i < N; i++) {
      const isA = i >= ND, j = isA ? i - ND : i, A = isA ? S.a : S.d, j3 = j * 3;
      const type = A.type[j], p1 = A.p1[j], p2 = A.p2[j], r = R[i];
      let x = A.pos[j3], y = A.pos[j3 + 1], z = A.pos[j3 + 2];
      let sx = A.sc[j], sy = sx, sz = sx, q = sq;

      if (type === HATCH) {
        z += smooth(clamp(open * 2)) * 0.32;
        x += (x < 0 ? -1 : 1) * smooth(clamp(open * 1.6 - 0.3)) * 1.05;
      } else if (type === DEBRIS) {
        const a = p1 + t * (0.12 + r * 0.12);
        x = Math.cos(a) * p2;
        y += Math.sin(t + r * 6) * 0.15;
        z = Math.sin(a) * p2;
        q = rq;
      } else if (type === ORBIT || type === ELECTRON) {
        const th = type === ORBIT ? p2 + t * 0.2 : p2 + t * 1.3, ar = 3.0, ph = 1.2, ps = (p1 * Math.PI) / 3;
        const ox = ar * Math.cos(th), oy = -ar * Math.sin(th) * Math.sin(ph);
        x = ox * Math.cos(ps) - oy * Math.sin(ps);
        y = ox * Math.sin(ps) + oy * Math.cos(ps);
        z = ar * Math.sin(th) * Math.cos(ph);
      } else if (type === BAR) {
        const H = p1 <= ms ? LEVELS[p1] : 1;
        y = BASE + Math.min(p2, H - 1) * 0.24;
        if (p2 >= H) sx = sy = sz = 0.9;
      } else if (type === RISER) {
        if (p1 <= ms) {
          const c = (t * 0.32 + p2) % 1;
          y = BASE + LEVELS[p1] * 0.24 + c * 2.0;
          sx = sy = sz = 0.6 * (1 - c);
        } else {
          y = BASE;
          sx = sy = sz = 0;
        }
      } else if (type === CITY) {
        const cx = (p1 - 19.5) * 0.3, cz = (p2 - 19.5) * 0.3;
        let h = 0.1 + Math.max(0, Math.sin(p1 * 0.33 + t * 0.6) * Math.cos(p2 * 0.29 - t * 0.45) + 0.5 * Math.sin((p1 + p2) * 0.18 + t * 0.8)) * 1.4;
        h += Math.max(0, 1.8 - Math.hypot(cx - mxw * 0.9, cz + myw * 1.4)) * 1.1;
        if (isA) h += 0.5;
        x = cx;
        y = -1.1 + h / 2;
        z = cz;
        sx = sz = 1.3;
        sy = h / 0.2;
      }

      v.set(x, y, z).applyQuaternion(q);
      let tx = v.x, ty = v.y, tz = v.z;
      if (repel) {
        const dx = tx - mxw, dy = ty - myw, d = Math.hypot(dx, dy);
        if (d < 1.4) {
          const f = ((1.4 - d) / 1.4) * 0.5;
          tx += (dx / (d + 1e-3)) * f;
          ty += (dy / (d + 1e-3)) * f;
          tz += f;
        }
      }

      const lp = smooth(clamp(tp * 1.6 - r * 0.6)), i3 = i * 3, i4 = i * 4;
      let px = PP[i3] + (tx - PP[i3]) * lp, py = PP[i3 + 1] + (ty - PP[i3 + 1]) * lp, pz = PP[i3 + 2] + (tz - PP[i3 + 2]) * lp;
      if (mess > 0 && lp < 1) {
        const bump = Math.sin(Math.PI * lp) * mess * (0.5 + r * 1.6);
        px += DIR[i3] * bump;
        py += DIR[i3 + 1] * bump;
        pz += DIR[i3 + 2] * bump;
      }
      P[i3] = px;
      P[i3 + 1] = py;
      P[i3 + 2] = pz;
      SC[i3] = PS[i3] + (sx - PS[i3]) * lp;
      SC[i3 + 1] = PS[i3 + 1] + (sy - PS[i3 + 1]) * lp;
      SC[i3 + 2] = PS[i3 + 2] + (sz - PS[i3 + 2]) * lp;

      if (type === DEBRIS) {
        e.set(t * r, t * 0.7 + r * 5, r * 3);
        tq.setFromEuler(e);
        tq.toArray(tmp4, 0);
      } else gq.toArray(tmp4, 0);
      THREE.Quaternion.slerpFlat(Q as unknown as number[], i4, PQ as unknown as number[], i4, tmp4, 0, lp);

      const b = 1 + stage.burst * (0.6 + r * 1.4);
      dummy.position.set(px * b, py * b, pz * b);
      dummy.quaternion.fromArray(Q, i4);
      dummy.scale.set(Math.max(1e-3, SC[i3]), Math.max(1e-3, SC[i3 + 1]), Math.max(1e-3, SC[i3 + 2]));
      dummy.updateMatrix();
      (isA ? accent : dark).setMatrixAt(j, dummy.matrix);
    }
    dark.instanceMatrix.needsUpdate = true;
    accent.instanceMatrix.needsUpdate = true;

    const coreT = shape === 0 ? (0.55 + 0.45 * open) * smooth(clamp(tp * 1.4 - 0.3)) : shape === 1 ? 0.5 : 0;
    coreS += (coreT - coreS) * 0.06;
    const cs = Math.max(0.001, coreS * (1 + stage.burst * 1.5));
    core.scale.setScalar(cs * (1 + Math.sin(t * 2.2) * 0.04));
    core.quaternion.copy(gq);
    coreLight.intensity = (6 * cs + 2 * open) * 0.9 * Math.PI;

    camera.position.x += (nx * 0.8 - camera.position.x) * 0.03;
    camera.position.y += (-ny * 0.5 - camera.position.y) * 0.03;
    camera.lookAt(0, 0, 0);
    renderer.render(scene, camera);
  }

  function resize() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
  }

  function dispose() {
    geo.dispose();
    coreGeos.forEach((g) => g.dispose());
    [darkMat, accMat, coreMat, ...glowMats].forEach((m) => m.dispose());
    renderer.dispose();
    renderer.domElement.remove();
  }

  return { update, resize, dispose };
}

/** The fixed particle scene behind the page. Sections steer it through data-morph / data-glow. */
export function HatchScene() {
  const hostRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<ReturnType<typeof createScene> | null>(null);

  useEffect(() => {
    let scene: ReturnType<typeof createScene>;
    try {
      scene = createScene(hostRef.current!);
    } catch {
      // No WebGL — the page stands on its own without the scene.
      return;
    }
    sceneRef.current = scene;
    window.addEventListener("resize", scene.resize);
    return () => {
      window.removeEventListener("resize", scene.resize);
      scene.dispose();
      sceneRef.current = null;
    };
  }, []);

  useTick((t) => sceneRef.current?.update(t));

  return <div ref={hostRef} className="pointer-events-none fixed inset-0 z-0" />;
}
