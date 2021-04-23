import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navigationbar";
import ChannelContextProvider from "./contexts/ChannelContext";
import ProgramContextProvider from "./contexts/ProgramContext";
import CategoryContextProvider from "./contexts/CategoryContext"
import Home from "./pages/Home";
import ProgramPage from "./pages/ProgramPage";
import ProgramsPage from "./pages/ProgramsPage";
import ProgramsByCategory from "./pages/ProgramsByCategory"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
          <ProgramContextProvider>
          <CategoryContextProvider>
        <ChannelContextProvider>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/programs/:channelId" component={ ProgramsPage } />
            <Route exact path="/programs/allprogram/:programId" component={ ProgramPage } />
            <Route exact path="/categories/:categoryId" component={ ProgramsByCategory } />
        </ChannelContextProvider>
          </CategoryContextProvider>
          </ProgramContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
