"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { motion, AnimatePresence } from "framer-motion";

export default function Edit() {
  const router = useRouter();
  const [color, setColor] = useState("");

  return (
    <motion.div
      initial={{ x: -100 }} // start from the left
      animate={{ x: 0 }} // end at the current position
      exit={{ x: -100 }} // exit to the left
      key="edit"
      className="absolute text-black top-10 left-0 z-10 color-picker"
    >
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
    </motion.div>
  );
}
