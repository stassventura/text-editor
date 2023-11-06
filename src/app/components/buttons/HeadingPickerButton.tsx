import React from 'react';
import { TEditor } from '../../../types';

interface HeadingPickerButtonProps {
  editor: TEditor;
}

const HeadingPickerButton = ({ editor }: HeadingPickerButtonProps) => {
  return (
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn capitalize rounded-none">
        <span>Heading</span>
        <i className="fa-solid fa-chevron-down fa-xs"></i>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 rounded-sm w-32 shadow bg-base-100 border border-base-200"
        data-type="heading">
        <li>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
            className={editor.isActive('heading', { level: 1 }) ? 'bg-primary' : ''}>
            Header
          </button>
        </li>
        <li>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
            className={editor.isActive('heading', { level: 2 }) ? 'bg-primary' : ''}>
            Title
          </button>
        </li>
        <li>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
            className={editor.isActive('heading', { level: 3 }) ? 'bg-primary' : ''}>
            Subtitle
          </button>
        </li>
        <li>
          <button
            onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}
            className={editor.isActive('heading', { level: 4 }) ? 'bg-primary' : ''}>
            Normal text
          </button>
        </li>
      </ul>
    </div>
  );
};

export default HeadingPickerButton;
