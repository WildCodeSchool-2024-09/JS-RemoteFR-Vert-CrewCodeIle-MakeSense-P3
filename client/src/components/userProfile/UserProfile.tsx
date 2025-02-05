import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";
import styles from "./userProfile.module.css";

export default function UserProfile() {
  const [user, setUser] = useState<ProfileFormValues | null>(null);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmError, setConfirmError] = useState("");

  const { register, handleSubmit, reset } = useForm<ProfileFormValues>();

  const validatePassword = (value: string) => {
    const pattern =
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*(),.?":{}|<>]).{8,}$/;
    if (!pattern.test(value)) {
      setPasswordError(
        "Le mot de passe doit contenir au minimum 8 caractères, 1 majuscule, 1 minuscule, 1 chiffre et 1 caractère spécial",
      );
      return false;
    }
    setPasswordError("");
    return true;
  };

  const validateConfirmPassword = (value: string) => {
    if (value !== password) {
      setConfirmError("Les mots de passe ne correspondent pas");
      return false;
    }
    setConfirmError("");
    return true;
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    validatePassword(value);
    if (confirmPassword) {
      validateConfirmPassword(confirmPassword);
    }
  };

  const handleConfirmPasswordChange = (
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const value = e.target.value;
    setConfirmPassword(value);
    validateConfirmPassword(value);
  };

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
        setUser(data);
        reset(data);
      } catch (error) {
        toast.error("Erreur lors de la récupération des informations");
      }
    };

    fetchProfileData();
  }, [reset]);

  const onSubmit = async (data: ProfileFormValues) => {
    try {
      const transformedData = {
        lastname: data.lastname.toLowerCase(),
        firstname: data.firstname.toLowerCase(),
        email: data.email.toLowerCase(),
        avatar: data.avatar?.toLowerCase(),
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

  if (!user) return <div>Chargement...</div>;

  return (
    <main className={styles.container}>
      <section className={styles.card}>
        <header className={styles.header}>
          <h2 className={styles.title}>Mes informations</h2>
          <section className={styles.avatarContainer}>
            <img
              src={user.avatar || "/default-avatar.png"}
              alt={`${user.firstname} ${user.lastname}`}
              className={styles.profilePicture}
            />
            <button type="button" className={styles.photoButton}>
              Changer de photo
            </button>
          </section>
        </header>

        <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
          <section className={styles.row}>
            <section className={styles.field}>
              <label className={styles.label}>
                Nom :
                <input
                  type="text"
                  defaultValue={user.lastname}
                  {...register("lastname")}
                  className={styles.input}
                />
              </label>
            </section>
            <section className={styles.field}>
              <label className={styles.label}>
                Prénom :
                <input
                  type="text"
                  defaultValue={user.firstname}
                  {...register("firstname")}
                  className={styles.input}
                />
              </label>
            </section>
          </section>

          <section className={styles.field}>
            <label className={styles.label}>
              Email :
              <input
                type="email"
                defaultValue={user.email}
                {...register("email")}
                className={styles.input}
              />
            </label>
          </section>

          <section className={styles.row}>
            <section className={styles.field}>
              <label className={styles.label}>
                Modifier votre mot de passe :
                <input
                  type="password"
                  value={password}
                  onChange={handlePasswordChange}
                  className={`${styles.input} ${passwordError ? styles.inputError : ""}`}
                  placeholder="Cliquez pour modifier"
                />
                {passwordError && (
                  <span className={styles.errorText}>{passwordError}</span>
                )}
              </label>
            </section>
            <section className={styles.field}>
              <label className={styles.label}>
                Confirmer votre mot de passe :
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleConfirmPasswordChange}
                  className={`${styles.input} ${confirmError ? styles.inputError : ""}`}
                  placeholder="Confirmer le nouveau mot de passe"
                />
                {confirmError && (
                  <span className={styles.errorText}>{confirmError}</span>
                )}
              </label>
            </section>
          </section>

          <footer className={styles.buttonContainer}>
            <button type="submit" className={styles.saveButton}>
              Enregistrer
            </button>
          </footer>
        </form>
      </section>
    </main>
  );
}
