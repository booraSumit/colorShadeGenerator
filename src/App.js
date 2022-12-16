import "./App.css";
import ColorPlatlet from "./components/colorplatlet";
// import Shade from "./components/colorCard/shade";
// import "./components/colorCard/colorCard.css";

function App() {
  return (
    <main className="container">
      {
        <ColorPlatlet />
        //  <Shade />
      }
    </main>
  );
}

export default App;
