"use client";

import { ReactColorPicker } from "react-color-picker-tool";
import { useRouter, useSearchParams } from "next/navigation";

export default function Edit() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const color: any = searchParam.get("color");

  return (
    <div className="absolute text-black font-serif top-10 left-0 z-10">
      <ReactColorPicker
        color={color}
        onChange={(colors) => {
          let params = new URLSearchParams(window.location.search);
          params.set("color", colors.hex);
          router.push(`?${params.toString()}`);
        }}
      ></ReactColorPicker>
    </div>
  );
}
