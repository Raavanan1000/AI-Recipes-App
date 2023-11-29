import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import { ChatContextProvider } from "../context/chatContext";
import { RecipeContextProvider } from "../context/recipeContext";
import { FavoriteContextProvider } from "../context/favoriteContext";

export default function HomePage() {
  return (
    <ChatContextProvider>
      <RecipeContextProvider>
        <FavoriteContextProvider>
          <div className="flex transition duration-500 ease-in-out">
            <SideBar />
            <main className="w-screen flex flex-col h-screen p-1 overflow-scroll dark:bg-light-grey">
              <Outlet />
            </main>
          </div>
        </FavoriteContextProvider>
      </RecipeContextProvider>
    </ChatContextProvider>
  );
}
