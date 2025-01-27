import express from "express";

const router = express.Router();

/* ************************************************************************* */
// Define Your API Routes Here

import UserRoute from "./routes/user.route";

router.use("/", UserRoute);

import countryActions from "./modules/country/countryAction";

router.get("/api/country", countryActions.browse);
router.get("/api/country/:id", countryActions.read);
router.put("/api/country/:id", countryActions.edit);
router.post("/api/country", countryActions.add);
router.delete("/api/country/:id", countryActions.destroy);

import roleActions from "./modules/role/roleAction";

router.get("/api/role", roleActions.browse);
router.get("/api/role/:id", roleActions.read);
router.post("/api/role", roleActions.add);
router.delete("/api/role/:id", roleActions.destroy);

/* ************************************************************************* */

export default router;
