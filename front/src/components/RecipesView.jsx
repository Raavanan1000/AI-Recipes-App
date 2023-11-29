import { useState, useRef, useEffect } from "react";
import Thinking from "./Thinking";
import { MdSend } from "react-icons/md";
import Recipe from "./Recipe";
import { useRecipeContext } from "../context/recipeContext";
import useApi from "../hooks/useApi";
import SeasonRecipes from "./SeasonRecipes";
import toast, { Toaster } from "react-hot-toast";

const RecipesView = () => {
  const inputRef = useRef();
  const [formValue, setFormValue] = useState("");
  const [loading, isLoading] = useState(false);
  const { recipes, setRecipes } = useRecipeContext();

  const api = useApi();

  const notify = (msg) => toast.error(msg);

  const searchRecipes = async () => {
    isLoading(true);

    updateRecipeSearch(formValue);
    try {
      const response = await api.getRecipes(
        formValue,
        takeIntoAccountAllergies
      );
      setRecipes(response.data);

      if (response.data.length === 0) {
        notify("No recipes found, try again");
      }
    } catch (err) {
      notify("Error while searching recipes");
    } finally {
      isLoading(false);
    }
  };

  const [takeIntoAccountAllergies, setTakeIntoAccountAllergies] =
    useState(true);

  const updateRecipeSearch = (recipeSearch) => {
    localStorage.setItem("recipeSearch", recipeSearch);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      searchRecipes();
    }
  };

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return (
    <>
      {loading && (
        <>
          <div className="flex h-screen justify-center items-center">
            <Thinking />
          </div>
        </>
      )}
      <Toaster />
      {!recipes?.length > 0 && !loading && (
        <>
          <div className="mx-auto my-4 tabs tabs-boxed w-fit">
            <a
              onClick={() => setTakeIntoAccountAllergies(true)}
              className={`${takeIntoAccountAllergies && "tab-active"} tab`}
            >
              Take into account allergies
            </a>
            <a
              onClick={() => setTakeIntoAccountAllergies(false)}
              className={`${!takeIntoAccountAllergies && "tab-active"} tab`}
            >
              {`Don't take into account allergies`}
            </a>
          </div>

          {!loading && (
            <SeasonRecipes withAllergies={takeIntoAccountAllergies} />
          )}
          <form
            className="flex flex-col px-10 mb-2 md:px-32 join sm:flex-row"
            onSubmit={searchRecipes}
          >
            <select
              // value={"Chat"}
              className="w-full sm:w-40 select select-bordered join-item"
            >
              <option>{"Ask recipe"}</option>
            </select>
            <div className="flex items-stretch justify-between w-full">
              <textarea
                ref={inputRef}
                className="w-full grow input input-bordered join-item max-h-[20rem] min-h-[3rem]"
                value={formValue}
                disabled={recipes?.length > 0}
                onKeyDown={handleKeyDown}
                onChange={(e) => setFormValue(e.target.value)}
              />
              <button
                type="submit"
                className="join-item btn"
                disabled={!formValue || recipes?.length > 0}
              >
                <MdSend size={30} />
              </button>
            </div>
          </form>
        </>
      )}
      {recipes?.length > 0 && (
        <div className="flex flex-col mt-12 justify-center items-center">
          <div className="text-2xl mb-12 text-center font-bold text-slate-900">
            Recipes recommeded for you based on your search
          </div>
          <p className="text-xl mb-10">
            {"Searched : " + localStorage.getItem("recipeSearch")}
          </p>

          <button
            className="mt-10 mb-10 bg-transparent hover:bg-gray-300 text-gray-600 font-semibold hover:text-gray-700 py-2 px-4 border border-gray-600 hover:border-transparent rounded"
            onClick={() => {
              localStorage.removeItem("recipeSearch");
              setRecipes([]);
              setFormValue("");
            }}
          >
            Search again
          </button>

          <div className="flex w-full h-full justify-center items-center gap-3 flex-wrap">
            {recipes?.map((recipe, index) => (
              <Recipe key={index} recipe={recipe} index={index} />
            ))}
          </div>
        </div>
      )}
    </>
  );
};

export default RecipesView;
