import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styles from "./register.module.css";

export default function CreateUserForm() {
  const navigate = useNavigate();
  const minPassword: number = 8;
  const maxPassword: number = 255;
  const [countries, setCountries] = useState([]);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm<FormValues>(); //type defini dans definition .ts

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/country`)
      .then((response) => response.json())
      .then((data) => {
        setCountries(data);
      });
  }, []);

  const onSubmit = async (data: FieldValues) => {
    try {
      const { confirmed_password, ...rest } = data;

      const transformedData = {
        ...rest,
        lastname: rest.lastname.toLowerCase(),
        firstname: rest.firstname.toLowerCase(),
        email: rest.email.toLowerCase(),
        password: rest.password, //mdp en clair ici c'est le middlewear hash passeword qui va le hacher par la suite.
        avatar: rest.avatar.toLowerCase(),
        country_id: rest.country_id,
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
      toast.success(" utilisateur inscrit avec succès");
      navigate("/");
    } catch (error) {
      toast.error("Erreur lors de l'envoi...");
    }
  };

  return (
    <section className={styles.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={styles.card}>
        <h1 className={styles.title}>Formulaire d'inscription</h1>
        <section>
          <label htmlFor="lastname" className={styles.label}>
            Nom
            <input
              id="lastname"
              type="text"
              aria-label="Saisissez votre nom"
              placeholder="Pendragon"
              className={styles.input}
              {...register("lastname", {
                required: "champ obligatoire",
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s-]+$/,
                  message:
                    "Le nom peut seulement contenir des lettres, des espaces et des tirets.",
                },
              })}
            />
            <span className={styles.errorText}>{errors.lastname?.message}</span>
          </label>
          <label htmlFor="firstname" className={styles.label}>
            Prénom
            <input
              id="firstname"
              type="text"
              aria-label="Saisissez votre prénom"
              placeholder="Arthur"
              className={styles.input}
              {...register("firstname", {
                required: "champ obligatoire",
                pattern: {
                  value: /^[A-Za-zÀ-ÿ\s-]+$/,
                  message:
                    "Le prénom peut seulement contenir des lettres, des espaces et des tirets.",
                },
              })}
            />
            <span className={styles.errorText}>
              {errors.firstname?.message}
            </span>
          </label>
          <label htmlFor="country_id" className={styles.label}>
            Pays
            <select
              className={styles.select}
              id="country_id"
              aria-label="Choisissez une localisation"
              required
              {...register("country_id")}
            >
              <option value="">Choisissez une localisation</option>
              {countries.map((country: CountryType) => (
                <option
                  key={country.id}
                  value={country.id}
                  title={country.label}
                >
                  {country.label}
                </option>
              ))}
            </select>
          </label>
          <label htmlFor="password" className={styles.label}>
            Mot de passe
            <input
              id="password"
              type="password"
              aria-label="Saisissez votre mot de passe"
              placeholder="Saisissez votre mot de passe"
              className={styles.input}
              minLength={minPassword}
              maxLength={maxPassword}
              autoComplete="current-password"
              {...register("password", {
                required: "champ obligatoire",
                pattern: {
                  value:
                    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/,
                  message:
                    "Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
                },
              })}
            />
            <span className={styles.errorText}>{errors.password?.message}</span>
          </label>
          <label className={styles.label}>
            Vérification du mot de passe
            <input
              id="confirmed_password"
              type="password"
              aria-label="Confirmez votre mot de passe"
              placeholder="Confirmez votre mot de passe"
              className={styles.input}
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
                required: "champ obligatoire",
                validate: (value) =>
                  value === watch("password") ||
                  "Les mots de passe ne correspondent pas",
              })}
            />
            <span className={styles.errorText}>
              {errors.confirmed_password?.message}
            </span>
          </label>

          <label htmlFor="email" className={styles.label}>
            Email
            <input
              id="email"
              type="email"
              aria-label="Saisissez votre email"
              placeholder="arthur@kaamelott.fr"
              className={styles.input}
              autoComplete="current-email"
              {...register("email", { required: "champ obligatoire" })}
            />
          </label>
          <label htmlFor="avatar" className={styles.label}>
            Photo de profil
            <input
              id="avatar"
              type="text"
              aria-label="URL de votre photo de profil"
              placeholder="URL de votre photo de profil"
              className={styles.input}
              {...register("avatar", { required: "champ obligatoire" })}
            />
          </label>
          <div className={styles.containerButton}>
            <button type="submit" className={styles.buttonCreateUser}>
              Envoyer ma demande
            </button>
          </div>
        </section>
      </form>
    </section>
  );
}
