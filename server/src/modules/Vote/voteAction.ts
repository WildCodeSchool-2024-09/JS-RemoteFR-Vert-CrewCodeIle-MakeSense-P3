import type { RequestHandler } from "express";
import decisionRepository from "../decision/decisionRepository";
import userRepository from "../user/userRepository";

import voteRepository from "../Vote/voteRepository";

//BROWSE vote
const browse: RequestHandler = async (req, res, next) => {
  try {
    const vote = await voteRepository.readAll();
    res.json(vote);
  } catch (err) {
    next(err);
  }
};

//READ vote
const read: RequestHandler = async (req, res, next) => {
  try {
    const voteId = Number.parseInt(req.params.id);
    const vote = await voteRepository.read(voteId);
    if (vote == null) {
      res.sendStatus(404);
    } else {
      res.json(vote);
    }
  } catch (err) {
    next(err);
  }
};

//EDIT vote
const edit: RequestHandler = async (req, res, next) => {
  try {
    const vote = {
      id: Number.parseInt(req.params.id),
      decision_id: req.body.decision_id,
      state: req.body.state,
      user_id: req.body.user_id,
    };
    const affectedRows = await voteRepository.update(vote);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};
//verifie que les country id de deicison et user sont les memes avant d'ajouter la desicion,
//action utilisée dans le add.
const verifyCountryMatch = async (decisionId: number, userId: number) => {
  try {
    const decisionData =
      await decisionRepository.readCountryAndDates(decisionId);
    const userData = await userRepository.read(userId);
    // console.log("Decision country_id:", decisionData.country_id);
    // console.log("User country_id:", userData.country_id);
    if (!decisionData || !userData) {
      //verifie si les données existent
      return false;
    }
    return decisionData.country_id === userData.country_id; //return directement true or false à la comparaison des country
  } catch (err) {
    console.error(
      "Erreur lors de la vérification de la correspondance des pays:",
      err,
    );
    return false;
  }
};

const verifyDate = async (decisionId: number) => {
  try {
    const dataDate = await decisionRepository.readCountryAndDates(decisionId);

    if (!dataDate) {
      console.error(
        "Erreur lors de la récupération des données de la décision:",
      );
      return false; //renvoit directement false en cas d'erreur de récupération des données
    }

    const createdDate = Date.parse(dataDate.created_at);
    const minDate = Date.parse(dataDate.min_date);
    const currentDate = Date.now();
    // return Date.parse(createdDate) <=  Date.now() <=  Date.parse(minDate); //nb en milisecondes comparés --> renvoit direct true or false
    // si maxdate > dated'aujourdh ui --> true --> on peut voter

    // verification du format number des dates
    //createdat<currentdate<mindate
    //comparaison des dates:
    if (currentDate > minDate) {
      // console.log(" date de vote depassée")
      return false;
    }
    return true;
  } catch (err) {
    console.error("Erreur lors de la vérification des dates:", err);
    return false; //renvoit directement false en cas d'erreur de conversion de la date ou de récupération des données
  }
};

//ADD vote AJOUTER LA CONDITION POUR VERIFIER LES COUNTRY
//8888888888888SOUCIS DE TYPAGE
const add: RequestHandler = async (req, res, next) => {
  try {
    const { decision_id, user_id, state } = req.body;
    // console.log(req.body);

    const canVote =
      (await verifyCountryMatch(decision_id, user_id)) &&
      (await verifyDate(decision_id));

    if (canVote) {
      const newVote = {
        decision_id: req.body.decision_id,
        state: req.body.state,
        user_id: req.body.user_id,
      };
      // console.log("données recues pour l'insertion", newVote);
      const insertId = await voteRepository.create(newVote);
      res.status(201).json({ insertId });
    } else {
      res
        .status(403)
        .json({ message: "vous ne pouvez pas voter pour cette decision" });
      // return; //pour sortir de la fonction
    }
  } catch (err) {
    next(err);
  }
};

//pas DESTROY vote X

export default { browse, read, edit, add };
