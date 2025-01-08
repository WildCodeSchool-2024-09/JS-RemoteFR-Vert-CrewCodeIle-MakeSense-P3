import { useState } from "react";
import styles from "./loginForm.module.css";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = () => {
    const newErrors = { email: "", password: "" };
    let isValid = true;

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) {
      newErrors.email = "L'email est requis";
      isValid = false;
    } else if (!emailRegex.test(email)) {
      newErrors.email = "Format d'email invalide";
      isValid = false;
    }

    if (!password) {
      newErrors.password = "Le mot de passe est requis";
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password =
        "Le mot de passe doit contenir au moins 8 caractères";
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.card}>
      <h1 className={styles.title}>
        Interface de
        <br />
        connexion
      </h1>

      <section className={styles.formGroup}>
        <label htmlFor="email" className={styles.label}>
          Email :
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${styles.input} ${errors.email ? styles.inputError : ""}`}
          placeholder="exemple@email.com"
          aria-describedby="email-error"
        />
        {errors.email && (
          <span id="email-error" className={styles.errorText}>
            {errors.email}
          </span>
        )}
      </section>

      <section className={styles.formGroup}>
        <label htmlFor="password" className={styles.label}>
          Mot de passe :
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${styles.input} ${errors.password ? styles.inputError : ""}`}
          aria-describedby="password-error"
        />
        {errors.password && (
          <span id="password-error" className={styles.errorText}>
            {errors.password}
          </span>
        )}
      </section>

      <section className={styles.buttonGroup}>
        <button
          type="button"
          className={styles.buttonSignup}
          disabled={isSubmitting}
        >
          s'inscrire
        </button>
        <button
          type="submit"
          className={styles.buttonLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Connexion..." : "connexion"}
        </button>
      </section>

      <button type="button" className={styles.forgotPassword}>
        mot de passe oublié ?
      </button>
    </form>
  );
}
