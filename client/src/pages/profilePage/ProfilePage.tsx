import { useParams } from "react-router-dom";
import UserProfile from "../../components/userProfile/UserProfile";

export default function ProfilePage() {
  const { id } = useParams();
  if (!id) {
    return <div>Erreur, saississez un id valide</div>;
  }
  return (
    <>
      <UserProfile id={id} />
    </>
  );
}
