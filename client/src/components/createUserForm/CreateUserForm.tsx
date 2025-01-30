import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { toast } from "react-toastify";
import type { FormValues } from "../../lib/definitions";
import style from "./createUserForm.module.css";

export default function CreateUserForm() {
  const minPassword: number = 8;
  const maxPassword: number = 255;

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>();

  const onSubmit = async (data: FieldValues) => {
    try {
      const { confirmed_password, ...rest } = data;

      const transformedData = {
        ...rest,
        lastname: rest.lastname.toLowerCase(),
        firstname: rest.firstname.toLowerCase(),
        email: rest.email.toLowerCase(),
        hash_password: rest.hash_password,
        avatar: rest.avatar.toLowerCase(),
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });
      await response.json();
      reset();
      toast.success("Demande envoyée à l'administrateur");
    } catch (error) {
      toast.error("Erreur lors de l'envoi...");
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
              {...register("lastname", {
                required: "champ obligatoire",
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
              maxLength={maxPassword}
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
          <label>
            Vérification du mot de passe
            <input
              id="confirmed_password"
              type="password"
              aria-label="Confirmez votre mot de passe"
              placeholder="Confirmez votre mot de passe"
              className={style.input}
              minLength={minPassword}
              maxLength={maxPassword}
              autoComplete="confirmed_password"
              {...register("confirmed_password", {
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message:
                    "Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
                },
                validate: (value) =>
                  value === watch("hash_password") ||
                  "Les mots de passe ne correspondent pas",
              })}
            />
            <span className={style.errorText}>
              {errors.confirmed_password?.message}
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
              autoComplete="current-email"
              {...register("email", { required: "champ obligatoire" })}
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
              {...register("avatar", { required: "champ obligatoire" })}
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
