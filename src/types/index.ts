import { Editor } from "@tiptap/core";
import { Content } from "@tiptap/react";

export type TEditor = Editor;
export type TEditorButton =
  | "bold"
  | "italic"
  | "underline"
  | "strike"
  | "code"
  | "bulletList"
  | "orderedList"
  | "taskList"
  | "blockquote"
  | "reset"
  | "hardbreak"
  | "undo"
  | "redo";

export interface IContent {
  comments: any[];
  content: Content[];
}
