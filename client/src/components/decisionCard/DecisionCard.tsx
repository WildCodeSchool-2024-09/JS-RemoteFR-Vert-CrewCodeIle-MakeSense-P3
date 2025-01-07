import type { Decision } from "../../types/definitions";
import { getCategoryColor } from "../../utils/categoryColors";
import style from "./decisionCard.module.css";

export default function DecisionCard({ decision }: { decision: Decision }) {
  return (
    <section className={style.card}>
      <span
        className={style.category}
        style={{ backgroundColor: getCategoryColor(decision.DecisionCategory) }}
      >
        {decision.DecisionCategory}
      </span>

      <h2 className={style.title}>{decision.DecisionTitle}</h2>

      <article className={style.footer}>
        <img
          src={decision.ProfilePicture}
          alt={`${decision.UserName}'s profile`}
          className={style.profilePicture}
        />
        <p className={style.userInfo}>
          par{" "}
          <span className={style.userName}>
            {decision.UserName} {decision.UserFirstname}
          </span>
        </p>
      </article>
    </section>
  );
}
