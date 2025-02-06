import type { RequestHandler } from "express";
import voteRepository from "./voteRepository";

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
      comment: req.body.comment,
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

//ADD vote
const add: RequestHandler = async (req, res, next) => {
  try {
    const newVote = {
      comment: req.body.comment,
      state: req.body.state,
      user_id: req.body.user_id,
    };
    const insertId = await voteRepository.create(newVote);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

//pas DESTROY vote X

export default { browse, read, edit, add };
