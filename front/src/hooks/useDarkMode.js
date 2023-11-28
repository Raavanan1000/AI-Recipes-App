import { useEffect } from "react";
import useLocalStorage from "./useLocalStorage";

const useDarkMode = () => {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  useEffect(() => {
    const html = window.document.documentElement;
    html.setAttribute("data-theme", theme);
  }, [theme]);

  return [theme, setTheme];
};

export default useDarkMode;
