import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class DecisionRepository {
  async read(decisionId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
      decision.title, decision.min_date, decision.max_date, decision.description, decision.context, decision.profit, decision.risk, decision.step,
      country.label AS country, 
      user.lastname, user.firstname
      FROM decision 
      INNER JOIN country ON country.id = decision.country_id 
      INNER JOIN user ON user.id = decision.user_id 
      WHERE decision.id=?`,
      [decisionId],
    );
    return rows[0];
  }
  // action read country
  async readCountryAndDates(decisionId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT decision.country_id AS country_id, decision.min_date AS min_date, decision.created_at AS created_at FROM decision
      WHERE decision.id=?`,
      [decisionId],
    );
    return rows[0];
  }
}

export default new DecisionRepository();
