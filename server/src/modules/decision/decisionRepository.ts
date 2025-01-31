import DatabaseClient from "../../../database/client";
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
//CREATE role
class DecisionRepository {
  async create(decision: Decision) {
    const [result] = await DatabaseClient.query<Result>(
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
