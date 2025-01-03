import type { Decision } from "../../types/definitions";
import { getCategoryColor } from "../../utils/categoryColors";
import styles from "./decisionCard.module.css";

export default function DecisionCard({ decision }: { decision: Decision }) {
  return (
    <div className={styles.card}>
      <span
        className={styles.category}
        style={{ backgroundColor: getCategoryColor(decision.DecisionCategory) }}
      >
        {decision.DecisionCategory}
      </span>

      <h2 className={styles.title}>{decision.DecisionTitle}</h2>

      <div className={styles.footer}>
        <img
          src={decision.ProfilePicture}
          alt={`${decision.UserName}'s profile`}
          className={styles.profilePicture}
        />
        <p className={styles.userInfo}>
          par{" "}
          <span className={styles.userName}>
            {decision.UserName} {decision.UserFirstname}
          </span>
        </p>
      </div>
    </div>
  );
}
