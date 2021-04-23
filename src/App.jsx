import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navigationbar";
import ChannelContextProvider from "./contexts/ChannelContext";
import ProgramContextProvider from "./contexts/ProgramContext";
import Home from "./pages/Home";
import ProgramsPage from "./pages/ProgramsPage";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <ChannelContextProvider>
          <ProgramContextProvider>
            <Navbar />
            <Route exact path="/" component={Home} />
            <Route exact path="/programs/:channelId" component={ ProgramsPage } />
          </ProgramContextProvider>
        </ChannelContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
