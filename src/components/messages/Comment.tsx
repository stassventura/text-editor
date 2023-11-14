import { useRef } from "react";
import Image from "next/image";
import { getUserInitials } from "@/helpers";

interface MessageProps {
  thread: any;
  editingCommentId: string | null;
  updateComment: (
    threadId: string,
    commentId: string,
    oldCommentText: string,
    newCommentText: string
  ) => void;
  unselectComment: (
    threadId: string,
    commentId: string,
    commentText: string
  ) => void;
  selectComment: (id: string) => void;
  deleteComment: (threadId: string, commentId: string) => void;
}

const Comment = ({
  thread,
  editingCommentId,
  updateComment,
  unselectComment,
  selectComment,
  deleteComment,
}: MessageProps) => {
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  return (
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
            {editingCommentId && editingCommentId === thread.threadId ? (
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
                <div className=" text-base-content font-medium mt-2 break-all">
                  {comment.comment}
                </div>
                <div className="absolute bottom-3 right-3 flex gap-5">
                  <button onClick={() => selectComment(thread.threadId)}>
                    <i className="fa-solid fa-pen"></i>
                  </button>
                  <button
                    onClick={() => deleteComment(thread.threadId, comment.uuid)}
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
  );
};

export default Comment;
