import DatabaseClient from "../../../database/client";
import type { Rows } from "../../../database/client";

class CommentRepository {
  async readAll(decisionId: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      `SELECT 
      comment.content, 
      user.lastname, user.firstname, 
      decision.id 
      FROM comment 
      JOIN user on comment.user_id = user.id
      JOIN decision ON comment.decision_id = decision.id 
      WHERE decision.id=?`,
      [decisionId],
    );
    return rows;
  }
}

export default new CommentRepository();
