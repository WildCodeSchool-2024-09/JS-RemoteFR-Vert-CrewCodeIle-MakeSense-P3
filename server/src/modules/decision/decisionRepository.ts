import databaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Decision = {
  title: string;
  // category: string;
  country_id: number;
  description: string;
  max_date: Date;
  min_date: Date;
  context: string;
  profit: string;
  risk: string;
  category_id: number;
  user_id: number; //ajout de category id
};
//CREATE role
class DecisionRepository {
  async create(decision: Omit<Decision, "id">) {
    const [result] = await databaseClient.query<Result>(
      "INSERT INTO decision (title, description, max_date, min_date, context, profit, risk, user_id, country_id, category_id) VALUES (?,?,?,?,?,?,?,?,?,?)",
      [
        decision.title,
        decision.description,
        decision.max_date,
        decision.min_date,
        decision.context,
        decision.profit,
        decision.risk,
        decision.user_id,
        decision.country_id,
        decision.category_id,
      ],
    );
    return result.insertId;
  }

  async read(decisionId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT 
      decision.title, decision.min_date, decision.max_date, decision.description, decision.context, decision.profit, decision.risk,
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
  async readAll() {
    const [rows] = await databaseClient.query<Rows>(
      "SELECT decision.id, decision.title, decision.min_date, decision.max_date, decision.description, decision.context, decision.profit, decision.risk, country.label AS country, user.firstname, user.lastname, user.avatar FROM decision INNER JOIN country ON decision.country_id = country.id INNER JOIN user ON decision.user_id = user.id",
    );
    return rows;
  }
}

export default new DecisionRepository();
