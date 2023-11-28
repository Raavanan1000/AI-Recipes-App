const BASE_URL = "http://localhost:3001";

export const getRecipes = async () => {
  const res = await fetch(`${BASE_URL}/recipes`);
  const data = await res.json();
  return data;
};

export const postFavorite = async (recipe) => {
  const res = await fetch(`${BASE_URL}/favorites`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(recipe),
  });
  const data = await res.json();
  return data;
};

export const getFavorites = async () => {
  const res = await fetch(`${BASE_URL}/vavorites`);
  const data = await res.json();
  return data;
};

export const deleteFavorite = async (id) => {
  const res = await fetch(`${BASE_URL}/recipes/favorites/${id}`, {
    method: "DELETE",
  });
  const data = await res.json();
  return data;
};
