import { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import style from "./decisionForm.module.css";
import "react-toastify/dist/ReactToastify.css";

function DecisionForm() {
  const [categories, setCategories] = useState(["Category1", "Category2"]);
  const [newCategory, setNewCategory] = useState("");

  /**
   * Funtion to add a new category to the array of existing categories, if the input field is not empty and if the category does not already exist.
   */
  const AddCategory = () => {
    if (!newCategory.trim()) {
      toast.warn("La catégorie ne peut pas être vide");
    } else if (categories.includes(newCategory)) {
      toast.error("Cette catégorie existe déjà");
    } else {
      setCategories([...categories, newCategory]);
      setNewCategory("");
      toast.success("Catégorie ajoutée avec succès");
    }
  };
  const place = [
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
  ];

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
}

export default DecisionForm;
