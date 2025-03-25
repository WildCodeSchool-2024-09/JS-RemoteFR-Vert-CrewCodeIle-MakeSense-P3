import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import style from "./decisionForm.module.css";

type CategoryFormData = {
  newCategory: string;
};

type AddCategoryFormProps = {
  onCategoryAdded: () => void;
  // onCategoryAdded: (category: string) => void;
};

function AddCategoryForm({ onCategoryAdded }: AddCategoryFormProps) {
  const { register, handleSubmit, reset } = useForm<CategoryFormData>({
    defaultValues: {
      newCategory: "",
    },
  });

  /**
   * Fonction pour ajouter une catégorie
   */
  const AddCategory = async (data: CategoryFormData) => {
    console.info("données category envoyées au serveur", data);
    const newCategory = data.newCategory.trim();

    if (newCategory === "") {
      toast.warn("La catégorie ne peut pas être vide");
      return;
    }
    // console.log("categorie ajoutée: ", newCategory);
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ label: newCategory, color: "#FFFFFF" }),
        },
      );

      if (response.ok) {
        // onCategoryAdded(newCategory); //
        // Met à jour la liste des catégories dans CreateDecisionForm
        onCategoryAdded();
        reset(); // Réinitialise le champ après l'ajout
        toast.success("Catégorie ajoutée avec succès !");
      } else {
        toast.error("Erreur lors de l'ajout de la catégorie");
      }
    } catch (error) {
      // console.error("Erreur lors de l'ajout :", error);
      toast.error("Erreur de connexion au serveur");
    }
  };

  return (
    <div>
      <label htmlFor="newCategory"> Ajoutez une nouvelle catégorie: </label>
      <article className={style.addCategoryContainer}>
        <input
          type="text"
          id="newCategory"
          placeholder="Nouvelle catégorie"
          {...register("newCategory", {
            required: "Veuillez entrer une catégorie",
            // onChange: (e) => console.log("VALEUR saisie", e.target.value),
          })}
        />
        <button
          type="button"
          onClick={handleSubmit(AddCategory)}
          className={style.addButton}
        >
          ➕
        </button>
      </article>
    </div>
  );
}

export default AddCategoryForm;
