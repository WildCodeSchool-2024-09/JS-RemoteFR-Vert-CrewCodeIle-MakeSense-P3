import style from "./decisionForm.module.css";
import "react-toastify/dist/ReactToastify.css";
// import { useEffect } from "react"; // Pour effectuer le fetch au montage du composant
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import AddCategoryForm from "./Add";

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
  //BEUG GRISÉ
  // const newcategories = watch("newcategories");
  // const fetchCategories = async () => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/category`,
  //     ); // Récupère les catégories avec un GET
  //     if (response.ok) {
  //       const data = await response.json();
  //       // console.log("categories recupérées :", data);
  //       setValue(
  //         "categories",
  //         data.map((category: { label: string }) => category.label),
  //       ); // Met à jour les catégories
  //     } else {
  //       toast.error("Erreur lors du chargement des catégories");
  //     }
  //   } catch (error) {
  //     toast.error("Erreur de connexion au serveur");
  //   }
  // };

  // // Appelle `fetchCategories` au montage du composant
  // useEffect(() => {
  //   fetchCategories();
  // }, []);

  /**
   * 🔹 Fonction appelée après l'ajout d'une nouvelle catégorie par `AddCategoryForm`
   */
  const handleCategoryAdded = (newCategory: string) => {
    // console.log("nouvelle catégorie ajoutée", newCategory);
    setValue("categories", [...categories, newCategory]); // Met à jour la liste localement
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
        {/* 🔹 Ajout du formulaire d'ajout de catégorie */}
        <AddCategoryForm onCategoryAdded={handleCategoryAdded} />

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
