import style from "./decisionForm.module.css";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { Bounce, ToastContainer, toast } from "react-toastify";

// const [categories, setCategories] = useState(["Category1", "Category2"]);
// const [newCategory, setNewCategory] = useState("");

/**
 * Funtion to add a new category to the array of existing categories, if the input field is not empty and if the category does not already exist.
 */

type dataDecision = {
  title: string;
  category: string;
  addcategory: string;
  place: string;
  creationdate: Date;
  datevote: Date;
  canceleddecisiondate: Date;
  description: string;
  consequences: string;
  benefice: string;
  risks: string;
  expert: string;
  animateurs: string;
  impactedperson: string;
  categories: string[];
  newcategories: string;
};

function CreateDecisionForm() {
  const {
    register,
    handleSubmit,
    // control,
    setValue,
    watch,
    reset,
    // formState: { errors },
  } = useForm<dataDecision>({
    defaultValues: {
      title: "",
      category: "",
      addcategory: "",
      place: "",
      creationdate: new Date(),
      datevote: new Date(),
      canceleddecisiondate: new Date(),
      description: "",
      consequences: "",
      benefice: "",
      risks: "",
      expert: "",
      animateurs: "",
      impactedperson: "",
      categories: ["Category1", "Category2"],
      newcategories: "",
    },
  });

  const categories = watch("categories");
  const newcategories = watch("newcategories");
  const AddCategory = () => {
    if (!newcategories.trim()) {
      toast.warn("La catégorie ne peut pas être vide");
    } else if (categories.includes(newcategories)) {
      toast.error("Cette catégorie existe déjà");
    } else {
      setValue("categories", [...categories, newcategories]);
      setValue("newcategories", ""); //????
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

      await response.json();

      reset();
      toast.success("Demande envoyée à l'administrateur", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
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
            id="intitule"
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
          <label htmlFor="place"> Saisissez une localisation: </label>
          <select
            id="place"
            {...register("place", { required: "choisissez une localisation" })}
          >
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
            {...register("description")}
          />
        </section>

        {/* section impact sur l'organisation  */}
        <section>
          <label htmlFor="impact"> Quel impact sur l'organisation ? </label>
          <textarea
            id="impact"
            placeholder="saisissez l'impact ici"
            {...register("consequences")}
          />
        </section>

        {/* Bénéfices :  */}
        <section>
          <label htmlFor="benefits"> Quels sont les bénéfices? </label>
          <textarea
            id="benefits"
            placeholder="saisissez les bénéfices ici"
            {...register("benefice")}
          />
        </section>

        {/* Risques */}
        <section>
          <label htmlFor="risks"> Quels sont les risques? </label>
          <textarea
            id="risks"
            placeholder="saisissez les risques ici"
            {...register("risks")}
          />
        </section>

        {/* section planning */}
        <section className={style.planningDates}>
          <legend>Planning: </legend>
          <article className={style.gridContainer}>
            <article>
              {/* label doit encadrer mon input ?  */}
              <label htmlFor="createDate"> Date de création </label>
              <input
                type="date"
                id="createDate"
                {...register("creationdate")}
              />
            </article>
            <article>
              <label htmlFor="finalDateVote"> Date de clôture des votes </label>
              <input type="date" id="finalDateVote" {...register("datevote")} />
            </article>
            <article>
              <label htmlFor="finalDateDecionEnded">
                Date de clôture de la décision
              </label>
              <input
                type="date"
                id="finalDateDecionEnded"
                {...register("canceleddecisiondate")}
              />
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
            {...register("impactedperson")}
          />

          <label htmlFor="animateurs"> Qui sont les animateurs ? </label>
          <input type="text" id="animateurs" {...register("animateurs")} />

          <label htmlFor="experts"> Qui sont les experts ? </label>
          <input type="text" id="experts" {...register("expert")} />
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
