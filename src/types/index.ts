import { Editor } from '@tiptap/core';

export type TEditor = Editor;
export type TEditorButton =
  | 'bold'
  | 'italic'
  | 'underline'
  | 'strike'
  | 'code'
  | 'bulletList'
  | 'orderedList'
  | 'taskList'
  | 'blockquote'
  | 'reset'
  | 'hardbreak'
  | 'undo'
  | 'redo';
