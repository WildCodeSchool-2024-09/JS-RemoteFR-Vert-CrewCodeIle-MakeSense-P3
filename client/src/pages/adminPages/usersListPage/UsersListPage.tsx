import { useEffect, useState } from "react";
import style from "./usersList.module.css";

export default function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [applicants, setApplicants] = useState<UserListType[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/user`)
      .then((response) => response.json())
      .then((data) => {
        setUsers(data);
      });
    fetch(`${import.meta.env.VITE_API_URL}/api/applicant`)
      .then((response) => response.json())
      .then((data) => {
        setApplicants(data);
      });
  }, []);
  //   console.log(users);
  return (
    <>
      <h1>Administration des utilisateurs</h1>
      <h2>Liste des postulants</h2>
      <section className={style.container}>
        {applicants.map((user) => (
          <article key={user.id} className={style.userCard}>
            <div>
              {user.firstname} {user.lastname}
            </div>
            <div>
              Inscrit le {new Date(user.created_at).toLocaleDateString("fr-CA")}
            </div>
            {/* <img
              src="https://cdn.discordapp.com/attachments/1280447044099510357/1337082981348675675/101311.png?ex=67a62710&is=67a4d590&hm=d6bfe5bc7545b76fdb8baa62fb1b3419e6e40c7ee19d86985da32cb2d2b627fb&"
              alt="modification de l'utilisateur"
              width="30"
            /> */}
            <button type="button">Accepter</button>
            <button type="button">Rejeter</button>
          </article>
        ))}
      </section>
      <h2>Liste des utilisateurs</h2>
      <section className={style.container}>
        {users.map((user: UserListType) => (
          <article key={user.id} className={style.userCard}>
            <div>
              {user.firstname} {user.lastname}
            </div>
            <div>
              Inscrit le {new Date(user.created_at).toLocaleDateString("fr-CA")}
            </div>
            {/* <img
              src="https://cdn.discordapp.com/attachments/1280447044099510357/1337082981348675675/101311.png?ex=67a62710&is=67a4d590&hm=d6bfe5bc7545b76fdb8baa62fb1b3419e6e40c7ee19d86985da32cb2d2b627fb&"
              alt="modification de l'utilisateur"
              width="30"
            /> */}
            <button type="button">Supprimer</button>
          </article>
        ))}
      </section>
    </>
  );
}
