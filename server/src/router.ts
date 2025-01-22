import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here

import AuthRoute from "./routes/auth.route";

router.use("/", AuthRoute);

/* ************************************************************************* */

export default router;
