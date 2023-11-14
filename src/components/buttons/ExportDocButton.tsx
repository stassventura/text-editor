import { TEditor } from "@/types";
import React from "react";
import { saveAs } from "file-saver";

interface ExportDocButtonProps {
  editor: TEditor;
}

const ExportDocButton = ({ editor }: ExportDocButtonProps) => {
  const onSaveDocument = () => {
    const document = {
      ...editor.getJSON(),
      comments: editor.storage.comment.comments,
    };
    const jsonString = JSON.stringify(document, null, 2);
    const blob = new Blob([jsonString], {
      type: "application/json;charset=utf-8",
    });
    saveAs(blob, "document.json");
  };

  return (
    <button className="join-item btn rounded-none" onClick={onSaveDocument}>
      <i className="fa-solid fa-file-export text-base"></i>
    </button>
  );
};

export default ExportDocButton;
