import { BrowserRouter, Route, Routes } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import UserProvider from "./context/userContext";
import UserLoader from "./components/UserLoader";
import RecipePage from "./pages/RecipePage";
import RecipesView from "./components/RecipesView";
import AllergiesPage from "./pages/AllergiesPage";

const App = () => {
  return (
    <UserProvider>
      <BrowserRouter>
        <Routes>
          <Route path="login" element={<LoginPage />} />
          <Route
            path="home"
            element={
              <UserLoader>
                <HomePage />
              </UserLoader>
            }
          >
            <Route index element={<RecipesView />} />
            <Route path="allergies" element={<AllergiesPage />} />
            <Route path="recipes/:id" element={<RecipePage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </UserProvider>
  );
};

export default App;
