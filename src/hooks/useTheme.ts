import { ThemeContext } from "@/providers/ThemeProvider";
import { useContext } from "react";
// import { ThemeContext } from "../components/ThemeProvider";

const useTheme = () => {
  return useContext(ThemeContext);
};

export default useTheme;
