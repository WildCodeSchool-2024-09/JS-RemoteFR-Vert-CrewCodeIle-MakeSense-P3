import { Outlet } from "react-router-dom";
import "./App.css";
import Decision from "./components/Decision";

function App() {
  return (
    <>
      <Outlet />
      <Decision />
    </>
  );
}

export default App;
