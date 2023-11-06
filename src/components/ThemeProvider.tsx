'use client';
import React, { ReactNode } from 'react';
import { useLocalStorage } from '@mantine/hooks';
type Theme = string;

export const ThemeContext = React.createContext<{
  theme: Theme;
  changeTheme: (theme: Theme) => void;
}>(null!);

const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useLocalStorage({ key: 'emerald', defaultValue: 'light' });

  const changeTheme = (theme: Theme) => {
    setTheme(theme);
  };

  return (
    <ThemeContext.Provider value={{ theme, changeTheme }}>
      <div data-theme={theme} className="min-h-screen">
        {children}
      </div>
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;
