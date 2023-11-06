import useTheme from '@/hooks/useTheme';
import React from 'react';

const themes = ['light', 'dark', 'retro', 'bumblebee', 'garden'];

const Themes = () => {
  const { changeTheme, theme } = useTheme();

  return (
    <div className="dropdown dropdown-hover">
      <label tabIndex={0} className="btn capitalize rounded-none">
        <span>Theme</span>
        <i className="fa-solid fa-chevron-down fa-xs"></i>
      </label>
      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 rounded-sm w-32 shadow bg-base-100 border border-base-200"
        data-type="heading">
        {themes.map((item, index) => (
          <li key={index}>
            <button
              onClick={() => changeTheme(item)}
              className={`capitalize ${theme === item ? 'bg-primary' : ''}`}>
              {item}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Themes;
