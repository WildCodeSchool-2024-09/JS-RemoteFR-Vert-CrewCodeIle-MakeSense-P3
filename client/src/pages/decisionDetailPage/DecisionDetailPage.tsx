import { useParams } from "react-router-dom";
import DecisionDetail from "../../components/decisionDetail/DecisionDetail";
import NavBar from "../../components/navBar/NavBar";

export default function DecisionDetailPage() {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Erreur, saississez un id valide</div>;
  }

  return (
    <div>
      <NavBar />
      <DecisionDetail id={id} />
    </div>
  );
}
