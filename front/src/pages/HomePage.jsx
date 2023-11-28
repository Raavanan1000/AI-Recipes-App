import RecipesView from "../components/RecipesView";
import SideBar from "../components/SideBar";
import { ChatContextProvider } from "../context/chatContext";
import { RecipeContextProvider } from "../context/recipeContext";

export default function HomePage() {
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
}
