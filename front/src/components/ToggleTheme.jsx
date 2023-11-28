import PropTypes from "prop-types";
import useDarkMode from "../hooks/useDarkMode";
import { MdOutlineNightlight, MdOutlineWbSunny } from "react-icons/md";

const ToggleTheme = (props) => {
  const [theme, setTheme] = useDarkMode();

  const handleToggle = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  return (
    <a onClick={handleToggle}>
      {theme ? (
        <>
          <MdOutlineWbSunny size={15} />
          <p className={`${!props.open && "hidden"}`}>Light mode</p>
        </>
      ) : (
        <>
          <MdOutlineNightlight size={15} />
          <p className={`${!props.open && "hidden"}`}>Night mode</p>
        </>
      )}
    </a>
  );
};

export default ToggleTheme;

ToggleTheme.propTypes = {
  open: PropTypes.bool,
};
