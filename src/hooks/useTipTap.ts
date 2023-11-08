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
          firstName: "Jason",
          lastName: "Benson",
          id: "8954385430",
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

  const addComment = (comment: string, parent_id: string | null) => {
    if (editor) {
      editor.commands.addComments({
        comment: comment,
        parent_id: parent_id,
      });
      console.log(editor.storage.comment.comments);
    }
  };

  return {
    editor,
    addComment,
  };
};

export default useTipTap;
