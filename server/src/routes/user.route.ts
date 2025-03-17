import express from "express";
import userActions from "../modules/user/userActions";
import authActions from "../auth/authActions";
const router = express.Router();
//register
router.post(
  "/api/user",
  //passeword recu en clair avec le formulaire envoyé de l'utilisateur
  userActions.validateData, //recoit requete entre les deux on doit hacher le passord
  authActions.hashPassword, // haché ici
  userActions.checkEmail,
  userActions.add, //paseword haché sur
);
router.get("/api/user", userActions.read); // pour lire la country de user
//login
//comparer les emails mdp
//router.post("/api/auth", getUserByEmail, comparePassword, login);
router.post("/api/login", authActions.login);
//se connecte
export default router;
