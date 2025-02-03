import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here
import CountryRoute from "./routes/country.route";
import DecisionRoute from "./routes/decision.route";
import UserRoute from "./routes/user.route";

router.use("/", CountryRoute);
router.use("/", DecisionRoute);
router.use("/", UserRoute);

/* ************************************************************************* */

export default router;
