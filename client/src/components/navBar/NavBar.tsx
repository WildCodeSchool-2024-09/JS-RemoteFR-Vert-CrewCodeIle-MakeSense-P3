import { useState } from "react";
import { NavLink } from "react-router-dom";
//import style from "./NavBar.module.css";

function NavBar() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [currentFilter, setCurrentFilter] = useState<string | null>(null);

  const toggleDropdown = () => {
    setIsDropdownOpen((currentState) => !currentState);
  };

  const applyFilter = (filter: string) => {
    setCurrentFilter(filter);
  };

  const handleKeyPress = (event: React.KeyboardEvent, action: () => void) => {
    if (event.key === "Enter" || event.key === " ") {
      action();
    }
  };

  return (
    <div className="NavBar">
      <nav>
        <ul className="navBarLink">
          <li>
            <button
              type="button"
              className="dropdownButton"
              onClick={toggleDropdown}
              onKeyDown={(event) => handleKeyPress(event, toggleDropdown)}
            >
              Les décisions
            </button>
            {isDropdownOpen && (
              <ul className="dropdownMenu">
                <li
                  onClick={() => applyFilter("ParticipationDecisions")}
                  onKeyDown={(event) =>
                    handleKeyPress(event, () =>
                      applyFilter("ParticipationDecisions"),
                    )
                  }
                >
                  Les décisions où je participe
                </li>
                <li
                  onClick={() => applyFilter("MesDecisions")}
                  onKeyDown={(event) =>
                    handleKeyPress(event, () => applyFilter("MesDecisions"))
                  }
                >
                  Mes décisions
                </li>
                <li
                  onClick={() => applyFilter("DecisionsEnCours")}
                  onKeyDown={(event) =>
                    handleKeyPress(event, () => applyFilter("DecisionsEnCours"))
                  }
                >
                  Les décisions en cours
                </li>
                <li
                  onClick={() => applyFilter("DecisionsArchivees")}
                  onKeyDown={(event) =>
                    handleKeyPress(event, () =>
                      applyFilter("DecisionsArchivees"),
                    )
                  }
                >
                  Les décisions archivées
                </li>
                <li
                  onClick={() => applyFilter("ToutesDecisions")}
                  onKeyDown={(event) =>
                    handleKeyPress(event, () => applyFilter("ToutesDecisions"))
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
              className="notificationButton"
              onClick={() => {
                // Action à réaliser pour les notifications ????
              }}
              onKeyDown={(event) =>
                handleKeyPress(event, () => console.log("Notification clicked"))
              }
            >
              Notification
            </button>
          </li>
          <li>
            <NavLink to={"/profile"}>
              <div className="profileIcon">
                <img
                  src="../../assets/images/utilisateur.png"
                  alt="Profil img"
                  className="profileImage"
                />
              </div>
            </NavLink>
          </li>
        </ul>
        {currentFilter && (
          <div className="filterInfo">
            <p>Filtre actuel : {currentFilter}</p>
          </div>
        )}
      </nav>
    </div>
  );
}

export default NavBar;
