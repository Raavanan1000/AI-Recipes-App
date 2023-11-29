import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loader from "../components/Loader";

export default function RecipePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const recipe = location.state.recipe;
  const api = useApi();
  const [loading, setLoading] = useState(false);
  const [accompaniments, setccompaniments] = useState([]);

  async function handleClick() {
    try {
      setLoading(true);
      const res = await api.searchRecipeAccompaniment(recipe.id);
      setccompaniments(res.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
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
