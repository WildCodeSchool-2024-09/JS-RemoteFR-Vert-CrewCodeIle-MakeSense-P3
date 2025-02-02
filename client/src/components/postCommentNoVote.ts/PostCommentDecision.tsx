import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";

export default function PostCommentNoVote() {
  const { register, handleSubmit, reset } = useForm();
  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/comment`,
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
      toast.success("Commentaire envoyé");
    } catch (error) {
      toast.error("Erreur lors de l'envoi...");
      console.error(error);
    }
  };

  return (
    <section>
      <form onSubmit={handleSubmit(onSubmit)}>
        <label>
          Postez votre commentaire
          <input
            type="textarea"
            id="content"
            {...register("content", { required: "champ obligatoire" })}
          />
        </label>
        <button type="submit">Publier</button>
      </form>
    </section>
  );
}
