import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Decision = {
  title: string;
  category: string;
  country: string;
  description: string;
  max_date: Date;
  min_date: Date;
  context: string;
  profit: string;
  risk: string;
  // category_id: number; //ajout de category id
};
//CREATE role
class DecisionRepository {
  async create(decision: Omit<Decision, "id">) {
    const [result] = await databaseClient.query<Result>(
      " INSERT INTO decision (title, category, country, description, max_date, min_date,context, profit, risk)  VALUES (?,?,?,?,?,?,?,?,?)",
      [
        decision.title,
        decision.category,
        decision.country,
        decision.description,
        decision.max_date,
        decision.min_date,
        decision.context,
        decision.profit,
        decision.risk,
      ],
    );
    return result.insertId;
  }

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
}

export default new DecisionRepository();
