import { BrowserRouter, Route } from "react-router-dom";
import Navbar from "./components/Navigationbar";
import ChannelContextProvider from "./contexts/ChannelContext";
import Home from "./pages/Home"
function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <ChannelContextProvider>
      <Navbar />
      <Route exact path="/" component={Home} />
      </ChannelContextProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
