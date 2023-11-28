import { ChatContextProvider } from "./context/chatContext";
import SideBar from "./components/SideBar";
import { RecipeContextProvider } from "./context/recipeContext";
import RecipesView from "./components/RecipesView";

const App = () => {
  return (
    <ChatContextProvider>
      <RecipeContextProvider>
        <div className="flex transition duration-500 ease-in-out">
          <SideBar />
          <RecipesView />
        </div>
      </RecipeContextProvider>
    </ChatContextProvider>
  );
};

export default App;
