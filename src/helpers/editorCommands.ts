import { TEditor, TEditorButton } from '../types';

interface Command {
  onclick: () => void;
  active: (button: string) => boolean;
  disabled?: () => boolean;
}
type Commands = {
  [K in TEditorButton]: Command;
};

const editorCommands = (editor: TEditor): Commands => {
  const commands = {
    bold: {
      onclick: () => editor.chain().focus().toggleBold().run(),
      active: (button: string) => {
        return editor.isActive(button);
      },
    },
    underline: {
      onclick: () => editor.chain().focus().toggleUnderline().run(),
      active: (button: string) => {
        return editor.isActive(button);
      },
    },
    italic: {
      onclick: () => editor.chain().focus().toggleItalic().run(),
      active: (button: string) => {
        return editor.isActive(button);
      },
    },
    strike: {
      onclick: () => editor.chain().focus().toggleStrike().run(),
      active: (button: string) => {
        return editor.isActive(button);
      },
    },
    code: {
      onclick: () => editor.chain().focus().toggleCode().run(),
      active: (button: string) => {
        return editor.isActive(button);
      },
    },
    bulletList: {
      onclick: () => editor.chain().focus().toggleBulletList().run(),
      active: (button: string) => {
        return editor.isActive(button);
      },
    },
    orderedList: {
      onclick: () => editor.chain().focus().toggleOrderedList().run(),
      active: (button: string) => {
        return editor.isActive(button);
      },
    },
    taskList: {
      onclick: () => editor.chain().focus().toggleTaskList().run(),
      active: (button: string) => {
        return editor.isActive(button);
      },
    },
    blockquote: {
      onclick: () => editor.chain().focus().toggleBlockquote().run(),
      active: (button: string) => {
        return editor.isActive(button);
      },
    },
    reset: {
      onclick: () => editor.chain().focus().unsetAllMarks().setParagraph().run(),
      active: (button: string) => {
        return editor.isActive(button);
      },
    },
    hardbreak: {
      onclick: () => editor.chain().focus().setHardBreak().run(),
      active: (button: string) => {
        return editor.isActive(button);
      },
    },
    undo: {
      onclick: () => editor.chain().focus().undo().run(),
      active: () => {
        return editor.can().undo();
      },
      disabled: () => {
        return !editor.can().undo();
      },
    },
    redo: {
      onclick: () => editor.chain().focus().redo().run(),
      active: () => {
        return editor.can().redo();
      },
      disabled: () => {
        return !editor.can().redo();
      },
    },
  };

  return commands;
};

export default editorCommands;
