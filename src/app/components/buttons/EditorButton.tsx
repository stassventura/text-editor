import useEditorCommands from '@/hooks/useEditorCommands';
import React from 'react';
import { TEditor, TEditorButton } from '../../../types';

interface EditorButtonProps {
  editor: TEditor;
  button: TEditorButton;
  icon?: string;
}

const EditorButton = ({ editor, button, icon }: EditorButtonProps) => {
  const commands = useEditorCommands(editor);
  const command = commands[button];
  const handler = command.onclick;
  const isActive = command.active(button);
  const isDisabled = command.disabled ? command.disabled() : false;

  return (
    <button
      className={`join-item btn rounded-none  ${isActive ? 'bg-primary' : ''}`}
      onClick={handler}
      disabled={isDisabled}>
      <i className={`fa-solid fa-${!icon ? button : icon} text-base`}></i>
    </button>
  );
};

export default EditorButton;
