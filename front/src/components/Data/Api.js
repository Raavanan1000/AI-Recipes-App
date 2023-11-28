export const getRecipes = async () => {
  const res = await fetch("http://localhost:3001/recipes");
  const data = await res.json();
  return data;
};
