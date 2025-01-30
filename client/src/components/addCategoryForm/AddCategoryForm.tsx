import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import style from "./decisionForm.module.css";

/*double type à revérifier*/
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

  const AddCategory = async (data: CategoryFormData) => {
    const newCategory = data.newCategory.trim();

    if (newCategory === "") {
      toast.warn("La catégorie ne peut pas être vide");
      return;
    }

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
        onCategoryAdded(newCategory);
        reset();
        toast.success("Catégorie ajoutée avec succès !");
      } else {
        const errorMessage = await response.text();
        toast.error(`Erreur lors de l'ajout : ${errorMessage}`);
      }
    } catch (error) {
      toast.error("Erreur de connexion au serveur");
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
          {...register("newCategory", {
            required: "Veuillez entrer une catégorie",
            minLength: { value: 2, message: "Au moins 2 caractères requis" },
            maxLength: { value: 50, message: "Maximum 50 caractères" },
          })}
        />
        <button type="submit" className={style.addButton}>
          ➕
        </button>
      </article>
    </form>
  );
}

export default AddCategoryForm;
