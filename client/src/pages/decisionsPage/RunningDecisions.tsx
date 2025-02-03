import NavBar from "../../components/navBar/NavBar";
import style from "./decisions.module.css";

export default function RunningDecision() {
  return (
    <div>
      <NavBar />
      <main>
        <button type="button" className={style.buttonCreateDecision}>
          Créer une prise de décision
        </button>
        <section>
          <h2>Les décisions en cours</h2>
          <div className={style.cardsContainer}>
            cards : Les décisions en cours
          </div>
        </section>
        <button type="button" className={style.buttonScrollToTop}>
          Revenir en haut
        </button>
      </main>
    </div>
  );
}
