import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here

import UserRoute from "./routes/user.route";

router.use("/", UserRoute);

import CountryRoute from "./routes/country.route";

router.use("/", CountryRoute);

import RoleRoute from "./routes/role.route";

router.use("/", RoleRoute);

import VoteRoute from "./routes/vote.route";

router.use("/", VoteRoute);

/* ************************************************************************* */

export default router;
