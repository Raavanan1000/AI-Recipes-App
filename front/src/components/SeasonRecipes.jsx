import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";
import Thinking from "./Thinking";

export default function SeasonRecipes({ withAllergies = false }) {
  const navigate = useNavigate();
  const api = useApi();
  const [recipes, setRecipes] = useState([]);
  const [loading, isLoading] = useState(false);

  const notify = (msg) => toast.error(msg);

  async function getRecipes() {
    isLoading(true);
    try {
      const res = await api.getRecipesByCurrentSeason();
      setRecipes(res.data ?? []);
      if (res.data.length === 0) {
        notify("No recipes found, try again");
      }
    } catch (err) {
      notify("Error while getting recipes");
    } finally {
      isLoading(false);
    }
  }

  return (
    <section className="flex flex-col flex-grow w-full px-4 overflow-y-scroll sm:px-10 md:px-32">
      {!recipes.length > 0 && !loading && (
        <button
          className="flex w-full p-6 border rounded-lg border-slate-300 hover:border-slate-500"
          onClick={getRecipes}
        >
          <p className="w-full text-center">
            Show recipes adapted for the current season
          </p>
        </button>
      )}
      <Toaster />
      {loading && (
        <div className="flex h-screen justify-center items-center">
          <Thinking />
        </div>
      )}
      <div className="my-2 justify-center items-center">
        <div className="w-full overflow-hidden">
          <ul className="grid grid-cols-2 gap-2 mx-10 cursor-pointer">
            {recipes.map((item) => (
              <li
                onClick={() => {
                  navigate("/home/recipes/" + item.id, {
                    state: { recipe: item },
                  });
                }}
                key={item.id}
                className="p-6 border rounded-lg border-slate-300 hover:border-slate-500"
              >
                <p className="text-base font-semibold">{item.name}</p>
                <p className="text-sm">{item.description}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
