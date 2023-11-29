import { useLocation, useNavigate } from "react-router-dom";

export default function RecipePage() {
  const navigate = useNavigate();
  const location = useLocation();
  const recipe = location.state.recipe;

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
      <div className="flex">
        <img
          className="h-60 w-60 object-cover"
          src={
            recipe.image || "https://source.unsplash.com/random/345x194/?food"
          }
          alt="image"
        />
        <div className="ml-4">
          <h1 className="text-3xl">{recipe.name}</h1>
          <p className="text-base mt-5 max-w-xs">{recipe.description}</p>
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
