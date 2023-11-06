"use client";
import "../styles/globals.css";
import useTipTap from "@/hooks/useTipTap";
import { EditorContent } from "@tiptap/react";
import Toolbar from "@/components/toolbar";
import Themes from "@/components/Themes";
import Loader from "@/components/loader";

const HomePage = () => {
  const { editor } = useTipTap();

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
      <div className="max-w-7xl mx-auto mt-4">
        <EditorContent editor={editor} />
      </div>
    </>
  );
};

export default HomePage;
