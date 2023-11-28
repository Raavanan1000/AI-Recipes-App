import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const RecipeContext = createContext({});

const RecipeContextProvider = (props) => {
  const [recipes, setCurrentRecipes] = useState([]);

  const setRecipes = (recipes) => {
    setCurrentRecipes(recipes);
  };

  return (
    <RecipeContext.Provider value={{ recipes, setRecipes }}>
      {props.children}
    </RecipeContext.Provider>
  );
};

const useRecipeContext = () => {
  return useContext(RecipeContext);
};

export { RecipeContextProvider, useRecipeContext };

RecipeContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
