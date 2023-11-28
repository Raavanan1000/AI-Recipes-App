import PropTypes from "prop-types";
import { createContext, useContext, useState } from "react";

const RecipeContext = createContext({});

const RecipeContextProvider = (props) => {
  const [recipes, setCurrentRecipes] = useState([
    {
      Name: "Christmas pie",
      url: "https://www.bbcgoodfood.com/recipes/2793/christmas-pie",
      Description:
        "Combine a few key Christmas flavours here to make a pie that both children and adults will adore",
      Author: "Mary Cadogan",
      Ingredients: [
        "2 tbsp olive oil",
        "knob butter",
        "1 onion, finely chopped",
        "500g sausagemeat or skinned sausages",
        "grated zest of 1 lemon",
        "100g fresh white breadcrumbs",
        "85g ready-to-eat dried apricots, chopped",
        "50g chestnut, canned or vacuum-packed, chopped",
        "2 tsp chopped fresh or 1tsp dried thyme",
        "100g cranberries, fresh or frozen",
        "500g boneless, skinless chicken breasts",
        "500g pack ready-made shortcrust pastry",
        "beaten egg, to glaze",
      ],
      Method: [
        "Heat oven to 190C/fan 170C/gas 5. Heat 1 tbsp oil and the butter in a frying pan, then add the onion and fry for 5 mins until softened. Cool slightly. Tip the sausagemeat, lemon zest, breadcrumbs, apricots, chestnuts and thyme into a bowl. Add the onion and cranberries, and mix everything together with your hands, adding plenty of pepper and a little salt.",
        "Cut each chicken breast into three fillets lengthwise and season all over with salt and pepper. Heat the remaining oil in the frying pan, and fry the chicken fillets quickly until browned, about 6-8 mins.",
        "Roll out two-thirds of the pastry to line a 20-23cm springform or deep loose-based tart tin. Press in half the sausage mix and spread to level. Then add the chicken pieces in one layer and cover with the rest of the sausage. Press down lightly.",
        "Roll out the remaining pastry. Brush the edges of the pastry with beaten egg and cover with the pastry lid. Pinch the edges to seal, then trim. Brush the top of the pie with egg, then roll out the trimmings to make holly leaf shapes and berries. Decorate the pie and brush again with egg.",
        "Set the tin on a baking sheet and bake for 50-60 mins, then cool in the tin for 15 mins. Remove and leave to cool completely. Serve with a winter salad and pickles.",
      ],
    },
    {
      Name: "Christmas pie",
      url: "https://www.bbcgoodfood.com/recipes/2793/christmas-pie",
      Description:
        "Combine a few key Christmas flavours here to make a pie that both children and adults will adore",
      Author: "Mary Cadogan",
      Ingredients: [
        "2 tbsp olive oil",
        "knob butter",
        "1 onion, finely chopped",
        "500g sausagemeat or skinned sausages",
        "grated zest of 1 lemon",
        "100g fresh white breadcrumbs",
        "85g ready-to-eat dried apricots, chopped",
        "50g chestnut, canned or vacuum-packed, chopped",
        "2 tsp chopped fresh or 1tsp dried thyme",
        "100g cranberries, fresh or frozen",
        "500g boneless, skinless chicken breasts",
        "500g pack ready-made shortcrust pastry",
        "beaten egg, to glaze",
      ],
      Method: [
        "Heat oven to 190C/fan 170C/gas 5. Heat 1 tbsp oil and the butter in a frying pan, then add the onion and fry for 5 mins until softened. Cool slightly. Tip the sausagemeat, lemon zest, breadcrumbs, apricots, chestnuts and thyme into a bowl. Add the onion and cranberries, and mix everything together with your hands, adding plenty of pepper and a little salt.",
        "Cut each chicken breast into three fillets lengthwise and season all over with salt and pepper. Heat the remaining oil in the frying pan, and fry the chicken fillets quickly until browned, about 6-8 mins.",
        "Roll out two-thirds of the pastry to line a 20-23cm springform or deep loose-based tart tin. Press in half the sausage mix and spread to level. Then add the chicken pieces in one layer and cover with the rest of the sausage. Press down lightly.",
        "Roll out the remaining pastry. Brush the edges of the pastry with beaten egg and cover with the pastry lid. Pinch the edges to seal, then trim. Brush the top of the pie with egg, then roll out the trimmings to make holly leaf shapes and berries. Decorate the pie and brush again with egg.",
        "Set the tin on a baking sheet and bake for 50-60 mins, then cool in the tin for 15 mins. Remove and leave to cool completely. Serve with a winter salad and pickles.",
      ],
    },
    {
      Name: "Christmas pie",
      url: "https://www.bbcgoodfood.com/recipes/2793/christmas-pie",
      Description:
        "Combine a few key Christmas flavours here to make a pie that both children and adults will adore",
      Author: "Mary Cadogan",
      Ingredients: [
        "2 tbsp olive oil",
        "knob butter",
        "1 onion, finely chopped",
        "500g sausagemeat or skinned sausages",
        "grated zest of 1 lemon",
        "100g fresh white breadcrumbs",
        "85g ready-to-eat dried apricots, chopped",
        "50g chestnut, canned or vacuum-packed, chopped",
        "2 tsp chopped fresh or 1tsp dried thyme",
        "100g cranberries, fresh or frozen",
        "500g boneless, skinless chicken breasts",
        "500g pack ready-made shortcrust pastry",
        "beaten egg, to glaze",
      ],
      Method: [
        "Heat oven to 190C/fan 170C/gas 5. Heat 1 tbsp oil and the butter in a frying pan, then add the onion and fry for 5 mins until softened. Cool slightly. Tip the sausagemeat, lemon zest, breadcrumbs, apricots, chestnuts and thyme into a bowl. Add the onion and cranberries, and mix everything together with your hands, adding plenty of pepper and a little salt.",
        "Cut each chicken breast into three fillets lengthwise and season all over with salt and pepper. Heat the remaining oil in the frying pan, and fry the chicken fillets quickly until browned, about 6-8 mins.",
        "Roll out two-thirds of the pastry to line a 20-23cm springform or deep loose-based tart tin. Press in half the sausage mix and spread to level. Then add the chicken pieces in one layer and cover with the rest of the sausage. Press down lightly.",
        "Roll out the remaining pastry. Brush the edges of the pastry with beaten egg and cover with the pastry lid. Pinch the edges to seal, then trim. Brush the top of the pie with egg, then roll out the trimmings to make holly leaf shapes and berries. Decorate the pie and brush again with egg.",
        "Set the tin on a baking sheet and bake for 50-60 mins, then cool in the tin for 15 mins. Remove and leave to cool completely. Serve with a winter salad and pickles.",
      ],
    },
  ]);

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
