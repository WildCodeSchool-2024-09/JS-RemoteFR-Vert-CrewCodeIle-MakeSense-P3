import express from "express";

import categoryAction from "../modules/item/Category/categoryAction";
const router = express.Router();

router.post("/api/category", categoryAction.add);
router.get("/api/category", categoryAction.browse, categoryAction.read);
router.put("/api/category", categoryAction.edit);
router.delete("/api/category", categoryAction.destroy);
//pour le browse router.get ...faire edit
export default router;
