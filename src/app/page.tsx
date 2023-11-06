'use client';

import './globals.css';
import HeadingPickerButton from './components/buttons/HeadingPickerButton';
import MenuDivider from './components/divider/MenuDivider';
import useTipTap from '@/hooks/useTipTap';
import EditorButton from './components/buttons/EditorButton';
import ColorPickerButton from './components/buttons/ColorPickerButton';
import { EditorContent } from '@tiptap/react';
export default function Home() {
  const { editor } = useTipTap();

  if (!editor) {
    return <div>Loading</div>;
  }

  return (
    <>
      <div className="max-w-7xl mx-auto join-horizontal gap-0 rounded-none flex items-center h-fit bg-base-200">
        <HeadingPickerButton editor={editor} />
        <MenuDivider />
        <ColorPickerButton editor={editor} />
        <MenuDivider />
        <EditorButton editor={editor} button={'bold'} />
        <EditorButton editor={editor} button={'underline'} />
        <EditorButton editor={editor} button={'italic'} />
        <EditorButton editor={editor} button={'strike'} icon={'strikethrough'} />
        <EditorButton editor={editor} button={'code'} />
        <MenuDivider />
        <EditorButton editor={editor} button={'bulletList'} icon={'list'} />
        <EditorButton editor={editor} button={'orderedList'} icon={'list-ol'} />
        <EditorButton editor={editor} button={'taskList'} icon={'list-check'} />
        <MenuDivider />
        <EditorButton editor={editor} button={'blockquote'} icon={'quote-left'} />
        <EditorButton editor={editor} button={'reset'} icon={'text-slash'} />
        <EditorButton editor={editor} button={'hardbreak'} icon={'indent'} />
        <MenuDivider />
        <EditorButton editor={editor} button={'undo'} icon={'arrow-rotate-left'} />
        <EditorButton editor={editor} button={'redo'} icon={'arrow-rotate-right'} />
      </div>
      <div className="max-w-7xl mx-auto mt-4">
        <EditorContent editor={editor} />
      </div>
    </>
  );
}
