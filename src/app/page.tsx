"use client"

import Canvas from "@/canvas";
import { Intro, Navbar } from "@/components";
import { useState } from "react";

export default function Home() {

  const [intro, setIntro] = useState(true);

  return (
    <main className="relative w-full h-screen">
      <Navbar />
      <div className="z-10 w-full h-full bg-[#0000006d]">
        {intro && <Intro />}
      </div>
      <div className="h-full absolute -z-10 w-full top-0 left-0">
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
