"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AnimatedButton } from "../components";

export default function Edit() {
  const router = useRouter();
  const [color, setColor] = useState("");
  const [colorPicker, setColorPicker] = useState(false);

  return (
    <div
      className="absolute text-black flex items-center h-full z-10 color-picker"
      style={{ pointerEvents: "none" }}
    >
      <div className="h-max min-h-[285px] min-w-[285px] relative flex items-center">
        <div className="absolute" style={{ pointerEvents: "auto" }}>
          <AnimatePresence>
            {!colorPicker && (
              <motion.button
                initial={{ x: -500 }}
                animate={{ x: 10 }}
                exit={{ x: -500 }}
                onClick={() => setColorPicker(true)}
              >
                <Image src="/images/swatch.png" alt="color picker" width={50} height={50} />
              </motion.button>
            )}
          </AnimatePresence>
        </div>

        <div className="absolute" style={{ pointerEvents: "auto" }}>
          <AnimatePresence>
            {colorPicker && (
              <motion.div initial={{ x: -500 }} animate={{ x: 10 }} exit={{ x: -500 }}>
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
                <AnimatedButton onClick={() => setColorPicker(false)}>
                  Close Color Picker
                </AnimatedButton>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
