import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import style from "./createUserForm.module.css";

export default function CreateUserForm() {
  const minPassword: number = 8;
  // nombre minimum de caractères dans le mot de passe
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: FieldValues) => {
    try {
      const response = await fetch("http://localhost:3310/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      await response.json();
    } catch (error) {
      console.error("Erreur lors de l'envoi:", error);
    }
  };

  return (
    <section className={style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.card}>
        <h1 className={style.title}>Formulaire d'inscription</h1>
        <section>
          {/* <label>
            Téléchargez votre photo de profil
            <input
              type="file"
              accept="image/png, image/jpeg"
              {...register("avatar")}
              required
            />
          </label> */}
          <label>
            Nom
            <input
              type="text"
              aria-label="Saisissez votre nom"
              placeholder="Saisissez votre nom"
              className={style.input}
              pattern="^[A-Za-zÀ-ÿ]+(?:[-\s][A-Za-zÀ-ÿ]+)*$"
              // regex qui autorise les min, maj, accents, espaces et traits d'union
              required
              {...register("lastname")}
            />
          </label>
          <label>
            Prénom
            <input
              type="text"
              aria-label="Saisissez votre prénom"
              placeholder="Saisissez votre prénom"
              className={style.input}
              pattern="^[A-Za-zÀ-ÿ]+(?:[-\s][A-Za-zÀ-ÿ]+)*$"
              // regex qui autorise les min, maj, accents, espaces et traits d'union
              required
              {...register("firstname")}
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              aria-label="Saisissez votre mot de passe"
              placeholder="Saisissez votre mot de passe"
              className={style.input}
              minLength={minPassword}
              required
              pattern="[A-Za-z0-9]+"
              // regex qui autorise les min, maj et chiffres
              {...register("password")}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              aria-label="Saisissez votre email"
              placeholder="Saisissez votre email"
              className={style.input}
              required
              {...register("email")}
            />
          </label>
          <label>
            Photo de profil
            <input
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
