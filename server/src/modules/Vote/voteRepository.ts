import DatabaseClient from "../../../database/client";
import type { Result, Rows } from "../../../database/client";

export interface Vote {
  id: number;
  decision_id: number;
  user_id: number;
  state: boolean;
}
//CREATE vote
class VoteRepository {
  async create(vote: Omit<Vote, "id">) {
    const [result] = await DatabaseClient.query<Result>(
      " INSERT INTO vote (decision_id, state, user_id) VALUES (?,?,?)",
      [vote.decision_id, vote.state, vote.user_id],
    );
    // console.log("insertion reussie avec", result.insertId);
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
      [vote.decision_id, vote.state, vote.id],
    );
    return result.affectedRows;
  }
}

//pas DELETE vote X

export default new VoteRepository();
