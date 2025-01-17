import { useState } from "react";
import { useForm } from "react-hook-form";
import style from "./createUserForm.module.css";

export default function CreateUserForm() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");
  // console.log(data);

  return (
    <>
      <section>
        {/* <form>
          <img
            src="https://www.zooplus.fr/magazine/wp-content/uploads/2019/06/comprendre-le-langage-des-chats.jpg"
            alt=""
            className={style.avatar}
          />
          <button type="submit" className={style.buttonChangeAvatar}>
            Télécharger photo de profil
          </button>
        </form> */}
        <form onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}>
          <label>
            Nom
            <input
              type="text"
              aria-label="Saisissez votre nom"
              placeholder="Saisissez votre nom"
              {...register("lastname")}
            />
          </label>
          <label>
            Prénom
            <input
              type="text"
              aria-label="Saisissez votre prénom"
              placeholder="Saisissez votre prénom"
              {...register("firstname")}
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              aria-label="Saisissez votre mot de passe"
              placeholder="Saisissez votre mot de passe"
              {...register("password")}
              required
              minLength={8}
            />
          </label>
          <label>
            Email
            <input
              type="email"
              aria-label="Saisissez votre email"
              placeholder="Saisissez votre email"
              {...register("email")}
            />
          </label>
          {data}
          <button type="submit" className={style.buttonCreateAccount}>
            Envoyer ma demande à l'administrateur
          </button>
        </form>
      </section>
    </>
  );
}
