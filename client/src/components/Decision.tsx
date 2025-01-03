import { useState } from "react";
import style from "./decision.module.css";
const decision = () => {
  // etat pour les catégory existantes :
  const [categories, setcategories] = useState(["Category1", "Category2"]);
  //etat pour la nouvelle category
  const [newCategory, setNewCategory] = useState("");

  // fonction pour ajouter une nouvelle catégorie
  const AddCategory = () => {
    if (!newCategory.trim()) {
      alert("La catégorie ne peut pas être vide");
      return;
    }
    if (categories.includes(newCategory)) {
      alert("Cette catégorie existe déjà");
      return;
    }
    //si la catégorie n'existe pas, on l'ajoute à la liste
    const pastTabCategories = [...categories]; //copie le tableau categories
    pastTabCategories.push(newCategory); // ajout de la nouvelle category au tableau copié
    setcategories(pastTabCategories); // mise à jour de la liste des categories
    setNewCategory(""); // vide le champ de saisie
  };

  // fonction pour afficher les décisions
  return (
    <section className={style.decisioncontainer}>
      <h1> Prise de decision </h1>
      <form>
        {/* section intitulé */}
        <article>
          <label htmlFor="intitule"> intitulé de la prise de decision </label>
          <input
            type="text"
            id="intitule"
            placeholder="saisissez le texte ici"
          />
        </article>
        <article>
          <label htmlFor="category"> saisisse zune category </label>
          <select id="category">
            <option value=""> choississez une category</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {" "}
                {category}{" "}
              </option>
            ))}
          </select>
        </article>
        {/* section pour ajouter une catégory */}
        <article>
          <label htmlFor="newCategory">
            {" "}
            saisisse une nouvelle categorie non existante{" "}
          </label>
          <input
            type="text"
            id="newCategory"
            value={newCategory}
            onChange={(event) => setNewCategory(event.target.value)}
          />
          <button type="button" onClick={AddCategory}>
            {" "}
            +{" "}
          </button>
        </article>
        {/* section description  */}
        <article>
          <label htmlFor="description">Description</label>
          <textarea
            id="description"
            placeholder="saisissez la description ici"
          />
        </article>
        {/* section planning */}
        <article>
          <h2>planning </h2>
          <label htmlFor="createDate">Creation Date</label>
          <input type="date" id="createDate" />

          <label htmlFor="finalDateVote">date de cloture des votes</label>
          <input type="date" id="finalDate" />

          <label htmlFor="finalDateDecionEnded">
            date de cloture de la decision
          </label>
          <input type="date" id="finalDateDecionEnded" />
        </article>
        {/* section listes  */}
        <article>
          <h2>listes</h2>
          <label htmlFor="impactedperson">
            {" "}
            qui sont les personnes impactées?
          </label>
          <input type="text" id="impactedperson" />

          <label htmlFor="animateurs"> Qui sont les animateurs ?</label>
          <input type="text" id="animateurs" />

          <label htmlFor="experts"> qui sont les experts ?</label>
          <input type="text" id="experts" />
        </article>
      </form>
    </section>
  );
};

export default decision;
