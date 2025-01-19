import express from "express";
import userActions from "./modules/user/userActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here

import UserRoute from "./routes/user.route";

router.use("/", UserRoute);

/* ************************************************************************* */

export default router;
