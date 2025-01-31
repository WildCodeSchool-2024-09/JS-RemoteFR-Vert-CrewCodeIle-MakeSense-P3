import NavBar from "../../components/navBar/NavBar";
import style from "./homePage.module.css";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <main className={style.main}>
        <button type="button" className={style.buttonCreateDecision}>
          Créer une prise de décision
        </button>
        <section className={style.section}>
          <h2 className={style.titleH2}>Les décisions où je participe</h2>
          <div className={style.cardsContainer}>
            cards : Les décisions où je participe
          </div>
        </section>
        <section className={style.section}>
          <h2 className={style.titleH2}>Mes décisions</h2>
          <div className={style.cardsContainer}>cards : Mes décisions</div>
        </section>
        <section className={style.section}>
          <h2 className={style.titleH2}>Les décisions en cours</h2>
          <div className={style.cardsContainer}>
            cards : Les décisions en cours
          </div>
        </section>
        <section className={style.section}>
          <h2 className={style.titleH2}>Les décisions archivées</h2>
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
