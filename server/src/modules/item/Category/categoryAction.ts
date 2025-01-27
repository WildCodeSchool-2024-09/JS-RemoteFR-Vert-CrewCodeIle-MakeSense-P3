import type { RequestHandler } from "express";

import categoryRepository from "./categoryRepository";

const add: RequestHandler = async (req, res, next): Promise<void> => {
  //asynchrone fonction donc ne pas oublier les await.
  try {
    //je crée une nouvelle category
    const newCategory = {
      label: req.body.label, //champs rempli par l'utilisateur dans le formulaire
    };
    const categoryExist =
      await categoryRepository.findIfCategoryLabelAlreadyExist(
        newCategory.label,
      );
    // je passe à la méthode find le champ label de l'object newcatgory car find attend un type string.

    if (categoryExist) {
      res.status(400).json({ message: "Cette catégorie existe déjà" });
    } else {
      const newCategory = {
        label: req.body.label, //champs rempli par l'utilisateur dans le formulaire
      };
      const insertId = await categoryRepository.create(newCategory); //ici j'insere un object complet newcategory dans la bdd
      //j'affecte un ID à la category saisie par l'utilisateur (avec insertid)
      // dans le formulaire coté client je récupère le champs saisi par l'utilisateur, je degage l'id si il est déjà présent dansla base de donnée
      //et je remplace l'id par un nouveau pour pas avoir plusieurs fois le mm id en bdd.
      //+ on verouille la saisi de l'utilisateur category.label qu'on insert dans la table avec le nouvel id

      res.status(201).json({ id: insertId });
    }
  } catch (err) {
    //on vient attraper l'erreur grâce au catch, et on log ( met un marqueur
    //sur l'erreur grâce a log error de l'app.ts )
    next(err);
  }
};

export default {
  add,
};
