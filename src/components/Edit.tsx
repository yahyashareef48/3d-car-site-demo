"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChromePicker } from "react-color";

export default function Edit() {
  const router = useRouter();
  const [color, setColor] = useState("");

  return (
    <div className="absolute text-black font-bold top-10 left-0 z-10">
      <ChromePicker
        // @ts-ignore
        width={300}
        color={color ? color : "#fff"}
        onChangeComplete={(c) => {
          setColor(c.hex);
          let params = new URLSearchParams(window.location.search);
          params.set("color", c.hex.replace("#", ""));
          router.push(`?${params.toString()}`);
        }}
      />
    </div>
  );
}
