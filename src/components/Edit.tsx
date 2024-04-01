"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { ChromePicker } from "react-color";
import { AnimatedButton, Dropzone } from "../components";

import ArrowUpSolid from "../../public/icons/AngleUpSolid";
import generateAiImage from "@/generateAiImage";

type editingOptionsType = {
  colorPicker: boolean;
  environmentPicker: boolean;
  [key: string]: boolean | undefined;
};

export default function Edit({ setMaterial }: { setMaterial: (m: string) => void }) {
  const router = useRouter();
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
    <div className="fixed min-w-[100%] z-10 duration-500 bottom-0">
      <div className="bg-[#232323] rounded-t-3xl flex mx-auto gap-4 pt-4 px-4 max-w-max">
        <button
          className={`font-sans p-3 rounded-t-xl transition-all ${
            editingOptions.colorPicker
              ? "bg-[#464646]"
              : "hover:bg-[#464646] hover:rounded-full mb-1"
          }`}
          onClick={() => handlePanel("colorPicker")}
        >
          Material's
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

      <div
        className={`border-[#464646] border-2 bg-[#232323] transition-all duration-500 overflow-hidden ${
          isPanelOpen ? "max-h-screen" : "max-h-0"
        }`}
      >
        {editingOptions.colorPicker && (
          <div className="max-w-[100vw] overflow-x-box">
            <div className="flex gap-4 m-4 justify-center w-max sm:mx-auto">
              <ChromePicker
                // @ts-ignore
                width={300}
                color={color ? color : "#fff"}
                onChangeComplete={(c) => {
                  setColor(c.hex);
                  setMaterial(c.hex);
                }}
                className="color-picker"
              />
              <div className="flex flex-col gap-4 min-h-full max-w-max min-w-[300px]">
                <Dropzone setImage={setMaterial} />

                <AnimatedButton
                  onClick={() => {
                    setMaterial("remove_texture");
                  }}
                >
                  Remove Texture
                </AnimatedButton>
              </div>
            </div>
          </div>
        )}

        {editingOptions.environmentPicker && (
          <div className="flex flex-col gap-2 min-w-max m-4">
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

            <div className="grid gap-2 grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5">
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
    </div>
  );
}
