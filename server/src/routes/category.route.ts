import express from "express";
import categoryActions from "../modules/category/categoryActions";

const router = express.Router();

router.post(
  "/api/category",
  categoryActions.categoryExist,
  categoryActions.add,
);

router.get("/api/category", categoryActions.browse);

router.get("/api/category/:id", categoryActions.read);

router.put("/api/category/:id", categoryActions.edit);

router.delete("/api/category/:id", categoryActions.destroy);

export default router;
