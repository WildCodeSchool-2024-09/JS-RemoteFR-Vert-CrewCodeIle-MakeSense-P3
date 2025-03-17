import { Outlet } from "react-router-dom";
import { useState } from "react";
import "./App.css";
import { Bounce, ToastContainer } from "react-toastify";

type Auth = {
  credentials: {
    id: number;
    email: string;
  };
  token: string;
};
function App() {
  //mettre à disposition les données d'authentifications sur toutes les pages

  const [auth, setAuth] = useState(null as Auth | null);
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
      />

      <main>
        <Outlet context={{ auth, setAuth }} />
      </main>
    </>
  );
}

export default App;
