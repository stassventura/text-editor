import BulletList from "@tiptap/extension-bullet-list";
import Bold from "@tiptap/extension-bold";
import Italic from "@tiptap/extension-italic";
import ListItem from "@tiptap/extension-list-item";
import OrderedList from "@tiptap/extension-ordered-list";
import TaskItem from "@tiptap/extension-task-item";
import Strike from "@tiptap/extension-strike";
import Blockquote from "@tiptap/extension-blockquote";
import TaskList from "@tiptap/extension-task-list";
import TextStyle from "@tiptap/extension-text-style";
import Text from "@tiptap/extension-text";
import History from "@tiptap/extension-history";
import Code from "@tiptap/extension-code";
import { useEditor } from "@tiptap/react";
import Underline from "@tiptap/extension-underline";
import { Color } from "@tiptap/extension-color";
import HardBreak from "@tiptap/extension-hard-break";
import Document from "@tiptap/extension-document";
import Paragraph from "@tiptap/extension-paragraph";
import Heading from "@tiptap/extension-heading";
import Comments from "@/extensions/comments";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";

const useTipTap = () => {
  const editor = useEditor({
    extensions: [
      Document,
      Paragraph,
      Heading,
      Text,
      Italic,
      Strike,
      Underline,
      Code,
      BulletList,
      ListItem,
      OrderedList,
      TextStyle,
      Color,
      TaskList,
      Bold,
      HardBreak,
      Blockquote,
      TaskItem.configure({
        nested: true,
      }),
      History,
      Comments.configure({
        user: {
          id: "8954385430",
          firstName: "Jason",
          lastName: "Benson",
          avatar:
            "https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg",
        },
      }),
    ],
    content: `<p>Hello World! 🌎️</p>
    
        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Fugit cumque doloribus magni, incidunt mollitia nesciunt quos laudantium quis nulla eaque explicabo aut? Nesciunt, illo ab voluptates blanditiis maiores corrupti, praesentium temporibus necessitatibus, enim iste exercitationem suscipit voluptatibus eum commodi dolorem!
        
        <ul>
              <li>A list item</li>
              <li>And another one</li>
            </ul>
        `,
  });

  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const addComment = () => {
    if (editor) {
      const { from, to } = editor.state.selection;
      const quote = editor.state.doc.textBetween(from, to);
      const newCommentUuid = uuidv4();

      editor.commands.addComments({
        uuid: newCommentUuid,
        comment: "",
        parent_id: null,
        parent_title: quote,
      });

      setEditingCommentId(newCommentUuid);
    }
  };

  const updateComment = (
    threadId: string,
    commentId: string,
    oldCommentText: string,
    newCommentText: string
  ) => {
    if (editor && threadId && commentId && newCommentText !== null) {
      if (oldCommentText !== "" && oldCommentText === newCommentText)
        return setEditingCommentId(null);
      const updated = editor.commands.updateSpecificComment(
        threadId,
        commentId,
        newCommentText !== "" ? newCommentText : "Your text could be here"
      );

      if (updated) {
        setEditingCommentId(null);
      } else {
        console.error("Failed to update the comment");
      }
    }
  };

  const selectComment = (id: string) => {
    setEditingCommentId(id);
  };

  const deleteComment = (threadId: string, commentId: string) => {
    if (editor) {
      editor.commands.removeSpecificComment(threadId, commentId);
      setEditingCommentId(null);
    }
  };

  const unselectComment = (
    threadId: string,
    commentId: string,
    commentText: string
  ) => {
    if (commentText !== "") return setEditingCommentId(null);
    console.log(commentId);
    if (editor && threadId && commentId !== null)
      deleteComment(threadId, commentId);
  };

  return {
    editor,
    addComment,
    editingCommentId,
    updateComment,
    setEditingCommentId,
    selectComment,
    unselectComment,
    deleteComment,
  };
};

export default useTipTap;
