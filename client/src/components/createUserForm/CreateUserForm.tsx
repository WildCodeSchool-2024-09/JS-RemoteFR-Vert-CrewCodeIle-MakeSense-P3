// import { useForm } from "react-hook-form";
// import style from "./createUserForm.module.css";

// type UserType = {
//   firstname: string;
//   lastname: string;
//   email: string;
//   password: string;
// };

// export default function CreateUserForm() {
//   const { register, handleSubmit } = useForm();
//   // const [data, setData] = useState("");
//   // console.log(data);
//   const onSubmit = (data: UserType) => {
//     fetch("http://localhost:3310/api/users", {
//       method: "POST",
//       headers: { "Content-Type": "application/json" },
//       body: JSON.stringify(data),
//     });
//   };

//   return (
//     <section className={style.container}>
//       {/* <form>
//         <img
//           src="https://www.zooplus.fr/magazine/wp-content/uploads/2019/06/comprendre-le-langage-des-chats.jpg"
//           alt=""
//           className={style.avatar}
//         />
//         <button type="submit" className={style.buttonChangeAvatar}>
//           Télécharger photo de profil
//         </button>
//       </form> */}
//       <form
//         // onSubmit={handleSubmit((data) => setData(JSON.stringify(data)))}
//         onSubmit={handleSubmit(onSubmit)}
//         className={style.card}
//       >
//         <h1 className={style.title}>Inscription</h1>
//         <section>
//           <label>
//             Nom
//             <input
//               type="text"
//               aria-label="Saisissez votre nom"
//               placeholder="Saisissez votre nom"
//               className={style.input}
//               {...register("lastname")}
//             />
//           </label>
//           <label>
//             Prénom
//             <input
//               type="text"
//               aria-label="Saisissez votre prénom"
//               placeholder="Saisissez votre prénom"
//               className={style.input}
//               {...register("firstname")}
//             />
//           </label>
//           <label>
//             Mot de passe
//             <input
//               type="password"
//               aria-label="Saisissez votre mot de passe"
//               placeholder="Saisissez votre mot de passe"
//               {...register("password")}
//               className={style.input}
//               required
//               minLength={8}
//             />
//           </label>
//           <label>
//             Email
//             <input
//               type="email"
//               aria-label="Saisissez votre email"
//               placeholder="Saisissez votre email"
//               className={style.input}
//               {...register("email")}
//             />
//           </label>
//           <button type="submit" className={style.buttonCreateUser}>
//             Envoyer ma demande à l'administrateur
//           </button>
//         </section>
//         {/* {data} */}
//       </form>
//     </section>
//   );
// }
