"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { AnimatedButton } from "../components";
import { EnvironmentsType } from "@/canvas";

import ArrowUpSolid from "../../public/icons/AngleUpSolid";

type editingOptionsType = {
  colorPicker: boolean;
  environmentPicker: boolean;
  [key: string]: boolean | undefined;
};

export default function Edit() {
  const router = useRouter();
  const searchParam = useSearchParams();
  const [color, setColor] = useState("");
  const [backgroundEnable, setBackgroundEnable] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [editingOptions, setEditingOptions] = useState({
    colorPicker: true,
    environmentPicker: false,
  });

  const environments = [
    "Apartment",
    "City",
    "Dawn",
    "Forest",
    "Lobby",
    "Night",
    "Park",
    "Studio",
    "Sunset",
    "Warehouse",
  ];

  const handlePanel = (changeState: "colorPicker" | "environmentPicker") => {
    if (!isPanelOpen) setIsPanelOpen(true);

    setEditingOptions((prev) => {
      let newState: editingOptionsType = { ...prev };
      for (let key in prev) {
        newState[key] = key === changeState;
      }
      return newState;
    });
  };

  return (
    <div className="fixed bottom-0 min-w-[100%] z-10">
      <div className="bg-[#232323] rounded-t-3xl flex mx-auto gap-4 pt-4 px-4 max-w-max">
        <button
          className={`font-sans p-3 rounded-t-xl transition-all ${
            editingOptions.colorPicker
              ? "bg-[#464646]"
              : "hover:bg-[#464646] hover:rounded-full mb-1"
          }`}
          onClick={() => handlePanel("colorPicker")}
        >
          Color picker
        </button>

        <button
          className={`font-sans p-3 rounded-t-xl transition-all ${
            editingOptions.environmentPicker
              ? "bg-[#464646]"
              : "hover:bg-[#464646] hover:rounded-full mb-1"
          }`}
          onClick={() => handlePanel("environmentPicker")}
        >
          Environment's
        </button>

        <button className="font-sans" onClick={() => setIsPanelOpen((prev) => !prev)}>
          <ArrowUpSolid
            className={`transition-transform duration-300 ${isPanelOpen && "rotate-180"}`}
          />
        </button>
      </div>

      {isPanelOpen && (
        <div className="border-[#464646] border-2 bg-[#232323] max-h-[30vh]">
          {editingOptions.colorPicker && (
            <div className="flex flex-col gap-1">
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
          )}

          {editingOptions.environmentPicker && (
            <div className="flex flex-col gap-2 min-w-max">
              <AnimatedButton
                onClick={() => {
                  let params = new URLSearchParams(window.location.search);
                  params.set("bg", (!backgroundEnable).toString());
                  router.push(`?${params.toString()}`);
                  setBackgroundEnable(!backgroundEnable);
                }}
              >
                {backgroundEnable ? "Disable" : "Enable"} Background
              </AnimatedButton>

              <div className="overflow-y-box overflow-y-scroll max-h-[50vh] flex flex-col gap-2">
                {environments.map((e) => (
                  <AnimatedButton
                    onClick={() => {
                      let params = new URLSearchParams(window.location.search);
                      params.set("e", e.toLowerCase());
                      router.push(`?${params.toString()}`);
                    }}
                  >
                    {e}
                  </AnimatedButton>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
