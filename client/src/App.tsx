import { Outlet } from "react-router-dom";
import "./App.css";
import { Bounce, ToastContainer } from "react-toastify";

function App() {
  return (
    <>
      <Outlet />
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />
    </>
  );
}

export default App;
