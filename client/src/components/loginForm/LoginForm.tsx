import { useState } from "react";
import style from "./loginForm.module.css";

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
    <form onSubmit={handleSubmit} className={style.card}>
      <h1 className={style.title}>
        Interface de
        <br />
        connexion
      </h1>

      <section className={style.formGroup}>
        <label htmlFor="email" className={style.label}>
          Email :
        </label>
        <input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={`${style.input} ${errors.email ? style.inputError : ""}`}
          placeholder="exemple@email.com"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby="email-error"
          autoComplete="email"
        />
        {errors.email && (
          <span id="email-error" className={style.errorText}>
            {errors.email}
          </span>
        )}
      </section>

      <section className={style.formGroup}>
        <label htmlFor="password" className={style.label}>
          Mot de passe :
        </label>
        <input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className={`${style.input} ${errors.password ? style.inputError : ""}`}
          aria-describedby="password-error"
        />
        {errors.password && (
          <span id="password-error" className={style.errorText}>
            {errors.password}
          </span>
        )}
      </section>

      <section className={style.buttonGroup}>
        <button
          type="button"
          className={style.buttonSignup}
          disabled={isSubmitting}
        >
          s'inscrire
        </button>
        <button
          type="submit"
          className={style.buttonLogin}
          disabled={isSubmitting}
        >
          {isSubmitting ? "Connexion en cours ..." : "Connexion"}
        </button>
      </section>

      <button type="button" className={style.forgotPassword}>
        mot de passe oublié ?
      </button>
    </form>
  );
}
