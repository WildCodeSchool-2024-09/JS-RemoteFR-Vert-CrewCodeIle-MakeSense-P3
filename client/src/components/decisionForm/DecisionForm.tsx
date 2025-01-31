import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
// import AddCategoryForm from "../addCategoryForm/AddCategoryForm";
import style from "./decisionForm.module.css";

type DataFormDecisionType = {
  id: number;
  title: string;
  country_id: string;
  description: string;
  context: string;
  profit: string;
  risk: string;
  min_date: Date;
  max_date: Date;
  category: string;
};

type CategoryType = {
  id: number;
  label: string;
  color: string;
};

type CountryType = {
  id: number;
  label: string;
};

function CreateDecisionForm() {
  const { register, handleSubmit, reset } = useForm<DataFormDecisionType>();
  const [categories, setCategories] = useState([] as CategoryType[]);
  const [countries, setCountries] = useState([] as CountryType[]);

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
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/country`)
      .then((response) => response.json())
      .then((data: CountryType[]) => {
        setCountries(data);
      })
      .catch(() => toast.error("Erreur de connexion au serveur"));
    fetch(`${import.meta.env.VITE_API_URL}/api/category`)
      .then((response) => response.json())
      .then((data: CategoryType[]) => {
        setCategories(data);
      })
      .catch(() => toast.error("Erreur de connexion au serveur"));
  }, []);

  // const fetchCountries = async () => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/country`,
  //     );
  //     if (response.ok) {
  //       const data = await response.json();
  //       setCountries(data);
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

  const onSubmit = async (data: DataFormDecisionType) => {
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

      if (response.ok) {
        reset();
        toast.success("Décision envoyée à l'administrateur");
      } else {
        toast.error("Erreur lors de l'envoi de la décision");
      }
    } catch (error) {
      toast.error("Erreur de connexion au serveur");
    }
  };

  return (
    <section className={style.decisioncontainer}>
      <section className={style.logo_exit}>
        <img
          id="logo"
          src="/intrasenselogo.png"
          alt="logo"
          className={style.logo}
        />
        {/* <button type="button" className={style.exitButton}>
          ✖
        </button> */}
      </section>

      <h2 className={style.titleH2}>Création d'une décision</h2>
      <form onSubmit={handleSubmit(onSubmit)} className={style.form}>
        <section>
          <label htmlFor="title" className={style.label}>
            Intitulé de la prise de décision :
            <input
              className={style.input}
              type="text"
              id="title"
              placeholder="Saisissez le texte ici"
              {...register("title", { required: true })}
            />
          </label>
        </section>
        <section>
          <label htmlFor="category" className={style.label}>
            Saisissez une catégorie :
            <select
              id="category"
              className={style.select}
              {...register("category", { required: true })}
              multiple={true}
            >
              {/* <option value="">Choisissez une catégorie</option> */}
              {categories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.label}
                </option>
              ))}
            </select>
          </label>
        </section>
        {/* <AddCategoryForm onCategoryAdded={handleCategoryAdded} /> */}
        <section>
          <label htmlFor="country_id" className={style.label}>
            Saisissez une localisation :
            <select
              className={style.select}
              id="country_id"
              {...register("country_id", { required: true })}
            >
              <option value="">Choisissez une localisation</option>
              {countries.map((country) => (
                <option key={country.id} value={country.id}>
                  {country.label}
                </option>
              ))}
            </select>
          </label>
        </section>
        <section>
          <label htmlFor="description" className={style.label}>
            Description:
            <textarea
              className={style.textarea}
              id="description"
              placeholder="Saisissez la description ici"
              {...register("description", { required: true })}
            />
          </label>
        </section>
        <section>
          <label htmlFor="context" className={style.label}>
            Quel impact sur l'organisation ?
            <textarea
              className={style.textarea}
              id="context"
              placeholder="Saisissez l'impact ici"
              {...register("context", { required: true })}
            />
          </label>
        </section>
        <section>
          <label htmlFor="profit" className={style.label}>
            Quels sont les bénéfices ?
            <textarea
              className={style.textarea}
              id="profit"
              placeholder="Saisissez les bénéfices ici"
              {...register("profit", { required: true })}
            />
          </label>
        </section>
        <section>
          <label htmlFor="risk" className={style.label}>
            Quels sont les risques ?
            <textarea
              className={style.textarea}
              id="risk"
              placeholder="Saisissez les risques ici"
              {...register("risk", { required: true })}
            />
          </label>
        </section>
        <section>
          <article className={style.calendar}>
            <label htmlFor="min_date" className={style.label}>
              Date limite des votes :
              <input
                type="date"
                id="min_date"
                className={style.input}
                min={Date()}
                required
                {...register("min_date")}
              />
            </label>
            <label htmlFor="max_date" className={style.label}>
              Date limite de la prise de décision :
              <input
                type="date"
                id="max_date"
                className={style.input}
                min={Date()}
                required
                {...register("max_date")}
              />
            </label>
          </article>
        </section>
        <section className={style.buttongroup}>
          <button type="button" className={style.canceldButton}>
            Annuler
          </button>
          <button type="submit" className={style.addDecisionButton}>
            Ajouter une décision
          </button>
        </section>
      </form>
    </section>
  );
}

export default CreateDecisionForm;
