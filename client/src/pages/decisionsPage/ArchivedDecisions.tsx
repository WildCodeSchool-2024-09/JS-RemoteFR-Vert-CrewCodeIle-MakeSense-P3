import NavBar from "../../components/navBar/NavBar";
import style from "./decisions.module.css";

export default function ArchivedDecision() {
  return (
    <div>
      <NavBar />
      <main>
        <button type="button" className={style.buttonCreateDecision}>
          Créer une prise de décision
        </button>
        <section>
          <h2>Les décisions archivées</h2>
          <div className={style.cardsContainer}>
            cards : Les décisions archivées
          </div>
        </section>
        <button type="button" className={style.buttonScrollToTop}>
          Revenir en haut
        </button>
      </main>
    </div>
  );
}
