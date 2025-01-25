// import databaseClient from "../../../database/client";
// import type { Result, Rows } from "../../../database/client";

// class DecisionRepository {
//     async create(decision) {
//       const [result] = await databaseClient.query<Result>(
//         "INSERT INTO decision (min_date, max_date, description, context, profit, risk, step, user_id, category_id, comment_id, country_id) VALUES (?,?, ?, ?, ?, ?, ?, ?, ?, ?,? )",
//         [
//           decision.min_date,
//           decision.max_date,
//           decision.description,
//           decision.content,
//           decision.profit,
//           decision.risk,
//           decision.step,
//           decision.user_id,
//           decision.category_id,
//         ],
//       );
//       return [result];
//     }

//   async read(decisionId: number) {
//     const [rows] = await databaseClient.query<Rows>(
//       "SELECT decision.*, country.label FROM",
//     );
//   }
// }

// export default new DecisionRepository();
