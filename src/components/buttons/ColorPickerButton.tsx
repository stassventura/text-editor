import { TEditor } from "@/types";
import React from "react";

interface ColorPickerButtonProps {
  editor: TEditor;
}

const ColorPickerButton = ({ editor }: ColorPickerButtonProps) => {
  return (
    <button className="join-item btn rounded-none relative border-2">
      <i className={`fa-solid fa-fill-drip text-base`}></i>
      <input
        type="color"
        className="absolute t-0 l-0  w-full opacity-0 cursor-pointer"
        onInput={(event) =>
          editor
            .chain()
            .focus()
            .setColor((event.target as HTMLInputElement).value)
            .run()
        }
        value={editor.getAttributes("textStyle").color}
        data-testid="setColor"
      />
    </button>
  );
};

export default ColorPickerButton;
