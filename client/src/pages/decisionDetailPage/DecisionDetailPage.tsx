import { useParams } from "react-router-dom";
import CommentsList from "../../components/commentsList/CommentsList";
import DecisionDetail from "../../components/decisionDetail/DecisionDetail";
import NavBar from "../../components/navBar/NavBar";
import PostCommentNoVote from "../../components/postCommentNoVote.ts/PostCommentDecision";

export default function DecisionDetailPage() {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Erreur, saississez un id valide</div>;
  }

  return (
    <div>
      <NavBar />
      <DecisionDetail id={id} />
      <PostCommentNoVote />
      <CommentsList id={id} />
    </div>
  );
}
