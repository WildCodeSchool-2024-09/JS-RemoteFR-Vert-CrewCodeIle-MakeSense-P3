import style from "./createUserForm.module.css";

export default function CreateUserForm() {
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    // const formData = new FormData(event.currentTarget);
    // const lastname = formData.get("lastname");
    // const firstname = formData.get("firstname");
    // const password = formData.get("password");
    // const email = formData.get("email");

    // fetch(`${import.meta.env.VITE_API_URL}/api/users`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formData),
    // });
  };

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
        <form onSubmit={handleSubmit}>
          <label>
            Nom
            <input
              type="text"
              name="lastname"
              aria-label="Saisissez votre nom"
              placeholder="Saisissez votre nom"
              id="lastname"
              value=""
            />
          </label>
          <label>
            Prénom
            <input
              type="text"
              name="firstname"
              aria-label="Saisissez votre prénom"
              placeholder="Saisissez votre prénom"
              id="firstname"
            />
          </label>
          <label>
            Mot de passe
            <input
              type="password"
              name="password"
              aria-label="Saisissez votre mot de passe"
              placeholder="Saisissez votre mot de passe"
              id="password"
            />
          </label>
          <label>
            Email
            <input
              type="email"
              name="email"
              aria-label="Saisissez votre email"
              placeholder="Saisissez votre email"
              id="email"
            />
          </label>

          <button type="submit" className={style.buttonCreateAccount}>
            Envoyer ma demande à l'administrateur
          </button>
        </form>
      </section>
    </>
  );
}
