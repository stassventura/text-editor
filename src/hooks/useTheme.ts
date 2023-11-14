import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
