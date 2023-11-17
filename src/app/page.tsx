"use client";

import Canvas from "@/canvas";
import { Edit, Intro, Navbar } from "@/components";
import { useSearchParams } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const searchParam = useSearchParams();  

  return (
    <main className="relative w-full h-screen">
      <Navbar />
      {!searchParam.get("edit") ? <Intro /> : <Edit/>}
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
