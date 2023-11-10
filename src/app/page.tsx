"use client";
import "../styles/globals.css";
import { BubbleMenu, EditorContent } from "@tiptap/react";
import Loader from "@/components/loader";
import useTipTap from "@/hooks/useTipTap";
import Toolbar from "@/components/toolbar";
import Themes from "@/components/Themes";
import { useRef } from "react";
import Image from "next/image";
import { getUserInitials } from "@/helpers";

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
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row gap-6">
          <div className="flex-1">
            <div className="mt-4">
              <EditorContent editor={editor} />
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

          <div className="w-full md:w-1/3">
            <div>
              {editor.storage.comment.comments.length > 0 &&
                editor.storage.comment.comments.map((thread: any) => (
                  <div key={thread.threadId}>
                    {thread.comments.map((comment: any) => (
                      <div
                        key={comment.uuid}
                        className="p-4 max-w-md mx-auto bg-base-300 rounded-xl shadow-md flex items-center space-x-4 my-4 relative pb-8"
                      >
                        <div className="avatar placeholder">
                          <div className="bg-neutral-focus text-neutral-content rounded-full w-12">
                            {comment.user.avatar ? (
                              <Image
                                src={comment.user.avatar}
                                alt={comment.user.firstName}
                                width={150}
                                height={150}
                              />
                            ) : (
                              <span className="text-lg">
                                {getUserInitials(
                                  comment.user.firstName,
                                  comment.user.lastName
                                )}
                              </span>
                            )}
                          </div>
                        </div>
                        <div className="w-full">
                          <div className="text-sm flex justify-between ">
                            <span className="text-base-content">
                              {comment.user.firstName} {comment.user.lastName}
                            </span>
                            <span className="text-primary font-medium">
                              {new Date(comment.date).toLocaleString([], {
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </span>
                          </div>
                          <div className="mt-2  text-sm border-l-4 border-primary pl-4">
                            {comment.parent_title}
                          </div>

                          {editingCommentId &&
                          editingCommentId === comment.uuid ? (
                            <>
                              <textarea
                                autoFocus
                                ref={textAreaRef}
                                className="textarea textarea-bordered w-full mt-2 text-sm h-24"
                                defaultValue={comment.comment}
                                placeholder="Type something..."
                              ></textarea>
                              <div className="flex gap-3">
                                <button
                                  className="btn-sm btn-error mt-2 rounded block ml-auto"
                                  onClick={() =>
                                    unselectComment(
                                      thread.threadId,
                                      comment.uuid,
                                      comment.comment
                                    )
                                  }
                                >
                                  <i className="fa-solid fa-xmark text-base"></i>
                                </button>
                                <button
                                  className="btn-sm btn-primary mt-2 rounded "
                                  onClick={() => {
                                    if (textAreaRef.current) {
                                      updateComment(
                                        thread.threadId,
                                        comment.uuid,
                                        comment.comment,
                                        textAreaRef.current.value
                                      );
                                    }
                                  }}
                                >
                                  <i className="fa-regular fa-paper-plane text-base"></i>
                                </button>
                              </div>
                            </>
                          ) : (
                            <>
                              <div className=" text-base-content font-medium mt-2">
                                {comment.comment}
                              </div>
                              <div className="absolute bottom-3 right-3 flex gap-5">
                                <button
                                  onClick={() => selectComment(comment.uuid)}
                                >
                                  <i className="fa-solid fa-pen"></i>
                                </button>
                                <button
                                  onClick={() =>
                                    deleteComment(thread.threadId, comment.uuid)
                                  }
                                >
                                  <i className="fa-solid fa-trash"></i>
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage;
