import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class UserDecisionRepository {
  async readAllAnimators(decisionId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT user_decision.* , user.*, decision.id 
        FROM user_decision 
        JOIN user ON user_decision.user_id = user.id
        JOIN decision ON user_decision.decision_id = decision.id
        WHERE user_decision.role="animator" AND decision.id=?`,
      [decisionId],
    );
    return rows;
  }

  async readAllExperts(decisionId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT user_decision.* , user.*, decision.id 
        FROM user_decision 
        JOIN user ON user_decision.user_id = user.id
        JOIN decision ON user_decision.decision_id = decision.id
        WHERE role="expert" AND decision.id=?`,
      [decisionId],
    );
    return rows;
  }

  async readAllImpacted(decisionId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT user_decision.* , user.*, decision.id 
        FROM user_decision 
        JOIN user ON user_decision.user_id = user.id
        JOIN decision ON user_decision.decision_id = decision.id
        WHERE role="impacted" AND decision.id=?`,
      [decisionId],
    );
    return rows;
  }
}

export default new UserDecisionRepository();
