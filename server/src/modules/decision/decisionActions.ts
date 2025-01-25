// import type { RequestHandler } from "express";
// import decisionRepository from "./decisionRepository";

// const read: RequestHandler = async (req, res, next) => {
//   const {min_date, max_date, utility, content, profit, risk, step, user_id, category}= req.body;
//   const decisionId = Number.parseInt(req.params.id);
//   const decision = await decisionRepository.read(decisionId);
//   try {
//     if (decision == null) {
//       res.sendStatus(404);
//     } else {
//       res.json(decision);
//     }
//   } catch (err) {
//     next(err);
//   }
// };

// export default { read };
