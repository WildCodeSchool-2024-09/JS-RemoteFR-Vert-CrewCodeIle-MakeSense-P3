// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import { toast } from "react-toastify";
// import AddCategoryForm from "../addCategoryForm/AddCategoryForm";
import style from "./decisionForm.module.css";

// type dataDecision = {
//   title: string;
//   category: string;
//   country: string;
//   description: string;
//   context: string;
//   profit: string;
//   risk: string;
// };

function CreateDecisionForm() {
  // const { register, handleSubmit, setValue, reset } = useForm<dataDecision>();
  // const [categories, setCategories] = useState<string[]>([]);
  // const [countries, setCountries] = useState<string[]>([]);

  // const fetchCategories = async () => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/category`,
  //     );
  //     if (response.ok) {
  //       const data = await response.json();

  //       setCategories(data);
  //     } else {
  //       toast.error("Erreur lors du chargement des catégories");
  //     }
  //   } catch (error) {
  //     toast.error("Erreur de connexion au serveur");
  //   }
  // };

  // const fetchCountries = async () => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/country`,
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //     } else {
  //       toast.error("Erreur lors du chargement des pays");
  //     }
  //   } catch (error) {
  //     toast.error("Erreur de connexion au serveur");
  //   }
  // };

  // const handleCategoryAdded = (newCategory: string) => {
  //   setCategories((prev) => [...prev, newCategory]);
  // };

  // useEffect(() => {
  //   fetchCategories();
  //   fetchCountries();
  // }, []);

  // const onSubmit = async (data: dataDecision) => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/decision`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify(data),
  //       },
  //     );

  //     if (response.ok) {
  //       reset();
  //       toast.success("Décision envoyée à l'administrateur");
  //     } else {
  //       toast.error("Erreur lors de l'envoi de la décision");
  //     }
  //   } catch (error) {
  //     toast.error("Erreur de connexion au serveur");
  //   }
  // };

  return (
    <section className={style.decisioncontainer}>
      {/* <section className={style.logo_exit}>
        <img id="logo" src="/intrasenselogo.png" alt="logo" />
        <button type="button" className={style.exitButton}>
          ✖
        </button>
      </section>

      <h2>Prise de décision:</h2>
      <form onSubmit={handleSubmit(onSubmit)} className="formcontainer">
        <section>
          <label htmlFor="title">Intitulé de la prise de décision:</label>
          <input
            type="text"
            id="title"
            placeholder="Saisissez le texte ici"
            {...register("title", { required: true })}
          />
        </section>

        <section>
          <label htmlFor="category">Saisissez une catégorie:</label>
          <select id="category" {...register("category", { required: true })}>
            <option value="">Choisissez une catégorie</option>
            {categories.map((category) => (
              <option key={category} value={category}>
                {category}
              </option>
            ))}
          </select>
        </section>

        <AddCategoryForm onCategoryAdded={handleCategoryAdded} />

        <section>
          <label htmlFor="country">Saisissez une localisation:</label>
          <select id="country" {...register("country", { required: true })}>
            <option value="">Choisissez une localisation</option>
            {countries.map((country) => (
              <option key={country} value={country}>
                {country}
              </option>
            ))}
          </select>
        </section>

        <section>
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            placeholder="Saisissez la description ici"
            {...register("description", { required: true })}
          />
        </section>

        <section>
          <label htmlFor="context">Quel impact sur l'organisation ?</label>
          <textarea
            id="context"
            placeholder="Saisissez l'impact ici"
            {...register("context", { required: true })}
          />
        </section>

        <section>
          <label htmlFor="profit">Quels sont les bénéfices?</label>
          <textarea
            id="profit"
            placeholder="Saisissez les bénéfices ici"
            {...register("profit", { required: true })}
          />
        </section>

        <section>
          <label htmlFor="risk">Quels sont les risques?</label>
          <textarea
            id="risk"
            placeholder="Saisissez les risques ici"
            {...register("risk", { required: true })}
          />
        </section>

        <section className={style.buttongroup}>
          <button type="button" className={style.canceldButton}>
            Annuler
          </button>
          <button type="submit" className={style.addDecisionButton}>
            Ajouter une décision
          </button>
        </section>
      </form> */}
    </section>
  );
}

export default CreateDecisionForm;
