import style from "./homePage.module.css";

export default function HomePage() {
  return (
    <div>
      {/* <Navbar /> */}
      <main>
        <button type="button" className={style.buttonCreateDecision}>
          Créer une prise de décision
        </button>

        <section>
          <h2>Les décisions où je participe</h2>

          <div className={style.cardsContainer}>
            {/* map des decisions */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nam
            omnis tempore cum quos cupiditate porro alias ducimus facilis
            quibusdam a similique quas quis enim deserunt, velit neque
            reprehenderit excepturi.
          </div>
        </section>

        <section>
          <h2>Mes décisions</h2>
          <div className={style.cardsContainer}>
            {/* map des decisions */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nam
            omnis tempore cum quos cupiditate porro alias ducimus facilis
            quibusdam a similique quas quis enim deserunt, velit neque
            reprehenderit excepturi.
          </div>
        </section>
        <section>
          <h2>Les décisions en cours</h2>
          <div className={style.cardsContainer}>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nam
            omnis tempore cum quos cupiditate porro alias ducimus facilis
            quibusdam a similique quas quis enim deserunt, velit neque
            reprehenderit excepturi.
          </div>
        </section>
        <section>
          <h2>Les décisions archivées</h2>
          <div className={style.cardsContainer}>
            {/* map des decisions */}
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Rem nam
            omnis tempore cum quos cupiditate porro alias ducimus facilis
            quibusdam a similique quas quis enim deserunt, velit neque
            reprehenderit excepturi.
          </div>
        </section>
        <button type="button" className={style.buttonScrollToTop}>
          Revenir en haut
        </button>
      </main>
    </div>
  );
}
