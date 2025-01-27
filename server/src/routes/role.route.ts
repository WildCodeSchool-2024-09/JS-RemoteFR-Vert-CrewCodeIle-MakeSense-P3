import express from "express";
import roleActions from "../modules/role/roleAction";

const router = express.Router();

router.post(
  "/api/role",

  roleActions.browse,
  roleActions.read,
  roleActions.add,
  roleActions.destroy,
);

export default router;
