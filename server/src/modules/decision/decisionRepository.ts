import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Decision = {
  title: string;
  country_id: number;
  description: string;
  // max_date: Date;
  // min_date: Date;
  context: string;
  profit: string;
  risk: string;
};

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

  async create(decision: Decision) {
    const [result] = await databaseClient.query<Result>(
      `INSERT INTO decision (title, description, max_date, min_date, context, profit, risk, step, country_id, user_id)  
      VALUES (?,?,"25-05-02","25-02-02",?,?,?,"begin",?,1)`,
      [
        decision.title,
        decision.description,
        decision.context,
        decision.profit,
        decision.risk,
        decision.country_id,
      ],
    );
    return result.insertId;
  }
}

export default new DecisionRepository();
