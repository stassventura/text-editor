import { TEditor } from '@/types';
import React from 'react';
import ColorPickerButton from '../buttons/ColorPickerButton';
import EditorButton from '../buttons/EditorButton';
import HeadingPickerButton from '../buttons/HeadingPickerButton';
import MenuDivider from '../divider/MenuDivider';

interface ToolbarProps {
  editor: TEditor;
}

const Toolbar = ({ editor }: ToolbarProps) => {
  return (
    <div className="join-horizontal flex">
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
  );
};

export default Toolbar;
