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

  const handleKeyPress = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      action();
    }
  };

  return (
    <div className={style.NavBar}>
      <nav className={style.navContainer}>
        <div className={style.title}>Intra_Sense</div>
        <ul className={style.navBarLink}>
          <li>
            <button
              type="button"
              className={style.dropdownButton}
              onClick={toggleDropdown}
              onKeyDown={(event) => handleKeyPress(event, toggleDropdown)}
            >
              Les décisions
            </button>
            {isDropdownOpen && (
              <ul className={style.dropdownMenu}>
                <li
                  onClick={() => {
                    closeDropdown();
                  }}
                  onKeyDown={(event) =>
                    handleKeyPress(event, () => {
                      closeDropdown();
                    })
                  }
                >
                  Les décisions où je participe
                </li>
                <li
                  onClick={() => {
                    closeDropdown();
                  }}
                  onKeyDown={(event) =>
                    handleKeyPress(event, () => {
                      closeDropdown();
                    })
                  }
                >
                  Mes décisions
                </li>
                <li
                  onClick={() => {
                    closeDropdown();
                  }}
                  onKeyDown={(event) =>
                    handleKeyPress(event, () => {
                      closeDropdown();
                    })
                  }
                >
                  Les décisions en cours
                </li>
                <li
                  onClick={() => {
                    closeDropdown();
                  }}
                  onKeyDown={(event) =>
                    handleKeyPress(event, () => {
                      closeDropdown();
                    })
                  }
                >
                  Les décisions archivées
                </li>
                <li
                  onClick={() => {
                    closeDropdown();
                  }}
                  onKeyDown={(event) =>
                    handleKeyPress(event, () => {
                      closeDropdown();
                    })
                  }
                >
                  Toutes les décisions
                </li>
              </ul>
            )}
          </li>
          <li>
            <button
              type="button"
              className={style.notificationButton}
              onClick={() => {}}
              onKeyDown={(event) =>
                handleKeyPress(event, () => console.log("Notification clicked"))
              }
            >
              Notification
            </button>
          </li>
          <li>
            <NavLink to={"/profile"}>
              <div className={style.profileIcon}>
                <img
                  src="../../../public/utilisateur.png"
                  alt="Profil img"
                  className={style.profileImage}
                />
              </div>
            </NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
}

export default NavBar;
