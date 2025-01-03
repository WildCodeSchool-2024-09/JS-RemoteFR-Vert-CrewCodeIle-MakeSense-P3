import DecisionCard from "../../components/decisionCard/DecisionCard";
import decisionsData from "../../data/decisions.json";
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
          <div className={style.container}>
            <div className={style.grid}>
              {decisionsData.decisions.map((decision) => (
                <DecisionCard key={decision.Id} decision={decision} />
              ))}
            </div>
          </div>
        </section>
        <section>
          <h2>Mes décisions</h2>
          <div className={style.container}>
            <div className={style.grid}>
              {decisionsData.decisions.map((decision) => (
                <DecisionCard key={decision.Id} decision={decision} />
              ))}
            </div>
          </div>
        </section>
        <section>
          <h2>Les décisions en cours</h2>
          <div className={style.container}>
            <div className={style.grid}>
              {decisionsData.decisions.map((decision) => (
                <DecisionCard key={decision.Id} decision={decision} />
              ))}
            </div>
          </div>
        </section>
        <section>
          <h2>Les décisions archivées</h2>
          <div className={style.container}>
            <div className={style.grid}>
              {decisionsData.decisions.map((decision) => (
                <DecisionCard key={decision.Id} decision={decision} />
              ))}
            </div>
          </div>
        </section>
        <button type="button" className={style.buttonScrollToTop}>
          Revenir en haut
        </button>
      </main>
    </div>
  );
}
