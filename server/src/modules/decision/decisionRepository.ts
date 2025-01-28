
import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

type Decision = {
  
  title: string;
  category: string
  country: string;
  created_at: Date;
  description: string;
  max_date: Date;
  min_date: Date;
  context: string;
  profit: string;
  risk: string;
};
//CREATE role
class   DecisionRepository {
  async create(decision: Omit<Decision, "id">) {
    const [result] = await DatabaseClient.query<Result>(
      " INSERT INTO decision (title, category, country, created_at, description, max_date, min_date,context, profit, risk)  VALUES (?,?,?,?,?,?,?,?,?,?)",
      [decision.title, decision.category, decision.country, decision.created_at, decision.description, decision.max_date, decision.min_date, decision.context, decision.profit, decision.risk]
    );
    return result.insertId;
  }
}

export default new DecisionRepository();
