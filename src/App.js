import Pages from "./pages/Pages";
import Category from "./components/Category";
import TelegramButton from "./components/TelegramButton";
import { BrowserRouter } from "react-router-dom";
import Search from "./components/Search";
function App() {
  return (
    <div className="App">
      <h1>
        <BrowserRouter>
        <Search />
        <TelegramButton />
        <Category />
        <Pages />
        </BrowserRouter>
        
        
      </h1>
    </div>
  );
}

export default App;