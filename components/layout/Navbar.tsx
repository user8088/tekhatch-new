"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.nav 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4 glass-dark mx-4 md:mx-12 mt-6 rounded-full"
    >
      <div className="text-2xl font-bold tracking-tighter">
        Tekhatch
      </div>
      
      <div className="hidden md:flex items-center gap-8 text-sm font-medium">
        <a href="#" className="hover:text-primary transition-colors">Solutions</a>
        <a href="#" className="hover:text-primary transition-colors">About US</a>
        <a href="#" className="hover:text-primary transition-colors">Contact</a>
        <button className="bg-gradient-to-r from-primary to-[#FACC15] px-6 py-2 rounded-full font-semibold text-white shadow-lg hover:scale-105 transition-transform">
          Get Started
        </button>
      </div>

      <div className="md:hidden">
        <button onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>
    </motion.nav>
  );
};
