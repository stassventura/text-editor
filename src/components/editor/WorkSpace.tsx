import { Editor } from "@tiptap/react";
import { BubbleMenu, EditorContent } from "@tiptap/react";
import React from "react";

interface EditorProps {
  editor: Editor | undefined;

  addComment: () => void;
}

const WorkSpace = ({ editor, addComment }: EditorProps) => {
  return (
    <div className="flex-1">
      <div className="mt-4">
        {editor !== undefined && (
          <>
            <EditorContent editor={editor} />
            <EditorContent editor={editor} />
          </>
        )}
        <BubbleMenu
          editor={editor}
          pluginKey="bubbleMenuText"
          className="relative top-1"
          tippyOptions={{ duration: 100 }}
        >
          <button
            className="btn btn-xs  btn-outline bg-base-100 shadow  rounded block mt-3"
            onClick={addComment}
          >
            Add comment
          </button>
        </BubbleMenu>
      </div>
    </div>
  );
};

export default WorkSpace;
