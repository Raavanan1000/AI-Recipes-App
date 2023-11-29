import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  MdClose,
  MdMenu,
  MdOutlineRestartAlt,
  MdOutlineExitToApp,
} from "react-icons/md";
import bot from "../assets/logo.svg";
import { useRecipeContext } from "../context/recipeContext";
import { useUser } from "../context/userContext";

const SideBar = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const { recipes, setRecipes } = useRecipeContext();

  function handleResize() {
    window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  }

  useEffect(() => {
    handleResize();
  }, []);

  function clear() {
    localStorage.removeItem("recipeSearch");
    setRecipes([]);
  }

  function logout() {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
  }

  return (
    <section
      className={`${
        open ? "w-72" : "w-16"
      } bg-neutral flex flex-col items-center gap-y-4 h-screen pt-4 relative duration-100 shadow-md`}
    >
      <div className="flex items-center justify-between w-full px-2 mx-auto">
        <div
          className={` ${
            !open && "scale-0 hidden"
          } flex flex-row items-center gap-2 mx-auto w-full`}
        >
          <img src={bot} alt="logo" className="w-6 h-6" />
          <h1 className={` ${!open && "scale-0 hidden"}`}>CuisineConnect</h1>
        </div>
        <div
          className="mx-auto btn btn-square btn-ghost"
          onClick={() => setOpen(!open)}
        >
          {open ? <MdClose size={15} /> : <MdMenu size={15} />}
        </div>
      </div>

      <ul className="w-full menu rounded-box">
        <li>
          <a className="border border-slate-500" onClick={clear}>
            <MdOutlineRestartAlt size={15} />
            <p className={`${!open && "hidden"}`}>
              {!recipes.length > 0 ? "Ask recipe" : "Reset"}
            </p>
          </a>
        </li>
      </ul>

      <ul className="absolute bottom-0 w-full gap-1 menu rounded-box">
        <li>
          <div className="border border-slate-500" onClick={logout}>
            <MdOutlineExitToApp size={15} />
            <span>Logout</span>
          </div>
        </li>
      </ul>

      {/* <ul className="absolute bottom-0 w-full gap-1 menu rounded-box">
        <li>
          <ToggleTheme open={open} />
        </li>
      </ul>
      <Modal title="Setting" modalOpen={modalOpen} setModalOpen={setModalOpen}>
        <Setting modalOpen={modalOpen} setModalOpen={setModalOpen} />
      </Modal> */}
    </section>
  );
};

export default SideBar;
