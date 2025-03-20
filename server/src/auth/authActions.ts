import type { RequestHandler } from "express";

import argon2 from "argon2";
import jwt from "jsonwebtoken";
import type { JwtPayload } from "jsonwebtoken";
// Import access to data
import userRepository from "../modules/user/userRepository";

const login: RequestHandler = async (req, res, next) => {
  //JWT
  console.info(req.body);
  try {
    //getUserbyemail
    // Fetch a specific user from the database based on the provided email
    const credentials = await userRepository.readByEmailWithPassword(
      req.body.email,
    );

    if (credentials == null) {
      res.sendStatus(422);
      return;
    }
    //comparaison des mdp :
    const verified = await argon2.verify(
      credentials.hashed_password, //mdp db
      req.body.password, //front dans le champs
    );
    //comparepasseword
    if (verified) {
      //verified retoune un booleen si true alors on stocke hash pass et userwithouthashedpasseword dans credentials
      // Respond with the user in JSON format (but without the hashed password)
      const { hashed_password, ...userWithoutHashedPassword } = credentials;
      //separe hash passeword du reste (...)
      const myPayload: MyPayload = {
        sub: credentials.id.toString(),
      };
      const token = await jwt.sign(
        myPayload,
        process.env.APP_SECRET as string,
        {
          expiresIn: "1h",
        },
      );
      //REPONSE PRODUITE--> jeton jwt
      // je crée un object auth comme côté client, contenant token et credentials.
      const auth = {
        token,
        credentials: userWithoutHashedPassword,
      };
      res.json(auth); //repond que l'email sans hash passeword
    } else {
      res.sendStatus(422);
    }
  } catch (err) {
    // Pass any errors to the error-handling middleware
    next(err);
  }
};

// Options de hachage (voir documentation : https://github.com/ranisalt/node-argon2/wiki/Options)
// Recommandations **minimales** de l'OWASP : https://cheatsheetseries.owasp.org/cheatsheets/Password_Storage_Cheat_Sheet.html
const hashingOptions = {
  type: argon2.argon2id,
  memoryCost: 19 * 2 ** 10 /* 19 Mio en kio (19 * 1024 kio) */,
  timeCost: 2,
  parallelism: 1,
};

const hashPassword: RequestHandler = async (req, res, next) => {
  try {
    // Extraction du mot de passe de la requête
    const { password } = req.body;

    // Hachage du mot de passe avec les options spécifiées
    const hashedPassword = await argon2.hash(password, hashingOptions);

    // Remplacement du mot de passe non haché par le mot de passe haché dans la requête
    req.body.hashed_password = hashedPassword;

    // Oubli du mot de passe non haché de la requête : il restera un secret même pour notre code dans les autres actions
    req.body.password = undefined;

    next();
  } catch (err) {
    next(err);
  }
};
//Le middleware verifyToken est responsable de la vérification de l’authenticité et de la validité du jeton d’authentification.
const verifyToken: RequestHandler = (req, res, next) => {
  try {
    // Vérifier la présence de l'en-tête "Authorization" dans la requête
    const authorizationHeader = req.get("Authorization"); //recupère le header avec get et cherche celui s'appelant autorization

    if (authorizationHeader == null) {
      //si auucn authorization on s'arrete
      throw new Error("Authorization header is missing");
    }

    // Vérifier que l'en-tête a la forme "Bearer <token>"
    const [type, token] = authorizationHeader.split(" "); //split pour separer les mots bearer= porteur contient et token apres le dollar
    //split construit un tableau avec en ligne 1: baerer puis 2 le token

    if (type !== "Bearer") {
      //si c'est bon on regarde le token
      throw new Error("Authorization header has not the 'Bearer' type");
    }

    // Vérifier la validité du token (son authenticité et sa date d'expériation)
    // En cas de succès, le payload est extrait et décodé
    req.auth = jwt.verify(token, process.env.APP_SECRET as string) as MyPayload; //si token valide je recupère le payload : soit id du user
    //
    next();
  } catch (err) {
    console.error(err);
    res.sendStatus(401);
  }
};

export default { login, hashPassword, verifyToken };
