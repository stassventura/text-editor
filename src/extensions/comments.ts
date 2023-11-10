import { Mark, mergeAttributes } from "@tiptap/core";

import { v4 as uuidv4 } from "uuid";
import { findIndex } from "lodash";

export interface CommentInterface {
  user: any;
  uuid: string | null;
  comment: string;
  date: number | null;
  parent_id: string | null;
  parent_title: string | null;
}

export interface Comment {
  comment: string;
  parent_id: string | null;
  parent_title: string;
  uuid: string | null;
}

export interface CustomCommentInterface {
  threadId: string | null;
  comments: CommentInterface[] | null;
}

interface CommentsStorageInterface {
  comments: CustomCommentInterface[];
  comment_id: string | null;
}

export interface CommentOptionsInterface {
  user: {};
}

declare module "@tiptap/core" {
  interface Commands<ReturnType> {
    customExtension: {
      addComments: (comment: Comment) => ReturnType;
      removeSpecificComment: (threadId: string, commentId: string) => boolean;
      updateSpecificComment: (
        threadId: string,
        commentId: string,
        newCommentText: string
      ) => boolean;
    };
  }
}

const Comments = Mark.create<CommentOptionsInterface, CommentsStorageInterface>(
  {
    name: "comment",
    addOptions() {
      return {
        user: {},
      };
    },
    addStorage() {
      return {
        comments: [],
        comment_id: null,
      };
    },
    addAttributes() {
      return {
        comment_id: {
          parseHTML: (element: any) => element.getAttribute("comment_id"),
          renderHTML: (attrs) => ({ comment_id: attrs.comment_id }),
        },
      };
    },
    // @ts-ignore
    addCommands() {
      // @ts-ignore
      return {
        // @ts-ignore
        addComments:
          (comment) =>
          ({ commands }) => {
            let commentsList: CustomCommentInterface;
            console.log({
              user: this.options.user,
            });

            const finalComment: CommentInterface = {
              uuid: comment.uuid,
              user: this.options.user,
              comment: comment.comment,
              date: Date.now(),
              parent_title: comment.parent_title,
              parent_id: comment.parent_id,
            };
            if (comment.parent_id) {
              const index = findIndex(this.storage.comments, {
                threadId: this.storage.comment_id,
              });
              const commentIndex = findIndex(
                this.storage.comments[index].comments ?? [],
                { uuid: comment.parent_id }
              );
              const parent = this.storage.comments[index];
              if (parent && parent.comments) {
                finalComment.parent_id = parent.comments[commentIndex].uuid;
                finalComment.parent_title = parent.comments[
                  commentIndex
                ].comment.substring(0, 50);
              }
              this.storage.comments[index].comments?.push(finalComment);
            } else {
              commentsList = {
                threadId: uuidv4(),
                comments: [],
              };
              commentsList.comments?.push(finalComment);
              commands.setMark("comment", {
                comment_id: commentsList.threadId,
              });
              this.storage.comments.push(commentsList);
            }

            return finalComment.uuid;
          },
        removeSpecificComment:
          (threadId: string, commentId: string) =>
          ({ commands }: any) => {
            let comments = this.storage?.comments;
            const index = findIndex(comments, { threadId: threadId });
            if (comments[index].comments) {
              const commentIndex = findIndex(comments[index].comments ?? [], {
                uuid: commentId,
              });
              comments[index].comments?.splice(commentIndex, 1);

              if (!comments[index].comments?.length) {
                comments.splice(index, 1);
              }

              this.storage.comments = comments;
              this.editor.state.doc.descendants((node: any, pos: any) => {
                const { marks } = node;
                marks.forEach((mark: any) => {
                  if (mark.type.name === "comment") {
                    const comment_id = mark.attrs.comment_id;
                    if (
                      !this.storage.comments.filter(
                        (obj) => obj.threadId === comment_id
                      ).length
                    ) {
                      commands.setTextSelection({
                        from: pos,
                        to: pos + (node.text?.length || 0),
                      });
                      commands.unsetMark("comment");
                    }
                  }
                });
              });
            }
            return true;
          },
        updateSpecificComment:
          (threadId: string, commentId: string, newCommentText: string) =>
          () => {
            let comments = this.storage.comments;
            const threadIndex = findIndex(comments, { threadId: threadId });

            if (threadIndex === -1) return false;

            const commentIndex = findIndex(
              comments[threadIndex].comments ?? [],
              { uuid: commentId }
            );

            if (commentIndex === -1) return false;

            comments[threadIndex].comments![commentIndex].comment =
              newCommentText;

            this.storage.comments = comments;

            return true;
          },
      };
    },
    // @ts-ignore
    onSelectionUpdate({ editor }) {
      if (!editor.isActive("comment")) {
        this.storage.comment_id = null;
      } else {
        this.storage.comment_id = editor.getAttributes("comment").comment_id;
      }
    },
    onUpdate() {},
    renderHTML({ HTMLAttributes }) {
      return ["span", mergeAttributes(HTMLAttributes), 0];
    },
    parseHTML() {
      return [
        {
          tag: "span[comment_id]",
          getAttrs: (el) =>
            !!(el as HTMLSpanElement).getAttribute("comment_id")?.trim() &&
            null,
        },
      ];
    },
  }
);

export default Comments;
