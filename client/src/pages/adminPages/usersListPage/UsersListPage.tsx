import { useEffect, useState } from "react";
import ApplicantsList from "../../../components/admin/applicantsList/ApplicantsList";
// import UsersList from "../../../components/admin/usersList/UsersList";

export default function UsersListPage() {
  const [users, setUsers] = useState([]);
  const [applicants, setApplicants] = useState<UserListType[]>([]);

  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/api/accepted`)
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

  return (
    <>
      <h1>Administration des utilisateurs</h1>

      <section>
        <h2>Liste des postulants</h2>
        {applicants.map((applicant) => (
          <ApplicantsList user={applicant} key={applicant.id} />
        ))}
      </section>
      <section>
        <h2>Liste des utilisateurs</h2>
      </section>
      {/* {users.map((user) => (
        <UsersList user={user} key={user.id} />
      ))} */}
      {users}
    </>
  );
}
