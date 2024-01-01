"use client";

import { useRouter } from "next/navigation";

export default function Intro() {
  const router = useRouter();

  return (
    <div className="absolute top-0 left-0 z-10 w-full h-full bg-[#0000006d]">
      <div className="grid items-center h-full ">
        <div className="max-w-2xl flex justify-end">
          <div className="max-w-xl p-4">
            <h1 className="text-3xl mb-4">Experience Your Dream Car in 3D!</h1>
            <p className=" text-base">
              Welcome to our interactive 3D car customization platform! Here, you can visualize your
              dream car in stunning 3D detail.
            </p>
            <div className="mt-4">
              <button
                className="bg-[#181a1b] px-5 py-3 rounded-full"
                onClick={() => {
                  let params = new URLSearchParams(window.location.search);
                  params.set("edit", "true");
                  router.push(`?${params.toString()}`);
                }}
              >
                Start 3D Experience
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
