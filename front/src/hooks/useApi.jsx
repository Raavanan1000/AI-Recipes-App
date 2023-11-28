import axios from "axios";
import { useEffect, useState } from "react";
import { useUser } from "../context/userContext";

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
  const user = useUser();
  const [token, setToken] = useState(() => localStorage.getItem("accessToken"));

  useEffect(() => {
    setToken(localStorage.getItem("accessToken"));
  }, [user]);

  function login(email, password) {
    return apiClient.post("auth/login", { email, password });
  }

  function addFavorites(data) {
    return apiClient.post("favorites", { ...data }, token);
  }

  function getFavorites() {
    return apiClient.get("favorites", token);
  }

  function deleteFavorite(id) {
    return apiClient.delete(`favorites/${id}`, token);
  }

  function searchRecipe(search) {
    return apiClient.get(`recipe/${search}`, token);
  }

  function getRecipe(query) {
    return apiClient.post(`recipe/`, { query: query }, token);
  }

  function getLoggedInUser() {
    return apiClient.get("users/current", token);
  }

  return {
    login,
    addFavorites,
    getFavorites,
    deleteFavorite,
    searchRecipe,
    getRecipe,
    getLoggedInUser,
  };
}
