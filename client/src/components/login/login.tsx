import { useForm } from "react-hook-form";
import type { FieldValues } from "react-hook-form";
import { NavLink, useNavigate, useOutletContext } from "react-router-dom";
import { toast } from "react-toastify";
import style from "./login.module.css";

export default function LoginForm() {
  const { setAuth } = useOutletContext() as {
    setAuth: (auth: Auth | null) => void;
  };
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FieldValues>();

  const Navigate = useNavigate();
  const onSubmit = async (data: FieldValues) => {
    try {
      const { email, password } = data;

      const loginData = {
        email: email.toLowerCase(),
        password,
      };
      console.log("donneees envoyées au backend", loginData);
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/login`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // credentials: "include",
          body: JSON.stringify(loginData),
        },
      );
      console.log("statu reponse", response.status);
      //auth dans le back contient token et credentials

      if (response.ok) {
        const auth = await response.json();
        console.log("reponse du backend", auth);
        setAuth(auth); //je mets à jour les données du context avec les données du serveur que j'ai récupéré lors du login, contenant
        //maintenant token et credentials.
        reset();
        toast.success("Connexion réussie !");
      } else {
        toast.error("Erreur lors de la connexion");
      }
      setTimeout(() => {
        Navigate("/");
      }, 1500);
    } catch (error) {
      toast.error("Erreur de connexion. Vérifiez vos identifiants.");
    }
  };

  return (
    <section className={style.container}>
      <form onSubmit={handleSubmit(onSubmit)} className={style.card}>
        <h1 className={style.title}>
          Connexion sur Intra<span className={style.underscore}>_</span>Sense
        </h1>
        <section>
          <label htmlFor="email" className={style.label}>
            Email
            <input
              id="email"
              type="email"
              aria-label="Saisissez votre email"
              placeholder="arthur@kaamelott.fr"
              className={style.input}
              autoComplete="email"
              {...register("email", {
                required: "champ obligatoire",
              })}
            />
            <span className={style.errorText}>
              {errors.email?.message?.toString()}
            </span>
          </label>

          <label htmlFor="password" className={style.label}>
            Mot de passe
            <input
              id="password"
              type="password"
              aria-label="Saisissez votre mot de passe"
              placeholder="Saisissez votre mot de passe"
              className={style.input}
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
            <span className={style.errorText}>
              {errors.password?.message?.toString()}
            </span>
          </label>
          <div className={style.containerButton}>
            <button type="submit" className={style.buttonLogin}>
              Se connecter
            </button>
            <NavLink to="/register">
              <button type="submit" className={style.buttonRegister}>
                S'inscrire
              </button>
            </NavLink>
          </div>
        </section>
      </form>
    </section>
  );
}
