import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

class DecisionRepository {
  // async create(decision) {
  //   const [result] = await databaseClient.query<Result>(
  //     "INSERT INTO decision (min_date, max_date, description, context, profit, risk, step, user_id, category_id, comment_id, country_id) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?,? )",
  //     [
  //       decision.min_date,
  //       decision.max_date,
  //       decision.description,
  //       decision.content,
  //       decision.profit,
  //       decision.risk,
  //       decision.step,
  //       decision.user_id,
  //       decision.category_id,
  //     ],
  //   );
  //   return [result];
  // }

  async read(decisionId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
      decision.title, decision.min_date, decision.max_date, decision.description, decision.context, decision.profit, decision.risk, decision.step,
      country.label, 
      category.label,
      user.lastname, user.firstname
      FROM decision 
      INNER JOIN country ON country.id = decision.country_id 
      INNER JOIN category ON category.decision_id = decision.id
      INNER JOIN user ON user.id = decision.user_id 
      WHERE decision.id=1`,
      [decisionId],
    );
    return rows[0];
  }
}

export default new DecisionRepository();
