import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useLocation, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import useApi from "../hooks/useApi";

export default function RecipePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const recipe = location.state.recipe;
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [accompaniments, setccompaniments] = useState([]);

  const [shopping, setShopping] = useState([]);
  const [searchingShopping, setSearchingShopping] = useState(false);

  useEffect(() => {
    setShopping([]);
    setccompaniments([]);
  }, [recipe.id]);

  async function handleClick() {
    try {
      setLoading(true);
      const res = await api.searchRecipeAccompaniment(recipe.id);
      if (!Array.isArray(res.data)) {
        setccompaniments([]);
      } else {
        setccompaniments(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  async function getShopping() {
    try {
      setSearchingShopping(true);
      const res = await api.searchShopping(recipe.id);
      if (!Array.isArray(res.data)) {
        setShopping([]);
      } else {
        setShopping(res.data);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setSearchingShopping(false);
    }
  }

  async function copyshopping() {
    navigator.clipboard.writeText(shopping.join("\n"));
    toast.success("Copied!");
  }

  return (
    <div className="p-9">
      <button
        className="h-12 text-white font-bold px-5 py-3 self-center bg-[#ff9500] mt-8 rounded-lg mb-7"
        type="button"
        onClick={() => {
          navigate(-1);
        }}
      >
        Back
      </button>
      <div className="flex flex-col">
        <div className="flex">
          <img
            className="h-60 w-60 object-cover"
            src={
              recipe.image || "https://source.unsplash.com/random/345x194/?food"
            }
            alt="image"
          />
          <div className="ml-4 relative">
            <h1 className="text-3xl">{recipe.name}</h1>
            <p className="text-base mt-5 max-w-xs">{recipe.description}</p>
          </div>
          <div className="ml-20 flex flex-col items-start">
            <button
              className="px-2 py-3 bg-neutral rounded-lg mb-7 w-28 [&>div]:bg-transparent"
              type="button"
              onClick={getShopping}
            >
              {searchingShopping ? <Loader /> : "Shopping list"}
            </button>
            <div className="flex flex-row gap-x-3 gap-y-5 flex-wrap max-w-md max-h-48 overflow-auto">
              {shopping.map((name, i) => (
                <span
                  className="border border-slate-500 px-5 py-1 rounded-full max-w-fit"
                  key={i}
                >
                  {name}
                </span>
              ))}
            </div>
            {shopping.length === 0 ? null : (
              <div>
                <button
                  className="text-white font-bold px-4 py-2 self-center bg-[#ff9500] rounded-lg mt-5 hover:opacity-70"
                  type="button"
                  onClick={copyshopping}
                >
                  Copy
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          className="px-2 py-3 bg-neutral mt-8 rounded-lg mb-7 w-72 [&>div]:bg-transparent"
          type="button"
          onClick={handleClick}
        >
          {loading ? <Loader /> : "Suggest Accompaniments"}
        </button>
        <div className="mb-8 flex gap-x-4">
          {accompaniments.map((a, i) => (
            <span
              className="mb-3 border border-slate-500 px-2 py-2 rounded-full"
              key={i}
            >
              {a}
            </span>
          ))}
        </div>
      </div>
      <div className="flex mt-8 gap-x-10">
        <div className="w-80">
          <span className="text-xl font-bold">Ingredients</span>
          <ul className="mt-5">
            {recipe.ingredients.map((ingredient, index) => (
              <li className="border-t-2 border-t-[#447d751a] py-2" key={index}>
                <span>{ingredient}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-96">
          <span className="text-xl font-bold">Steps</span>
          <ul className="flex flex-col mt-5 gap-y-3">
            {recipe.steps.map((step, index) => (
              <li key={index}>
                <span className="font-bold">{`STEP ${index + 1}`}</span>
                <p>{step}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
