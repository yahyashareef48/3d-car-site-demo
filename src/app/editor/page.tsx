"use client";

import { Analytics } from "@vercel/analytics/react";
import { Navbar, LoadingScreen, Edit } from "@/components";
import { motion, AnimatePresence } from "framer-motion";
import Canvas from "@/components/Canvas";
import { useSearchParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Editor() {
  const searchParam = useSearchParams();
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  const isLoading = loading || searchParam.get("l") == "true" || searchParam.get("l") == null;

  useEffect(() => {
    let params = new URLSearchParams(window.location.search);
    params.set("l", "true");
    router.push(`?${params.toString()}`);
  }, []);

  return (
    <main>
      <Analytics />

      <AnimatePresence>
        {isLoading && (
          <motion.div
            exit={{ opacity: 0 }}
            initial={{ opacity: 1 }}
            animate={{ opacity: 1 }}
            className="z-50 absolute top-0 bg-black w-screen h-screen flex justify-center items-center"
          >
            <LoadingScreen
              onLoad={() =>
                setTimeout(() => {
                  setLoading(false);
                }, 2500)
              }
            />
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar />

      <Canvas />
    </main>
  );
}
