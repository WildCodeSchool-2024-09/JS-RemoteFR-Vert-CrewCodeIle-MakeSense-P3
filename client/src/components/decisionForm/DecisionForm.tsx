import style from "./decisionForm.module.css";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
// import AddCategoryForm from "./addCategoryForm";

type dataDecision = {
  title: string;
  category: string;
  // addcategory: string;
  country: string;
  min_date: Date;
  max_date: Date;
  description: string;
  context: string;
  profit: string;
  risk: string;
  expert: string;
  animateurs: string;
  impactedperson: string;
  categories: string[];
  newcategories: string;
};

function CreateDecisionForm() {
  const { register, handleSubmit, setValue, watch, reset } =
    useForm<dataDecision>({
      defaultValues: {
        title: "",
        category: "",
        country: "",
        min_date: new Date(),
        max_date: new Date(),
        description: "",
        context: "",
        profit: "",
        risk: "",
        expert: "",
        animateurs: "",
        impactedperson: "",
        categories: ["Category1", "Category2"],
        newcategories: "",
      },
    });

  const categories = watch("categories");
  const newcategories = watch("newcategories");
  /**
   * Funtion to add a new category to the array of existing categories, if the input field is not empty and if the category does not already exist.
   */
  const AddCategory = () => {
    if (!newcategories.trim()) {
      toast.warn("La catégorie ne peut pas être vide");
    } else if (categories.includes(newcategories)) {
      toast.error("Cette catégorie existe déjà");
    } else {
      setValue("categories", [...categories, newcategories]);
      setValue("newcategories", "");
      toast.success("Catégorie ajoutée avec succès");
    }
  };

  const country = [
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
  
  // console.log(fetchCategories);

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/decision`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        },
      );

      // console.log(data);
      if (response.ok) {
        await response.json();
        // console.log(result);
        reset();
        toast.success("Demande envoyée à l'administrateur");
      } else {
        toast.error("Erreur lors de l'envoi de la demande");
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi de la connexion au serveur");
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
      <form onSubmit={handleSubmit(onSubmit)} className="formcontainer">
        <section>
          <label htmlFor="intitule"> Intitulé de la prise de décision: </label>
          <input
            type="text"
            id="title"
            placeholder="saisissez le texte ici"
            {...register("title")}
          />
        </section>

        {/* liste déroulante des catégories */}
        <section>
          <label htmlFor="category"> Saisissez une catégorie: </label>
          <select
            id="category"
            {...register("category", {
              required: "selectionnez une categorie",
            })}
          >
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
              placeholder="nouvelle catégorie"
              {...register("newcategories")}
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
          <label htmlFor="country"> Saisissez une localisation: </label>
          <select
            id="country"
            {...register("country", {
              required: "choisissez une localisation",
            })}
          >
            <option value=""> Choississez une localisation </option>
            {country.map((country) => (
              <option key={country} value={country}>
                {" "}
                {country}{" "}
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
            {...register("description")}
          />
        </section>

        {/* section context sur l'organisation  */}
        <section>
          <label htmlFor="context"> Quel impact sur l'organisation ? </label>
          <textarea
            id="context"
            placeholder="saisissez l'impact ici"
            {...register("context")}
          />
        </section>

        {/* Bénéfices :  */}
        <section>
          <label htmlFor="profit"> Quels sont les bénéfices? </label>
          <textarea
            id="profit"
            placeholder="saisissez les bénéfices ici"
            {...register("profit")}
          />
        </section>

        {/* Risques */}
        <section>
          <label htmlFor="risk"> Quels sont les risques? </label>
          <textarea
            id="risk"
            placeholder="saisissez les risques ici"
            {...register("risk")}
          />
        </section>

        {/* section planning */}
        <section className={style.planningDates}>
          <legend>Planning: </legend>
          <article className={style.gridContainer}>
            {/* <article>
              {/* label doit encadrer mon input ?  */}
            {/* <label htmlFor="created_at"> Date de création </label>
              <input
                type="date"
                id="created_at"
                {...register("created_at")}
              /> */}
            {/* </article> */}
            <article>
              <label htmlFor="min_date"> Date de clôture des votes </label>
              <input type="date" id="min_date" {...register("min_date")} />
            </article>
            <article>
              <label htmlFor="max_date">Date de clôture de la décision</label>
              <input type="date" id="max_date" {...register("max_date")} />
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
          <input
            type="text"
            id="impactedperson"
            // {...register("impactedperson")}
          />

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
          <button type="submit" className={style.addDecisionButton}>
            {" "}
            Ajouter une décision{" "}
          </button>
        </section>
      </form>
    </section>
  );
}

export default CreateDecisionForm;
