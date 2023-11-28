import { useEffect, useState } from "react";
import useApi from "../hooks/useApi";

export default function SeasonRecipes({ withAllergies = false }) {
  const api = useApi();
  const [recipes, setRecipes] = useState([]);
  useEffect(() => {
    async function getRecipes() {
      const res = await api.getRecipesByCurrentSeason();
      setRecipes(res.data ?? []);
    }

    getRecipes();
  }, [withAllergies]);

  return (
    <section className="flex flex-col flex-grow w-full px-4 overflow-y-scroll sm:px-10 md:px-32">
      <div className="flex my-2">
        <div className="w-screen overflow-hidden">
          <ul className="grid grid-cols-2 gap-2 mx-10 cursor-pointer">
            {recipes.map((item, index) => (
              <li
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
