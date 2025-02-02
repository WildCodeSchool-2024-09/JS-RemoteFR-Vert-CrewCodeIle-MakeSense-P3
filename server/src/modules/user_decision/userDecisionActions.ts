// import type { RequestHandler } from "express";

// const addDecisionUser: RequestHandler = async (req, res, next) => {
//   try {
//     const userDecision = {
//       decision_id: Number.parseInt(req.body.decision_id),
//       user_id: Number.parseInt(req.body.user_animator_id),
//     };
//     const insertId = await userDecisionRepository.create(userDecision);
//     res.status(201).json({ id: insertId });
//   } catch (err) {
//     next(err);
//   }
// };

// export default {};
