import DatabaseClient from "../../../database/client";
import type { Result } from "../../../database/client";

class CommentRepository {
  // async create(comment) {
  //   const [result] = await DatabaseClient.query<Result>(
  //     "INSERT INTO comment(content, user_id, decision_id) VALUES (?,1,1)",
  //     [comment.content],
  //   );
  //   return result.insertId;
  // }
}

export default new CommentRepository();
