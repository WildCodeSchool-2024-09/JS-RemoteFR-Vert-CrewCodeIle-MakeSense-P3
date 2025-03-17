import { Link, useOutletContext } from "react-router-dom";
import style from "./NavBar.module.css";

function NavBar() {
  const { auth, setAuth } = useOutletContext() as {
    auth: Auth | null;
    setAuth: (auth: Auth | null) => void;
  };

  return (
    <nav>
      <ul className={style.navContainer}>
        <li>
          <Link to="/homepage">Home</Link>
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
  );
}

export default NavBar;
