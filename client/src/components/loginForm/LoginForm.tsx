import { useForm } from "react-hook-form";
import style from "./loginForm.module.css";

type FormValues = {
  email: string;
  password: string;
};

export default function LoginForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormValues>();

  const MinimumCaract = 8;

  const onSubmit = async (data: FormValues) => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className={style.card}>
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
          {...register("email", {
            required: "L'email est requis",
            pattern: {
              value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
              message: "Format d'email invalide",
            },
          })}
          className={`${style.input} ${errors.email ? style.inputError : ""}`}
          placeholder="exemple@email.com"
          aria-invalid={errors.email ? "true" : "false"}
          aria-describedby="email-error"
          autoComplete="email"
        />
        {errors.email && (
          <span id="email-error" className={style.errorText}>
            {errors.email.message}
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
          {...register("password", {
            required: "Le mot de passe est requis",
            minLength: {
              value: MinimumCaract,
              message: `Le mot de passe doit contenir au moins ${MinimumCaract} caractères`,
            },
          })}
          className={`${style.input} ${errors.password ? style.inputError : ""}`}
          aria-invalid={errors.password ? "true" : "false"}
          aria-describedby="password-error"
          autoComplete="current-password"
        />
        {errors.password && (
          <span id="password-error" className={style.errorText}>
            {errors.password.message}
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
