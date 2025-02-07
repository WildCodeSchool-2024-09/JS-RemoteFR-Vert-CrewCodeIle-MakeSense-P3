import { NavLink } from "react-router-dom";
import ArchivedDecisions from "../../components/decisions/ArchivedDecisions";
import MyDecisions from "../../components/decisions/MyDecisions";
import ParticipatingDecisions from "../../components/decisions/ParticipatingDecisions";
import RunningDecisions from "../../components/decisions/RunningDecisions";
import NavBar from "../../components/navBar/NavBar";
import style from "./homePage.module.css";

export default function HomePage() {
  return (
    <div>
      <NavBar />
      <main className={style.main}>
        <NavLink to={"/decisionformpage"}>
          <button type="button" className={style.buttonCreateDecision}>
            Créer une prise de décision
          </button>
        </NavLink>
        <section className={style.section}>
          <h2 className={style.titleH2}>Les décisions où je participe</h2>
          <div className={style.cardsContainer}>
            <ParticipatingDecisions />
          </div>
        </section>
        <section className={style.section}>
          <h2 className={style.titleH2}>Mes décisions</h2>
          <div className={style.cardsContainer}>
            <MyDecisions />
          </div>
        </section>
        <section className={style.section}>
          <h2 className={style.titleH2}>Les décisions en cours</h2>
          <div className={style.cardsContainer}>
            <RunningDecisions />
          </div>
        </section>
        <section className={style.section}>
          <h2 className={style.titleH2}>Les décisions archivées</h2>
          <div className={style.cardsContainer}>
            <ArchivedDecisions />
          </div>
        </section>
        <button type="button" className={style.buttonScrollToTop}>
          Revenir en haut
        </button>
      </main>
    </div>
  );
}
