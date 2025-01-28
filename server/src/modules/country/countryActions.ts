import type { RequestHandler } from "express";
import countryRepository from "./countryRepository";

//BROWSE country
const browse: RequestHandler = async (req, res, next) => {
  try {
    const country = await countryRepository.readAll();
    res.json(country);
  } catch (err) {
    next(err);
  }
};

//READ country
const read: RequestHandler = async (req, res, next) => {
  try {
    const countryId = Number.parseInt(req.params.id);
    const country = await countryRepository.read(countryId);
    if (country == null) {
      res.sendStatus(404);
    } else {
      res.json(country);
    }
  } catch (err) {
    next(err);
  }
};

//EDIT country
const edit: RequestHandler = async (req, res, next) => {
  try {
    const country = {
      id: Number.parseInt(req.params.id),
      label: req.body.label,
    };
    const affectedRows = await countryRepository.update(country);
    if (affectedRows === 0) {
      res.sendStatus(404);
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};

//ADD country
const add: RequestHandler = async (req, res, next) => {
  try {
    const newCountry = {
      label: req.body.label,
    };
    const insertId = await countryRepository.create(newCountry);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

//DESTROY country
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const countryId = Number.parseInt(req.params.id);
    await countryRepository.delete(countryId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, edit, add, destroy };
