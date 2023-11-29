import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MdClose,
  MdMenu,
  MdOutlineRestartAlt,
  MdOutlineExitToApp,
  MdDelete,
  MdOutlineHealthAndSafety,
} from "react-icons/md";
import bot from "../assets/logo.svg";
import { useRecipeContext } from "../context/recipeContext";
import { useUser } from "../context/userContext";
import { useFavoriteContext } from "../context/favoriteContext";
import useApi from "../hooks/useApi";
import toast, { Toaster } from "react-hot-toast";

const SideBar = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();
  const [open, setOpen] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);

  const { recipes, setRecipes } = useRecipeContext();
  const { favorite, setFavorite } = useFavoriteContext();

  const api = useApi();

  const notifyError = (msg) => toast.error(msg);
  const notifySuccess = (msg) => toast.success(msg);

  function handleResize() {
    window.innerWidth <= 720 ? setOpen(false) : setOpen(true);
  }

  useEffect(() => {
    handleResize();
  }, []);

  function clear() {
    localStorage.removeItem("recipeSearch");
    setRecipes([]);
    navigate("/home");
  }

  function logout() {
    localStorage.removeItem("accessToken");
    setUser(null);
    navigate("/login");
  }
  const getFavorites = async () => {
    try {
      const response = await api.getFavorites();
      setFavorite(response.data);
    } catch (err) {}
  };

  const onClickDelete = async (id) => {
    try {
      const response = await api.deleteFavorite(id);

      if (response.status === 200) {
        notifySuccess("Favorite deleted");
        getFavorites();
      }
    } catch (err) {
      notifyError("Error while deleting favorite");
    }
  };

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <section
      className={`${
        open ? "w-72" : "w-16"
      } bg-neutral flex flex-col items-center gap-y-4 h-screen pt-4 relative duration-100 shadow-md`}
    >
      <Toaster />
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

      <ul className="w-full menu rounded-box">
        <li>
          <Link className="border border-slate-500" to="/home/allergies">
            <MdOutlineHealthAndSafety size={15} />
            <p>My Allergies</p>
          </Link>
        </li>
      </ul>

      <h1 className="text-2xl font-bold text-center">Favorites</h1>

      {open && favorite?.length > 0 && (
        <div className="h-96 overflow-scroll w-full">
          <ul className="w-full menu rounded-box">
            {favorite.map((favorite) => (
              <div
                key={favorite.id}
                onClick={(e) => {
                  e.preventDefault();
                  navigate("/home/recipes/" + favorite.recipeId, {
                    state: { recipe: favorite.recipe },
                  });
                }}
              >
                <li>
                  <a
                    className="mb-3 border border-slate-500 justify-around"
                    onClick={() => {}}
                  >
                    <p>{favorite.recipe.name.slice(0, 14)}</p>
                    <div
                      className="hover: btn-ghost"
                      onClick={(e) => {
                        e.stopPropagation();
                        onClickDelete(favorite.id);
                      }}
                    >
                      <MdDelete size={15} />
                    </div>
                  </a>
                </li>
              </div>
            ))}
          </ul>
        </div>
      )}

      {open && favorite?.length === 0 && (
        <div>
          <p className="text-center">No favorites</p>
        </div>
      )}

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
