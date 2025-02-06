import type { RequestHandler } from "express";
import roleRepository from "./roleRepository";

//BROWSE role
const browse: RequestHandler = async (req, res, next) => {
  try {
    const role = await roleRepository.readAll();
    res.json(role);
  } catch (err) {
    next(err);
  }
};

//READ role
const read: RequestHandler = async (req, res, next) => {
  try {
    const roleId = Number.parseInt(req.params.id);
    const role = await roleRepository.read(roleId);
    if (role == null) {
      res.sendStatus(404);
    } else {
      res.json(role);
    }
  } catch (err) {
    next(err);
  }
};

//pas EDIT role X

//ADD role
const add: RequestHandler = async (req, res, next) => {
  try {
    const newRole = {
      label: req.body.label,
    };
    const insertId = await roleRepository.create(newRole);
    res.status(201).json({ insertId });
  } catch (err) {
    next(err);
  }
};

//DESTROY role
const destroy: RequestHandler = async (req, res, next) => {
  try {
    const roleId = Number.parseInt(req.params.id);
    await roleRepository.delete(roleId);
    res.sendStatus(204);
  } catch (err) {
    next(err);
  }
};

export default { browse, read, add, destroy };
