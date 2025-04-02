// CreateDecisionForm.tsx
import style from "./decisionForm.module.css";
import "react-toastify/dist/ReactToastify.css";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { useOutletContext } from "react-router";
import { toast } from "react-toastify";
import AddCategoryForm from "./Add";

type Category = {
  id: number;
  label: string;
};

type dataDecision = {
  title: string;
  country_id: number;
  // country: string;
  min_date: Date;
  max_date: Date;
  description: string;
  context: string;
  profit: string;
  risk: string;
  category_id: number;
};

function CreateDecisionForm() {
  const { auth } = useOutletContext() as {
    auth: Auth | null;
  };

  // 1. État pour stocker les catégories
  const [categoryList, setCategoryList] = useState<Category[]>([]);

  // 2. Formulaire
  const { register, handleSubmit, reset } = useForm<dataDecision>({
    defaultValues: {
      title: "",
      country_id: 0,
      min_date: new Date(),
      max_date: new Date(),
      description: "",
      context: "",
      profit: "",
      risk: "",
      category_id: 0,
    },
  });

  // 4. Charger au montage
  useEffect(() => {
    // 3. Fonction pour charger les catégories
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/category`,
        );
        if (response.ok) {
          const data = await response.json();
          setCategoryList(data); // [{ id: 1, label: "RH" }, ...]
        } else {
          toast.error("Erreur lors du chargement des catégories");
        }
      } catch (error) {
        toast.error("Erreur de connexion au serveur");
      }
    };
    fetchCategories();
  }, []);

  // 5. Quand une catégorie est ajoutée depuis <AddCategoryForm />
  const handleCategoryAdded = () => {
    toast.success("Catégorie ajoutée !");
    // fetchCategories(); // Recharge les catégories
    window.location.reload();
  };

  const country = [
    { id: 1, label: "France" },
    { id: 2, label: "Mexique" },
    { id: 3, label: "Canada" },
    { id: 4, label: "Pérou" },
    { id: 5, label: "Sénégal" },
    { id: 6, label: "Philippines" },
    { id: 7, label: "Liban" },
    { id: 8, label: "Cote d'Ivoire" },
    { id: 9, label: "Australie" },
    { id: 10, label: "Ukraine" },
  ];

  // 6. Envoi du formulaire
  const onSubmit = async (data: FieldValues) => {
    console.info("Données envoyées :", data);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/decision`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${auth?.token}`, // Inclusion du jeton JWT
          },
          body: JSON.stringify(data),
        },
      );

      if (response.ok) {
        await response.json();
        reset();
        toast.success("Décision envoyée !");
      } else {
        toast.error("Erreur lors de l'envoi");
      }
    } catch (error) {
      toast.error("Erreur de connexion au serveur");
    }
  };

  return (
    <section className={style.decisioncontainer}>
           {" "}
      <section className={style.logo_exit}>
               {" "}
        <img
          className={style.logo}
          id="logo"
          src="/intrasenselogo.png"
          alt="logo"
        />
               {" "}
        <button type="button" className={style.exitButton}>
          ✖
        </button>
             {" "}
      </section>
            <h2>Prise de décision:</h2>     {" "}
      <form onSubmit={handleSubmit(onSubmit)} className="formcontainer">
                {/* Titre */}       {" "}
        <section>
                    <label htmlFor="title">Intitulé :</label>         {" "}
          <input
            type="text"
            id="title"
            placeholder="Saisissez le titre ici"
            {...register("title")}
          />
                 {" "}
        </section>
                {/* Catégorie */}       {" "}
        <section>
                    <label htmlFor="category_id">Catégorie :</label>         {" "}
          <select
            id="category_id"
            {...register("category_id", {
              required: "Sélectionnez une catégorie",
            })}
          >
                        <option value="">Choisissez une catégorie</option>     
                 {" "}
            {categoryList.map((cat) => (
              <option key={cat.id} value={cat.id}>
                                {cat.label}             {" "}
              </option>
            ))}
                     {" "}
          </select>
                 {" "}
        </section>
                {/* Formulaire d'ajout de catégorie */}       {" "}
        <AddCategoryForm onCategoryAdded={handleCategoryAdded} />       {" "}
        {/* Pays */}       {" "}
        <section>
                    <label htmlFor="country">Localisation :</label>         {" "}
          <select
            id="country_id"
            {...register("country_id", {
              required: "Choisissez un pays",
            })}
          >
                        <option value="">Choisissez un pays</option>           {" "}
            {country.map((c) => (
              <option key={c.id} value={c.id}>
                {c.label}
              </option>
            ))}
                     {" "}
          </select>
                 {" "}
        </section>
                {/* Description */}       {" "}
        <section>
                    <label htmlFor="description">Description :</label>         {" "}
          <textarea
            id="description"
            placeholder="Saisissez la description ici"
            {...register("description")}
          />
                 {" "}
        </section>
                {/* Contexte */}       {" "}
        <section>
                    <label htmlFor="context">Impact sur l'organisation :</label>
                   {" "}
          <textarea
            id="context"
            placeholder="Saisissez le contexte ici"
            {...register("context")}
          />
                 {" "}
        </section>
                {/* Bénéfices */}       {" "}
        <section>
                    <label htmlFor="profit">Bénéfices :</label>         {" "}
          <textarea
            id="profit"
            placeholder="Saisissez les bénéfices ici"
            {...register("profit")}
          />
                 {" "}
        </section>
                {/* Risques */}       {" "}
        <section>
                    <label htmlFor="risk">Risques :</label>         {" "}
          <textarea
            id="risk"
            placeholder="Saisissez les risques ici"
            {...register("risk")}
          />
                 {" "}
        </section>
                {/* Dates */}       {" "}
        <section className={style.planningDates}>
                    <legend>Planning :</legend>         {" "}
          <article className={style.gridContainer}>
                       {" "}
            <article>
                            <label htmlFor="min_date">Début :</label>           
                <input type="date" id="min_date" {...register("min_date")} />   
                     {" "}
            </article>
                       {" "}
            <article>
                            <label htmlFor="max_date">Fin :</label>             {" "}
              <input type="date" id="max_date" {...register("max_date")} />     
                   {" "}
            </article>
                     {" "}
          </article>
                   {" "}
          <p className={style.remarqueNb}>
                        NB: La durée doit être comprise entre 15 et 90 jours.  
                   {" "}
          </p>
                 {" "}
        </section>
                {/* Boutons */}       {" "}
        <section className={style.buttongroup}>
                   {" "}
          <button type="button" className={style.canceldButton}>
            Annuler
          </button>
                   {" "}
          <button type="submit" className={style.addDecisionButton}>
            Ajouter
          </button>
                 {" "}
        </section>
             {" "}
      </form>
         {" "}
    </section>
  );
}

export default CreateDecisionForm;
