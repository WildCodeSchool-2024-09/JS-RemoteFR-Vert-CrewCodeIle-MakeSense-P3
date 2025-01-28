import express from "express";
import countryActions from "../modules/country/countryActions";

const router = express.Router();

router.get("/api/country", countryActions.browse);

router.get("/api/country/:id", countryActions.read);

router.put("/api/country/:id", countryActions.edit);

router.post("/api/country", countryActions.add);

router.delete("/api/country/:id", countryActions.destroy);

export default router;
