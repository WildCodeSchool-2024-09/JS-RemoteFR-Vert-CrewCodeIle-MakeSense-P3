import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./modifyPassword.module.css";

type PasswordFormValues = {
  hash_password: string;
  confirmed_password: string;
};

export default function ModifyPassword() {
  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<PasswordFormValues>();

  const onSubmit = async (data: FieldValues) => {
    try {
      const { hash_password } = data;

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ hash_password }),
      });

      if (!response.ok)
        throw new Error("Erreur lors de la mise à jour du mot de passe");

      await response.json();
      reset();
      toast.success("Mot de passe modifié avec succès");
    } catch (error) {
      toast.error("Erreur lors de la modification du mot de passe");
    }
  };

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>Modifier mon mot de passe</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <section className={styles.row}>
          <section className={styles.field}>
            <label className={styles.label}>
              Nouveau mot de passe :
              <input
                type="password"
                {...register("hash_password", {
                  required: "Le mot de passe est requis",
                  pattern: {
                    value:
                      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                    message:
                      "Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
                  },
                })}
                className={`${styles.input} ${errors.hash_password ? styles.inputError : ""}`}
                placeholder="Entrez votre nouveau mot de passe"
              />
              {errors.hash_password && (
                <span className={styles.errorText}>
                  {errors.hash_password?.message}
                </span>
              )}
            </label>
          </section>
          <section className={styles.field}>
            <label className={styles.label}>
              Confirmer le mot de passe :
              <input
                type="password"
                {...register("confirmed_password", {
                  required: "Veuillez confirmer le mot de passe",
                  validate: (value) =>
                    value === watch("hash_password") ||
                    "Les mots de passe ne correspondent pas",
                })}
                className={`${styles.input} ${errors.confirmed_password ? styles.inputError : ""}`}
                placeholder="Confirmez votre nouveau mot de passe"
              />
              {errors.confirmed_password && (
                <span className={styles.errorText}>
                  {errors.confirmed_password?.message}
                </span>
              )}
            </label>
          </section>
        </section>

        <footer className={styles.buttonContainer}>
          <button type="submit" className={styles.saveButton}>
            Modifier le mot de passe
          </button>
        </footer>
      </form>
    </section>
  );
}
