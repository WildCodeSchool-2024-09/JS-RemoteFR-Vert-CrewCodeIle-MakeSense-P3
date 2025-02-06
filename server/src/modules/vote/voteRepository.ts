import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

//CREATE vote
class VoteRepository {
  async create(vote: Omit<Vote, "id">) {
    const [result] = await DatabaseClient.query<Result>(
      " INSERT INTO vote (comment, state, user_id) VALUES (?,?,?)",
      [vote.comment, vote.state, vote.user_id],
    );
    return result.insertId;
  }

  //READ & READ ALL vote
  async read(id: number) {
    const [rows] = await DatabaseClient.query<Rows>(
      "SELECT vote.comment, vote.state, user.firstname, user.lastname FROM vote JOIN user ON user.id=vote.user_id WHERE vote.id = ?",
      [id],
    );
    return rows[0] as Vote;
  }

  async readAll() {
    const [rows] = await DatabaseClient.query<Rows>("SELECT * FROM vote");
    return rows as Vote[];
  }

  //UPDATE vote
  async update(vote: Vote) {
    const [result] = await DatabaseClient.query<Result>(
      "UPDATE vote SET comment = ?, state = ? WHERE id = ?",
      [vote.comment, vote.state, vote.id],
    );
    return result.affectedRows;
  }
}

//pas DELETE vote X

export default new VoteRepository();
