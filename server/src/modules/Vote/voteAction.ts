import type { RequestHandler } from "express";
import decisionRepository from "../decision/decisionRepository";
import userRepository from "../user/userRepository";

import voteRepository from "../Vote/voteRepository";
import type Vote from "../Vote/voteRepository";
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
    const user_id = req.auth.sub;
    const vote = {
      id: Number.parseInt(req.params.id),
      decision_id: req.body.decision_id,
      state: req.body.state,
      user_id,
    };

    const affectedRows = await voteRepository.update(vote);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    console.error("erreur dans edit");
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

    if (!decisionData || !userData) {
      return false;
    }
    return decisionData.country_id === userData.country_id;
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
    // console.log(dataDate);
    if (!dataDate) {
      console.error(
        "Erreur lors de la récupération des données de la décision:",
      );
      return false;
    }

    const maxDate = Date.parse(dataDate.max_date);
    const minDate = Date.parse(dataDate.min_date);
    const currentDate = Date.now();
    // console.log(maxDate, minDate, currentDate);

    if (currentDate > minDate && currentDate < maxDate) {
      return true;
    }
    return false;
  } catch (err) {
    console.error("Erreur lors de la vérification des dates:", err);
    return false;
  }
};

// ADD vote
const add: RequestHandler = async (req, res, next) => {
  try {
    const { decision_id, state } = req.body;
    const user_id = req.auth.sub;

    const existingVote = await voteRepository.getUserVote(decision_id, user_id);

    if (existingVote) {
      const updatedVote = {
        id: existingVote.id,
        decision_id,
        state,
        user_id,
      };
      const affectedRows = await voteRepository.update(updatedVote);
      if (affectedRows === 0) {
        res.sendStatus(404);
      } else {
        res.status(200).json({
          id: existingVote.id,
          state: state,
          message: "Vote mis à jour avec succès !",
        });
      }
    } else {
      const canVote =
        (await verifyCountryMatch(decision_id, user_id)) &&
        (await verifyDate(decision_id));

      if (canVote) {
        const newVote = {
          decision_id,
          state,
          user_id,
        };
        const insertId = await voteRepository.create(newVote);
        res.status(201).json({ insertId });
      } else {
        res
          .status(403)
          .json({ message: "Vous ne pouvez pas voter pour cette décision" });
      }
    }
  } catch (err) {
    console.error("erreur dans add");
    next(err);
  }
};

const checkUserVote: RequestHandler = async (req, res, next) => {
  try {
    const user_id = req.auth.sub;
    const decisionId = Number.parseInt(req.params.id);

    const existingVote = await voteRepository.getUserVote(user_id, decisionId);
    if (existingVote != null) {
      res.json(existingVote);
    } else {
      res.sendStatus(404);
    }

    // }
  } catch (err) {
    next(err);
  }
};

//pas DESTROY vote X

export default { browse, read, edit, checkUserVote, add };
