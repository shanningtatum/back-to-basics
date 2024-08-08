import logo from "./logo.svg";
import "./App.css";
import Header from "./Header";
import Main from "./Main";

function App() {
  return (
    <div className="App">
      <Header />
      <Main />
    </div>
  );
}

// create a main page
// run api to get basic berries (maybe like 10)
// on click add 1 berry (will need local storage)
// 1 berry x price x multiplier
export default App;
