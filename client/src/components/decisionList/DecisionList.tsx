import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./decisionList.module.css";

type Decision = {
  id: number;
  title: string;
  country: string;
  description: string;
  min_date: string;
  max_date: string;
  context: string;
  profit: string;
  risk: string;
  firstname: string;
  lastname: string;
  avatar: string;
};

export default function DecisionList() {
  const [decisions, setDecisions] = useState<Decision[]>([]);

  useEffect(() => {
    const fetchDecisions = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/decisions`,
        );
        if (response.ok) {
          const data = await response.json();
          setDecisions(data);
        } else {
          toast.error("Erreur lors du chargement des décisions");
        }
      } catch (err) {
        toast.error("Erreur de connexion au serveur");
      }
    };

    fetchDecisions();
  }, []);

  return (
    <section className={style.grid}>
      {decisions.map((decision) => (
        <NavLink key={decision.id} to={`/decisionslist/${decision.id}`}>
          <section className={style.card}>
            <p className={style.userInfo}>
              <span className={style.country}>{decision.country}</span>
            </p>
            <h2 className={style.title}>{decision.title}</h2>
            <p className={style.description}>{decision.description}</p>
            <p className={style.dates}>
              Du{" "}
              <strong>
                {new Date(decision.min_date).toLocaleDateString("fr-FR")}
              </strong>{" "}
              au{" "}
              <strong>
                {new Date(decision.max_date).toLocaleDateString("fr-FR")}
              </strong>
            </p>
            <p className={style.detail}>
              <strong>Contexte :</strong> {decision.context}
            </p>
            <p className={style.detail}>
              <strong>Bénéfices :</strong> {decision.profit}
            </p>
            <p className={style.detail}>
              <strong>Risques :</strong> {decision.risk}
            </p>
            <article className={style.footer}>
              <img
                src={
                  decision.avatar === null || decision.avatar === undefined
                    ? decision.avatar
                    : "/utilisateur.png"
                }
                alt={`${decision.firstname} ${decision.lastname}`}
                className={style.profilePicture}
              />
              <p className={style.userInfo}>
                par
                <span className={style.userName}>
                  {decision.firstname} {decision.lastname}
                </span>
              </p>
            </article>
          </section>
        </NavLink>
      ))}
    </section>
  );
}
