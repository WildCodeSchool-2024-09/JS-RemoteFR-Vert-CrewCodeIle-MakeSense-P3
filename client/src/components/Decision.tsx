import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import style from "./decision.module.css";
import "react-toastify/dist/ReactToastify.css";

const decision = () => {
  /** état initialisant les catégories existantes:*/
  const [categories, setcategories] = useState(["Category1", "Category2"]);
  //état pour ajouter une catégorie personnalisée supplémentaire aux catégories déjà existantes:
  const [newCategory, setNewCategory] = useState("");

  // fonction pour ajouter une nouvelle catégorie:
  const AddCategory = () => {
    if (!newCategory.trim()) {
      toast.warn("La catégorie ne peut pas être vide");
    } else if (categories.includes(newCategory)) {
      toast.error("Cette catégorie existe déjà");
    } else {
      //si la catégorie n'existe pas, on l'ajoute à la liste
      const pastTabCategories = [...categories]; //copie le tableau categories
      pastTabCategories.push(newCategory); // ajout de la nouvelle categorie au tableau copié
      setcategories(pastTabCategories); // mise à jour de la liste des categories
      setNewCategory(""); // vide le champ de saisie après l'ajout de la nouvelle catégorie
      toast.success("Catégorie ajoutée avec succès");
    }
  };
  const [place, setplace] = useState([
    "France",
    "Mexique",
    "Canada",
    "Pérou",
    "Sénégal",
    "Philippines",
    "Liban",
    "Cote d'Ivoire",
    "Australie",
    "Ukraine",
  ]);
  const [newPlace, setNewPlace] = useState("");
  const AddPlace = () => {
    if (!newPlace.trim()) {
      toast.warn("L'endroit ne peut pas être vide");
    } else if (newPlace.includes(newPlace)) {
      toast.error("Cet endroit existe déjà");
    } else {
      //si l'endroit n'existe pas, on l'ajoute à la liste
      const pastTabPlace = [...place]; //copie le tableau place
      pastTabPlace.push(newPlace); // ajout de l'endroit au tableau copié
      setplace(pastTabPlace); // mise à jour de la liste des endroits
      setNewPlace(""); // vide le champ de saisie après l'ajout de l'endroit
      toast.success("L'endroit ajouté avec succès");
    }
  };
  return (
    <section className={style.decisioncontainer}>
      <section className={style.logo_exit}>
        <img id="logo" src="/intrasenselogo.png" alt="logo" />

        <button type="button" className={style.exitButton}>
          {" "}
          ✖{" "}
        </button>
      </section>

      <h2> Prise de décision: </h2>

      <form>
        {/* section intitulé */}
        <section>
          <label htmlFor="intitule"> Intitulé de la prise de décision: </label>
          <input
            type="text"
            id="intitule"
            placeholder="saisissez le texte ici"
          />
        </section>

        {/* liste déroulante des catégories */}
        <section>
          <label htmlFor="category"> Saisissez une catégorie: </label>
          <select id="category">
            <option value=""> Choississez une catégorie </option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {" "}
                {category}{" "}
              </option>
            ))}
          </select>
        </section>

        {/* section pour ajouter une catégorie */}
        <section className={style.addCategory}>
          <label htmlFor="newCategory"> Ajoutez une nouvelle catégorie: </label>
          <article className={style.addCategoryContainer}>
            <input
              type="text"
              id="newCategory"
              value={newCategory}
              onChange={(event) => setNewCategory(event.target.value)}
            />
            <button
              type="button"
              onClick={AddCategory}
              className={style.addButton}
            >
              {" "}
              ➕{" "}
            </button>
          </article>
          <ToastContainer position="top-right" autoClose={3000} />
        </section>
        {/* section localisation : */}
        {/* liste déroulante des localisations */}
        <section>
          <label htmlFor="place"> Saisissez une localisation: </label>
          <select id="place">
            <option value=""> Choississez une localisation </option>
            {place.map((place) => (
              <option key={place} value={place}>
                {" "}
                {place}{" "}
              </option>
            ))}
          </select>
        </section>

        {/* section pour ajouter une catégorie */}
        <section className={style.addPlace}>
          <label htmlFor="newPlace"> Ajoutez une nouvelle localisation: </label>
          <article className={style.addPlaceContainer}>
            <input
              type="text"
              id="newPlace"
              value={newPlace}
              onChange={(event) => setNewPlace(event.target.value)}
            />
            <button
              type="button"
              onClick={AddPlace}
              className={style.addPlaceButton}
            >
              {" "}
              ➕{" "}
            </button>
          </article>
          <ToastContainer position="top-right" autoClose={3000} />
        </section>

        {/* section description  */}
        <section>
          <label htmlFor="description"> Description: </label>
          <textarea
            id="description"
            placeholder="saisissez la description ici"
          />
        </section>

        {/* section impact sur l'organisation  */}
        <section>
          <label htmlFor="impact"> Quel impact sur l'organisation ? </label>
          <textarea id="impact" placeholder="saisissez l'impact ici" />
        </section>

        {/* Bénéfices :  */}
        <section>
          <label htmlFor="benefits"> Quels sont les bénéfices? </label>
          <textarea id="benefits" placeholder="saisissez les bénéfices ici" />
        </section>

        {/* Risques */}
        <section>
          <label htmlFor="risks"> Quels sont les risques? </label>
          <textarea id="risks" placeholder="saisissez les risques ici" />
        </section>

        {/* section planning */}
        <section className={style.planningDates}>
          <legend>Planning: </legend>
          <article className={style.gridContainer}>
            <article>
              {/* label doit encadrer mon input ?  */}
              <label htmlFor="createDate"> Date de création </label>
              <input type="date" id="createDate" />
            </article>
            <article>
              <label htmlFor="finalDateVote"> Date de clôture des votes </label>
              <input type="date" id="finalDateVote" />
            </article>
            <article>
              <label htmlFor="finalDateDecionEnded">
                Date de clôture de la décision
              </label>
              <input type="date" id="finalDateDecionEnded" />
            </article>
          </article>
          <p className={style.remarqueNb}>
            NB: La période de prise de décision totale doit être comprise entre
            15 jours et 90 jours.
          </p>
        </section>

        {/* section liste  */}
        <section>
          <legend> Listes: </legend>
          <label htmlFor="impactedperson">
            {" "}
            Qui sont les personnes impactées ?{" "}
          </label>
          <input type="text" id="impactedperson" />

          <label htmlFor="animateurs"> Qui sont les animateurs ? </label>
          <input type="text" id="animateurs" />

          <label htmlFor="experts"> Qui sont les experts ? </label>
          <input type="text" id="experts" />
        </section>
        {/* section boutons  */}
        <section className={style.buttongroup}>
          <button type="button" className={style.canceldButton}>
            {" "}
            Annuler{" "}
          </button>
          <button type="button" className={style.addDecisionButton}>
            {" "}
            Ajouter une décision{" "}
          </button>
        </section>
      </form>
    </section>
  );
};

export default decision;
