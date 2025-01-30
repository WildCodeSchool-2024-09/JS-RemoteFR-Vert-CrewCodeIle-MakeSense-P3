import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import style from "./decisionForm.module.css";

type CategoryFormData = {
  newCategory: string;
};

type AddCategoryFormProps = {
  onCategoryAdded: (category: string) => void;
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
    // console.log("données", data);
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
          body: JSON.stringify({ label: newCategory }),
        },
      );

      if (response.ok) {
        onCategoryAdded(newCategory); // Met à jour la liste des catégories dans CreateDecisionForm
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
  // const AddCategory = async (data: CategoryFormData) => {
  //   try {
  //     const response = await fetch(
  //       `${import.meta.env.VITE_API_URL}/api/category`,
  //       {
  //         method: "POST",
  //         headers: {
  //           "Content-Type": "application/json",
  //         },
  //         body: JSON.stringify({ label: data.newCategory.trim() }),
  //       },
  //     );

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       console.error("Erreur API :", errorData);
  //       toast.error(
  //         `Erreur serveur : ${errorData.message || "Erreur inconnue"}`,
  //       );
  //       return;
  //     }

  //     onCategoryAdded(data.newCategory);
  //     reset();
  //     toast.success("Catégorie ajoutée avec succès !");
  //   } catch (error) {
  //     console.error("Erreur lors de l'ajout :", error);
  //     toast.error("Erreur de connexion au serveur");
  //   }
  // };

  return (
    <form onSubmit={handleSubmit(AddCategory)} className={style.addCategory}>
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
        <button type="submit" className={style.addButton}>
          ➕
        </button>
        <button
          type="button"
          onClick={() => AddCategory({ newCategory: "test manuel" })}
          className={style.addButton}
        >
          ➕
        </button>
      </article>
    </form>
  );
}

export default AddCategoryForm;
