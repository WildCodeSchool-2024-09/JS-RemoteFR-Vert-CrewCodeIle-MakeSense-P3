import { useState } from "react";
import { NavLink } from "react-router-dom";
import style from "./NavBar.module.css";

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setIsDropdownOpen((currentState) => !currentState);
  };

  const closeDropdown = () => {
    setIsDropdownOpen(false);
  };

  return (
      <nav className={style.navContainer}>
        <NavLink to={"/homepage"}>
          <img
            src="/logo.png"
            alt="Logo img"
            className={style.logoImage}
          />
        </NavLink>
        <ul className={style.navBarLink}>
          <li>
            <button
              type="button"
              className={style.dropdownButton}
              onClick={toggleDropdown}
            >
              Les décisions
            </button>
            {isDropdownOpen && (
              <ul className={style.dropdownMenu}>
                <li>
                  <button
                    type="button"
                    className={style.dropdownItemButton}
                    onClick={closeDropdown}
                  >
                    Les décisions où je participe
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={style.dropdownItemButton}
                    onClick={closeDropdown}
                  >
                    Mes décisions
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={style.dropdownItemButton}
                    onClick={closeDropdown}
                  >
                    Les décisions en cours
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={style.dropdownItemButton}
                    onClick={closeDropdown}
                  >
                    Les décisions archivées
                  </button>
                </li>
                <li>
                  <button
                    type="button"
                    className={style.dropdownItemButton}
                    onClick={closeDropdown}
                  >
                    Toutes les décisions
                  </button>
                </li>
              </ul>
            )}
          </li>
          <li>
            <button type="button" className={style.notificationButton}>
              Notification
            </button>
          </li>
          <li>
            <NavLink to={"/profile"}>
                <img
                  src="/utilisateur.png"
                  alt="Profil img"
                  className={style.profileImage}
                />
            </NavLink>
          </li>
        </ul>
      </nav>
  );
}

export default NavBar;
