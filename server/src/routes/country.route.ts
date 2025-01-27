import express from "express";
import countryActions from "../modules/country/countryAction";

const router = express.Router();

router.post(
  "/api/country",

  countryActions.browse,
  countryActions.read,
  countryActions.edit,
  countryActions.add,
  countryActions.destroy,
);

export default router;
