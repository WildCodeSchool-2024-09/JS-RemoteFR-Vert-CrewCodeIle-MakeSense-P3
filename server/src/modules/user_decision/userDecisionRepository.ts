import databaseClient from "../../../database/client";
import type { Result } from "../../../database/client";

type UserDecisionType = {
  user_id: number;
  decision_id: number;
  role: string;
};

class UserDecisonRepository {
  async create(userDecision: UserDecisionType) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO user_decision (decision_id, user_id, role) 
      VALUES (?, ?, ?)`,
      [userDecision.decision_id, userDecision.user_id, userDecision.role],
    );
    return [result];
  }
}
export default new UserDecisonRepository();
