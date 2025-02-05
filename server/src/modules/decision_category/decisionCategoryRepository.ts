import databaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class DecisionCategoryRepository {
  async readAllcategory(decisionId: number) {
    const [rows] = await databaseClient.query<Rows>(
      `SELECT decision_category.decision_id, decision_category.category_id, category.label, category.color 
      FROM decision_category 
      INNER JOIN category ON decision_category.category_id=category.id
      WHERE decision_category.decision_id=?
      `,
      [decisionId],
    );
    return rows;
  }
}

export default new DecisionCategoryRepository();
