import style from "./homePage.module.css";

export default function HomePage() {
  return (
    <div>
      <main>
        <button type="button" className={style.buttonCreateDecision}>
          Créer une prise de décision
        </button>
        <section>
          <h2>Les décisions où je participe</h2>
          <div className={style.cardsContainer}>
            cards : Les décisions où je participe
            <div className="container">
              <div className="grid" />
            </div>
            ;
          </div>
        </section>
        <section>
          <h2>Mes décisions</h2>
          <div className={style.cardsContainer}>cards : Mes décisions</div>
          <div className="container">
            <div className="grid" />
          </div>
        </section>
        <section>
          <h2>Les décisions en cours</h2>
          <div className={style.cardsContainer}>
            cards : Les décisions en cours
          </div>
          <div className="container">
            <div className="grid" />
          </div>
        </section>
        <section>
          <h2>Les décisions archivées</h2>
          <div className={style.cardsContainer}>
            cards : Les décisions archivées
          </div>
          <div className="container">
            <div className="grid" />
          </div>
        </section>
        <button type="button" className={style.buttonScrollToTop}>
          Revenir en haut
        </button>
      </main>
    </div>
  );
}
