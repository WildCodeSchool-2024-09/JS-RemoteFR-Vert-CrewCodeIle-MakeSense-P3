import styles from "./app.module.css";
import DecisionCard from "./components/decisionCard/DecisionCard";
import decisionsData from "./data/decisions.json";

export default function App() {
  return (
    <div className={styles.container}>
      <div className={styles.grid}>
        {decisionsData.decisions.map((decision) => (
          <DecisionCard key={decision.Id} decision={decision} />
        ))}
      </div>
    </div>
  );
}
