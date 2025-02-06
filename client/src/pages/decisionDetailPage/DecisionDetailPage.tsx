import { useParams } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import DecisionDetail from "../../components/decisionDetail/DecisionDetail";
import NavBar from "../../components/navBar/NavBar";
import Vote from "../../components/vote/vote";
export default function DecisionDetailPage() {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Erreur, saississez un id valide</div>;
  }

  return (
    <div>
      <NavBar />
      <DecisionDetail id={id} />
      <Vote />
      <ToastContainer />
    </div>
  );
}
