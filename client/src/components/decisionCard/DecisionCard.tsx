import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { DecisionDetailType } from "../../lib/definitions";
import style from "./decisionCard.module.css";

export default function DecisionCard({ id }: { id: string }) {
  const [decision, setDecision] = useState<DecisionDetailType | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    const fetchDecision = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/decision/${id}`,
        );
        if (!response.ok) {
          throw new Error("Erreur lors de la récupération");
        }
        const data: DecisionDetailType = await response.json();
        setDecision(data);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchDecision();
  }, [id]);

  if (loading) return <p>Chargement...</p>;
  if (error) return <p>Erreur lors du chargement des données.</p>;

  const handleClick = () => {
    navigate(`/decisionslist/${id}`);
  };

  const handleKeyPress = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      handleClick();
    }
  };

  return (
    decision && (
      <section
        className={style.card}
        onClick={handleClick}
        onKeyUp={handleKeyPress}
      >
        <h2 className={style.title}>{decision.title}</h2>

        <article className={style.footer}>
          <p className={style.userInfo}>
            par{" "}
            <span className={style.userName}>
              {decision.firstname} {decision.lastname}
            </span>
          </p>
        </article>
      </section>
    )
  );
}
