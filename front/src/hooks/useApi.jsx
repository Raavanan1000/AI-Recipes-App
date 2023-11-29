import axios from "axios";
import { useEffect, useState } from "react";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

function getRequestHeaders(token = null, withBody = false) {
  return {
    "Content-Type": withBody ? "application/json" : undefined,
    Authorization: token != null ? `Bearer ${token}` : undefined,
  };
}

const apiClient = {
  get: function (url, token = null) {
    return axiosInstance.get(url, {
      headers: getRequestHeaders(token),
    });
  },
  post: function (url, data = null, token = null) {
    return axiosInstance.post(url, data, {
      headers: getRequestHeaders(token, data != null),
    });
  },
  put: function (url, data = null, token = null) {
    return axiosInstance.put(url, data, {
      headers: getRequestHeaders(token, data != null),
    });
  },
  patch: function (url, data = null, token = null) {
    return axiosInstance.patch(url, data, {
      headers: getRequestHeaders(token, data != null),
    });
  },
  delete: function (url, token = null) {
    return axiosInstance.delete(url, {
      headers: getRequestHeaders(token),
    });
  },
};

export default function useApi() {
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, []);

  function login(email, password) {
    return apiClient.post("auth/login", { email, password });
  }

  function addFavorites(data) {
    return apiClient.post("favourites", { ...data }, token);
  }

  function getFavorites() {
    return apiClient.get("favourites", token);
  }

  function deleteFavorite(id) {
    return apiClient.delete(`favourites/${id}`, token);
  }

  function searchRecipe(search) {
    return apiClient.get(`recipes/${search}`, token);
  }

  function getRecipes(query, considerAllergies) {
    return apiClient.post("recipes", { query, considerAllergies }, token);
  }

  function getLoggedInUser() {
    return apiClient.get("users/current", token);
  }

  function getRecipesByCurrentSeason(withAllergies = false) {
    const url = withAllergies
      ? "recipes/season?withAllergies=true"
      : "recipes/season";
    return apiClient.get(url, token);
  }

  function addAllergy(allergy) {
    return apiClient.patch("users/current", { allergy }, token);
  }

  function searchRecipeAccompaniment(recipeId) {
    return apiClient.get("recipes/" + recipeId + "/accompaniments", token);
  }

  function searchShopping(recipeId) {
    return apiClient.get("recipes/" + recipeId + "/shoppings", token);
  }

  return {
    login,
    addFavorites,
    getFavorites,
    deleteFavorite,
    searchRecipe,
    getLoggedInUser,
    getRecipes,
    getRecipesByCurrentSeason,
    addAllergy,
    searchRecipeAccompaniment,
    searchShopping,
  };
}
