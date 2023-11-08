"use client";
import "../styles/globals.css";
import useTipTap from "@/hooks/useTipTap";
import { EditorContent } from "@tiptap/react";
import Toolbar from "@/components/toolbar";
import Themes from "@/components/Themes";
import Loader from "@/components/loader";
import { BubbleMenu } from "@tiptap/react";
import { useState, useRef } from "react";
import { useClickOutside } from "@mantine/hooks";

const HomePage = () => {
  const { editor, addComment } = useTipTap();

  if (!editor) {
    return <Loader />;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto join-horizontal gap-0 rounded-none flex items-center h-fit bg-base-200 justify-between">
        <Toolbar editor={editor} />
        <div>
          <Themes />
          <button className="join-item btn rounded-none">
            <i className="fa-regular fa-message text-base"></i>
          </button>
          <button className="join-item btn rounded-none">
            <i className="fa-regular fa-floppy-disk text-base"></i>
          </button>
        </div>
      </div>
      <div className="max-w-7xl mx-auto mt-4 flex gap-3">
        <div className="w-[70%]">
          <EditorContent editor={editor} />
          <BubbleMenu editor={editor} tippyOptions={{ duration: 100 }}>
            <span className="bg-base-100 shadow p-2 rounded">hello world</span>
          </BubbleMenu>
        </div>
        <button
          onClick={() => addComment("First comment", null)}
          className="btn"
        >
          Add comment
        </button>
      </div>
    </>
  );
};

export default HomePage;
