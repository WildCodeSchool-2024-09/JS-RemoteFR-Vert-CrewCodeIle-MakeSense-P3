import NavBar from "../../components/navBar/NavBar";
import style from "./decisions.module.css";

export default function MyDecision() {
  return (
    <div>
      <NavBar />
      <main>
        <button type="button" className={style.buttonCreateDecision}>
          Créer une prise de décision
        </button>
        <section>
          <h2>Mes décisions</h2>
          <div className={style.cardsContainer}>cards : Mes décisions</div>
        </section>
        <button type="button" className={style.buttonScrollToTop}>
          Revenir en haut
        </button>
      </main>
    </div>
  );
}
