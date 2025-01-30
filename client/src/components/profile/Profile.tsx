import { useEffect } from "react";
import { type SubmitHandler, useForm } from "react-hook-form";
import { toast } from "react-toastify";
import styles from "./profile.module.css";

type ProfileFormValues = {
  firstname: string;
  lastname: string;
  email: string;
  avatar?: string;
};

export default function Profile() {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<ProfileFormValues>();

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/user`,
          {
            method: "GET",
          },
        );

        if (!response.ok)
          throw new Error("Erreur lors de la récupération des données");

        const data = await response.json();
        reset(data);
      } catch (error) {
        toast.error("Erreur lors de la récupération des informations");
      }
    };

    fetchProfileData();
  }, [reset]);

  const onSubmit: SubmitHandler<ProfileFormValues> = async (data) => {
    try {
      const transformedData = {
        lastname: data.lastname.toLowerCase(),
        firstname: data.firstname.toLowerCase(),
        email: data.email.toLowerCase(),
        avatar: data.avatar,
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(transformedData),
      });

      if (!response.ok) throw new Error("Erreur lors de la mise à jour");

      await response.json();
      toast.success("Modifications prises en compte");
    } catch (error) {
      toast.error("Erreur lors de l'envoi...");
    }
  };

  const handlePhotoChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      toast.error("Veuillez sélectionner une image");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("avatar", file);

      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/user/avatar`,
        {
          method: "POST",
          body: formData,
        },
      );

      if (!response.ok) throw new Error("Erreur lors du téléchargement");

      const data = await response.json();
      setValue("avatar", data.avatarUrl);
      toast.success("Photo de profil mise à jour");
    } catch (error) {
      toast.error("Erreur lors du téléchargement de l'image");
    }
  };

  return (
    <section className={styles.card}>
      <header className={styles.header}>
        <h2 className={styles.title}>Mes informations</h2>
      </header>

      <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
        <section className={styles.row}>
          <section className={styles.field}>
            <label className={styles.label}>
              Nom :
              <input
                type="text"
                {...register("lastname", { required: "Le nom est requis" })}
                className={`${styles.input} ${errors.lastname ? styles.inputError : ""}`}
                placeholder="Entrez votre nom"
              />
              {errors.lastname && (
                <span className={styles.errorText}>
                  {errors.lastname.message}
                </span>
              )}
            </label>
          </section>
          <section className={styles.field}>
            <label className={styles.label}>
              Prénom :
              <input
                type="text"
                {...register("firstname", { required: "Le prénom est requis" })}
                className={`${styles.input} ${errors.firstname ? styles.inputError : ""}`}
                placeholder="Entrez votre prénom"
              />
              {errors.firstname && (
                <span className={styles.errorText}>
                  {errors.firstname.message}
                </span>
              )}
            </label>
          </section>
        </section>

        <section className={styles.field}>
          <label className={styles.label}>
            Email :
            <input
              type="email"
              {...register("email", {
                required: "L'email est requis",
                pattern: {
                  value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                  message: "Veuillez entrer un email valide",
                },
              })}
              className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
              placeholder="Entrez votre email"
            />
            {errors.email && (
              <span className={styles.errorText}>{errors.email.message}</span>
            )}
          </label>
        </section>
        <section className={styles.field}>
          <label className={styles.label}>
            Photo de profil :
            <input
              type="file"
              accept="image/*"
              onChange={handlePhotoChange}
              className={styles.input}
            />
          </label>
        </section>

        <footer className={styles.buttonContainer}>
          <button type="submit" className={styles.saveButton}>
            Enregistrer
          </button>
        </footer>
      </form>
    </section>
  );
}
