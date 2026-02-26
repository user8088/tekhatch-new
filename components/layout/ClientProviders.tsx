"use client";

import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { PageLoader } from "@/components/ui/PageLoader";
import { BackToTop } from "@/components/ui/BackToTop";

gsap.registerPlugin(ScrollTrigger);

export function ClientProviders({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    const refresh = () => ScrollTrigger.refresh();
    refresh();
    window.addEventListener("load", refresh);
    const t = setTimeout(refresh, 500);
    return () => {
      window.removeEventListener("load", refresh);
      clearTimeout(t);
    };
  }, []);

  return (
    <>
      <PageLoader />
      {children}
      <BackToTop />
    </>
  );
}
