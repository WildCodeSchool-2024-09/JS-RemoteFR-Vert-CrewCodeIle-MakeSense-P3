import { useFormContext } from "react-hook-form";
import { toast } from "react-toastify";
import style from "./decisionForm.module.css";

function AddCategoryForm() {
  const { setValue, watch, handleSubmit, register } = useFormContext();
  const categories = watch("categories") || [];
  const newCategory = watch("newcategories") || "";

  /**
   * Fonction pour ajouter une nouvelle catégorie
   */
  const AddCategory = async () => {
    if (!newCategory.trim()) {
      toast.warn("La catégorie ne peut pas être vide");
    } else if (categories.includes(newCategory)) {
      toast.error("Cette catégorie existe déjà");
    } else {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/api/category`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ label: newCategory }),
        });

        if (response.ok) {
          setValue("categories", [...categories, newCategory]); // Ajoute la catégorie
          setValue("newcategories", ""); // Réinitialise le champ
          toast.success("Catégorie ajoutée avec succès !");
        } else {
          toast.error("Erreur lors de l'ajout de la catégorie");
        }
      } catch (error) {
        console.error("Erreur lors de l'ajout :", error);
        toast.error("Erreur de connexion au serveur");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit(AddCategory)} className={style.addCategory}>
      <label htmlFor="newCategory"> Ajoutez une nouvelle catégorie: </label>
      <article className={style.addCategoryContainer}>
        <input
          type="text"
          id="newCategory"
          placeholder="Nouvelle catégorie"
          {...register("newcategories", { required: "Veuillez entrer une catégorie" })}
        />
        <button type="submit" className={style.addButton}>
          ➕
        </button>
      </article>
    </form>
  );
}

export default AddCategoryForm;