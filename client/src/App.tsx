import { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import "./App.css";
import { Bounce, ToastContainer } from "react-toastify";

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
      <nav>
        <ul className="navContainer">
          <li>
            <Link to="/">Home</Link>
          </li>
          {auth == null ? (
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/register">Register</Link>
              </li>
            </>
          ) : (
            <li>
              <button
                type="button"
                onClick={() => {
                  setAuth(null);
                }}
              >
                Logout
              </button>
            </li>
          )}
        </ul>
      </nav>
      <main>
        <Outlet context={{ auth, setAuth }} />
      </main>
    </>
  );
}

export default App;
