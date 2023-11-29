import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const FavoriteContext = createContext({});

const FavoriteContextProvider = (props) => {
  const [favorite, setCurrentFavorite] = useState([]);

  const setFavorite = (favorite) => {
    setCurrentFavorite(favorite);
  };

  return (
    <FavoriteContext.Provider value={{ favorite, setFavorite }}>
      {props.children}
    </FavoriteContext.Provider>
  );
};

const useFavoriteContext = () => {
  return useContext(FavoriteContext);
};

export { FavoriteContextProvider, useFavoriteContext };

FavoriteContextProvider.propTypes = {
  children: PropTypes.node.isRequired,
};
