"use client";

import { Analytics } from "@vercel/analytics/react";
import Canvas from "@/canvas";
import { Edit, Intro, Navbar } from "@/components";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Home() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const isLoading = loading || searchParam.get("l") == "true" || searchParam.get("l") == null;
  const isIntro = searchParam.get("edit") === "false" || searchParam.get("edit") === null;

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 100);

    let params = new URLSearchParams(window.location.search);
    params.set("l", "true");
    router.push(`?${params.toString()}`);
  }, []);

  return (
    <main className="relative w-full h-screen overflow-hidden">
      <Analytics />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="z-50 absolute top-0 bg-black w-screen h-screen flex justify-center items-center"
          >
            <img className="animate-pulse h-32" src="/images/LOGO.webp" alt="logo" />
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />
      <AnimatePresence>{isIntro ? <Intro /> : <Edit />}</AnimatePresence>
      <div className="z-0 h-full absolute w-full top-0 left-0">
        <Canvas />
      </div>
    </main>
  );
}

// Headings (H1): 32px to 48px.
// Sub-headings (H2, H3, etc.): 24px to 32px.
// Body (Paragraphs): 16px to 18px.
// Soft Pastel Green: #77dd77
// Light Coral: #f08080
