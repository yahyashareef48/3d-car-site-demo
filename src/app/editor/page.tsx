"use client";

import { Analytics } from "@vercel/analytics/react";
import { Navbar, LoadingScreen, Edit } from "@/components";
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

      {isLoading && (
        <div className="z-50 absolute top-0 bg-black w-screen h-screen flex justify-center items-center">
          <LoadingScreen
            onLoad={() =>
              setTimeout(() => {
                setLoading(false);
              }, 2500)
            }
          />
        </div>
      )}

      <Navbar />

      <Canvas />
    </main>
  );
}
