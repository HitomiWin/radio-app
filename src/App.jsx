import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navigationbar";
import ChannelContextProvider from "./contexts/ChannelContext";
import ProgramContextProvider from "./contexts/ProgramContext";
import CategoryContextProvider from "./contexts/CategoryContext";
import FavoriteContextProvider from "./contexts/FavoriteContext";
import Home from "./pages/Home";
import ProgramPage from "./pages/ProgramPage";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramsByCategory from "./pages/ProgramsByCategory";
import UserContextProvider from "./contexts/UserContext";
import LoginPage from "./pages/LoginPage";
import FavoritePage from "./pages/FavoritePage";

function App() {
  return (
    <div className="app">
      <BrowserRouter>
        <UserContextProvider>
          <ChannelContextProvider>
            <CategoryContextProvider>
              <ProgramContextProvider>
                <FavoriteContextProvider>
                  <Navbar />
                  <Route exact path="/" component={Home} />
                  <Route
                    exact
                    path="/programs/:channelId"
                    component={ProgramsPage}
                  />
                  <Route
                    exact
                    path="/programs/allprogram/:programId"
                    component={ProgramPage}
                  />
                  <Route
                    exact
                    path="/programs/categories/:categoryId"
                    component={ProgramsByCategory}
                  />
                  <Route exact path="/users/login" component={LoginPage} />
                  <Route exact path="/favorite" component={FavoritePage} />
                </FavoriteContextProvider>
              </ProgramContextProvider>
            </CategoryContextProvider>
          </ChannelContextProvider>
        </UserContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
