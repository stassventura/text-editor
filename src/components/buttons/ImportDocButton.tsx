import { readJsonFile } from "@/helpers";
import { TEditor } from "@/types";
import React, { useRef } from "react";
interface ImportDocButtonProps {
  editor: TEditor;
}

const ImportDocButton = ({ editor }: ImportDocButtonProps) => {
  const fileUploadRef = useRef<HTMLInputElement>(null);

  const onChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      const parsedData = await readJsonFile(event.target.files[0]);
      const comments = parsedData.comments;
      if (!parsedData) return;
      if (editor) {
        editor.commands.setContent(parsedData.content);
        editor.storage.comment.comments = comments;
      }
    }
  };

  return (
    <button
      className="join-item btn rounded-none relative"
      onClick={() => {
        fileUploadRef.current?.click();
      }}
    >
      <i className="fa-solid fa-file-import text-base"></i>
      <input
        type="file"
        accept=".json,application/json"
        onChange={onChange}
        className="hidden"
        ref={fileUploadRef}
      />
    </button>
  );
};

export default ImportDocButton;
