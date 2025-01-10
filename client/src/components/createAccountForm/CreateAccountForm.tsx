// import style from "./createAccountForm.module.css";

// export default function CreateAccountForm({ defaultValue, onSubmit }) {
//   const handleSubmit = (event) => {
//     event.preventDefault();
//     const formData = new FormData(event.currentTarget);
//     const user_lastname = formData.get("lastname") as string;
//     const user_firstname = formData.get("firstname") as string;
//     const user_password = formData.get("password") as string;
//     const user_email = formData.get("email") as string;

//     onSubmit({
//       lastname,
//       firstname,
//       password,
//       email,
//     });
//   };

//   return (
//     <>
//       <section>
//         <form>
//           <img
//             src="https://www.zooplus.fr/magazine/wp-content/uploads/2019/06/comprendre-le-langage-des-chats.jpg"
//             alt=""
//             className={style.avatar}
//           />
//           <button type="submit" className={style.buttonChangeAvatar}>
//             Changer de photo de profil
//           </button>
//         </form>
//         <form onSubmit={handleSubmit}>
//           <label>
//             Nom
//             <input
//               type="text"
//               name="lastname"
//               aria-label="Saisissez votre nom"
//               placeholder="Saisissez votre nom"
//               defaultValue={defaultValue.lastname}
//             />
//           </label>
//           <label>
//             Prénom
//             <input
//               type="text"
//               name="firstname"
//               aria-label="Saisissez votre prénom"
//               placeholder="Saisissez votre prénom"
//               defaultValue={defaultValue.firstname}
//             />
//           </label>
//           <label>
//             Mot de passe
//             <input
//               type="password"
//               name="password"
//               aria-label="Saisissez votre mot de passe"
//               placeholder="Saisissez votre mot de passe"
//               defaultValue={defaultValue.password}
//             />
//           </label>
//           <label>
//             Email
//             <input
//               type="email"
//               name="email"
//               aria-label="Saisissez votre email"
//               placeholder="Saisissez votre email"
//               defaultValue={defaultValue.email}
//             />
//           </label>

//           <button type="submit" className={style.buttonCreateAccount}>
//             Envoyer ma demande à l'administrateur
//           </button>
//         </form>
//       </section>
//     </>
//   );
// }
