import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import style from "./createUserForm.module.css";

export default function CreateUserForm() {
  const minPassword: number = 8;
  // nombre minimum de caractères dans le mot de passe
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FieldValues) => {
    try {
      const transformedData = {
        ...data,
        lastname: data.lastname.toLowerCase(),
        firstname: data.firstname.toLowerCase(),
        email: data.email.toLowerCase(),
        hash_password: data.hash_password,
        avatar: data.avatar.toLowerCase(),
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/auth`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });
      await response.json();
      reset();
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    }
  };

  return (
    <section className={style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.card}>
        <h1 className={style.title}>Formulaire d'inscription</h1>
        <section>
          <label htmlFor="lastname">
            Nom
            <input
              id="lastname"
              type="text"
              aria-label="Saisissez votre nom"
              placeholder="Pendragon"
              className={style.input}
              required
              {...register("lastname", {
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s-]+$/,
                  message:
                    "Le nom peut seulement contenir des lettres, des espaces et des tirets.",
                },
              })}
            />
            <span className={style.errorText}>{errors.lastname?.message}</span>
          </label>
          <label htmlFor="firstname">
            Prénom
            <input
              id="firstname"
              type="text"
              aria-label="Saisissez votre prénom"
              placeholder="Arthur"
              className={style.input}
              {...register("firstname", {
                required: "champ obligatoire",
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s-]+$/,
                  message:
                    "Le prénom peut seulement contenir des lettres, des espaces et des tirets.",
                },
              })}
            />
            <span className={style.errorText}>{errors.firstname?.message}</span>
          </label>
          <label htmlFor="hash_password">
            Mot de passe
            <input
              id="hash_password"
              type="password"
              aria-label="Saisissez votre mot de passe"
              placeholder="Saisissez votre mot de passe"
              className={style.input}
              minLength={minPassword}
              autoComplete="current-password"
              {...register("hash_password", {
                required: "champ obligatoire",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message:
                    "Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
                },
              })}
            />
            <span className={style.errorText}>
              {errors.hash_password?.message}
            </span>
          </label>

          <label htmlFor="email">
            Email
            <input
              id="email"
              type="email"
              aria-label="Saisissez votre email"
              placeholder="arthur@kaamelott.fr"
              className={style.input}
              required
              autoComplete="current-email"
              {...register("email")}
            />
          </label>
          <label htmlFor="avatar">
            Photo de profil
            <input
              id="avatar"
              type="text"
              aria-label="URL de votre photo de profil"
              placeholder="URL de votre photo de profil"
              className={style.input}
              {...register("avatar")}
              required
            />
          </label>
          <button type="submit" className={style.buttonCreateUser}>
            Envoyer ma demande à l'administrateur
          </button>
        </section>
      </form>
    </section>
  );
}
