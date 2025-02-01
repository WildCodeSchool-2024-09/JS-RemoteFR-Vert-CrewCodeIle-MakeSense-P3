import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import style from "./addCategoryForm.module.css";

/*double type à revérifier*/

function AddCategoryForm() {
  const { register, handleSubmit, reset } = useForm<FormValuesCategory>();

  const onSubmit = async (data: CategoryFormData) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/category`,
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
        toast.error("Erreur lors de l'envoi...");
      }
    } catch (error) {
      toast.error("Erreur lors de l'envoi...");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.addCategory}>
      <label htmlFor="label"> Ajoutez une nouvelle catégorie: </label>
      <article className={style.addCategoryContainer}>
        <input
          type="text"
          id="label"
          placeholder="Nouvelle catégorie"
          {...register("label", {
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
