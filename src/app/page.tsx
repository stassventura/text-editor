"use client";
import "../styles/globals.css";
import Loader from "@/components/loader";
import useTipTap from "@/hooks/useTipTap";
import Toolbar from "@/components/toolbar";
import Themes from "@/components/Themes";
import ExportDocButton from "@/components/buttons/ExportDocButton";
import ImportDocButton from "@/components/buttons/ImportDocButton";
import Comment from "@/components/messages/Comment";
import WorkSpace from "@/components/editor/WorkSpace";

function HomePage() {
  const {
    editor,
    addComment,
    editingCommentId,
    updateComment,
    selectComment,
    unselectComment,
    deleteComment,
  } = useTipTap();

  if (!editor) {
    return <Loader />;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto join-horizontal gap-0 rounded-none flex items-center h-fit bg-base-200 justify-between">
        <Toolbar editor={editor} />
        <div>
          <Themes />
          <ExportDocButton editor={editor} />
          <ImportDocButton editor={editor} />
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6 ">
          <WorkSpace editor={editor} addComment={addComment} />
          <div className="w-full md:w-1/3 ">
            <div>
              {editor?.storage?.comment?.comments?.length > 0 &&
                editor.storage.comment.comments.map((thread: any) => (
                  <Comment
                    thread={thread}
                    editingCommentId={editingCommentId}
                    updateComment={updateComment}
                    unselectComment={unselectComment}
                    selectComment={selectComment}
                    deleteComment={deleteComment}
                    key={thread.threadId}
                  />
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
