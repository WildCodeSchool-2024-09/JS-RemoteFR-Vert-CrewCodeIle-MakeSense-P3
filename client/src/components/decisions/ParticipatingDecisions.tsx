import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import DecisionCard from "../../components/decisionCard/DecisionCard";
import style from "./decisionsComponents.module.css";

export default function ParticipatingDecisions() {
  const [decisions, setDecisions] = useState<DecisionDetailCard[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/participatingdecisions`, {
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setDecisions(data);
      })
      .catch(() => toast.error("Erreur de connexion au serveur"));
  }, []);

  return (
    <div>
      <main>
        <section>
          <div className={style.cardsContainer}>
            {decisions.slice(0, 5).map((decision) => (
              <article key={decision.id}>
                <DecisionCard decision={decision} />
              </article>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
