import NavBar from "../../components/navBar/NavBar";
import style from "./decisions.module.css";

export default function AllDecision() {
  return (
    <div>
      <NavBar />
      <main>
        <button type="button" className={style.buttonCreateDecision}>
          Créer une prise de décision
        </button>
        <section>
          <h2>Toutes Les décisions</h2>
          <div className={style.cardsContainer}>
            cards : Toutes les décisions
          </div>
        </section>
        <button type="button" className={style.buttonScrollToTop}>
          Revenir en haut
        </button>
      </main>
    </div>
  );
}
