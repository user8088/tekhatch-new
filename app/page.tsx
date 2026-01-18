import { Hero } from "@/components/sections/Hero";
import { Solutions } from "@/components/sections/Solutions";
import { Vision } from "@/components/sections/Vision";
import { NeuralEcosystem } from "@/components/sections/NeuralEcosystem";
import { TheForge } from "@/components/sections/TheForge";

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <Solutions />
      <Vision />
      <NeuralEcosystem />
      <TheForge />
      {/* Other sections will go here */}
    </div>
  );
}
