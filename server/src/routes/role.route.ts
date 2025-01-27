import express from "express";
import roleActions from "../modules/role/roleAction";

const router = express.Router();

router.get("/api/role", roleActions.browse);

router.get("/api/role/:id", roleActions.read);

router.post("/api/role", roleActions.add);

router.delete("/api/role/:id", roleActions.destroy);

export default router;
