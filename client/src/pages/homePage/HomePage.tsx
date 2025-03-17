import { useEffect, useState } from "react";
import style from "./homePage.module.css";
import { Link } from "react-router-dom";

type Decision = {
  id: number;
  title: string;
};

export default function HomePage() {
  const [decisionList, setDecisionList] = useState([] as Decision[]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/decisions`)
      .then((response) => response.json())
      .then((data: Decision[]) => {
        setDecisionList(data);
      });
  }, []);

  return (
    <>
      <section>
        <ul>
          {decisionList.map((decision) => (
            <li key={decision.id}>
              <Link to={`/decisions/${decision.id}`}>{decision.title}</Link>
            </li>
          ))}
        </ul>
      </section>

      <button type="button" className={style.buttonCreateDecision}>
        Créer une prise de décision
      </button>
      <section>
        <h2>Les décisions où je participe</h2>
        <div className={style.cardsContainer}>
          cards : Les décisions où je participe
        </div>
      </section>
      <section>
        <h2>Mes décisions</h2>
        <div className={style.cardsContainer}>cards : Mes décisions</div>
      </section>
      <section>
        <h2>Les décisions en cours</h2>
        <div className={style.cardsContainer}>
          cards : Les décisions en cours
        </div>
      </section>
      <section>
        <h2>Les décisions archivées</h2>
        <div className={style.cardsContainer}>
          cards : Les décisions archivées
        </div>
      </section>
      <button type="button" className={style.buttonScrollToTop}>
        Revenir en haut
      </button>
    </>
  );
}
