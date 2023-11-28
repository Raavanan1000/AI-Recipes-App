import { useState, useRef, useEffect } from "react";
import Thinking from "./Thinking";
import { MdSend } from "react-icons/md";
import { replaceProfanities } from "no-profanity";
import { davinci } from "../utils/davinci";
import Recipe from "./Recipe";
import { useRecipeContext } from "../context/recipeContext";

const RecipesView = () => {
  const [recommendations, setRecommendations] = useState([
    {
      title: "Recipe chicken",
      prompt: "Recipe chicken with chicken and vegetables",
    },
    {
      title: "Recipe chicken with sauce",
      prompt: "Recipe chicken with chicken and sauce",
    },
    {
      title: "Recipe vegetables",
      prompt: "Recipe vegetables with vegetables and sauce",
    },
    {
      title: "Recipe noodles",
      prompt: "Recipe noodles with noodles and sauce",
    },
  ]);

  const inputRef = useRef();
  const [formValue, setFormValue] = useState("");
  const [loading, isLoading] = useState(false);
  const { recipes, setRecipes } = useRecipeContext();

  const [takeIntoAccountAllergies, setTakeIntoAccountAllergies] =
    useState(true);

  const updateRecipes = (newRecipes) => {
    setRecipes(newRecipes);
  };

  const updateRecipeSearch = (recipeSearch) => {
    localStorage.setItem("recipeSearch", recipeSearch);
  };

  const sendMessage = async (e) => {
    e.preventDefault();

    const cleanPrompt = replaceProfanities(formValue);

    isLoading(true);
    setFormValue("");
    updateRecipeSearch(cleanPrompt);

    const key = "";
    try {
      const LLMresponse = await davinci(cleanPrompt, key);
      LLMresponse && updateRecipes(LLMresponse, true);
    } catch (err) {
      window.alert(`Error: ${err} please try again later`);
    }

    isLoading(false);
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      sendMessage(e);
    }
  };

  useEffect(() => {
    inputRef.current && inputRef.current.focus();
  }, []);

  return (
    <main className="w-screen flex flex-col h-screen p-1 overflow-scroll dark:bg-light-grey">
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

          <section className="flex flex-col flex-grow w-full px-4 overflow-y-scroll sm:px-10 md:px-32">
            <div className="flex my-2">
              <div className="w-screen overflow-hidden">
                <ul className="grid grid-cols-2 gap-2 mx-10">
                  {recommendations.map((item, index) => (
                    <li
                      onClick={() => setFormValue(item.prompt)}
                      key={index}
                      className="p-6 border rounded-lg border-slate-300 hover:border-slate-500"
                    >
                      <p className="text-base font-semibold">{item.title}</p>
                      <p className="text-sm">{item.prompt}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {loading && <Thinking />}
          </section>
          <form
            className="flex flex-col px-10 mb-2 md:px-32 join sm:flex-row"
            onSubmit={sendMessage}
          >
            <select
              value={"Chat"}
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
    </main>
  );
};

export default RecipesView;
