import express from "express";
import userActions from "./modules/user/userActions";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here

router.get("/api/users", userActions.browse);
// router.post("api/users", userActions.add);

/* ************************************************************************* */

export default router;
