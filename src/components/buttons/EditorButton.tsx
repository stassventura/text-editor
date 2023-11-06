import editorCommands from "@/helpers/editorCommands";
import { TEditor, TEditorButton } from "@/types";
import React from "react";

interface EditorButtonProps {
  editor: TEditor;
  button: TEditorButton;
  icon?: string;
}

const EditorButton = ({ editor, button, icon }: EditorButtonProps) => {
  const commands = editorCommands(editor);
  const command = commands[button];
  const handler = command.onclick;
  const isActive = command.active(button);
  const isDisabled = command.disabled ? command.disabled() : false;

  return (
    <button
      className={`join-item btn rounded-none  ${isActive ? "bg-primary" : ""}`}
      onClick={handler}
      disabled={isDisabled}
    >
      <i className={`fa-solid fa-${!icon ? button : icon} text-base`}></i>
    </button>
  );
};

export default EditorButton;
