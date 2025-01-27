import express from "express";
import categoryAction from "../modules/item/Category/categoryAction";

const router = express.Router();

router.post("/api/category", categoryAction.add);

export default router;
