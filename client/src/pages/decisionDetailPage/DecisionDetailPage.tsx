import { useParams } from "react-router-dom";
// import AnimatorsList from "../../components/animatorsList/AnimatorsList";
import CommentsList from "../../components/commentsList/CommentsList";
import DecisionDetail from "../../components/decisionDetail/DecisionDetail";
import NavBar from "../../components/navBar/NavBar";
import PostCommentDecision from "../../components/postCommentDecision.ts/PostCommentDecision";

export default function DecisionDetailPage() {
  const { id } = useParams<string>();

  if (!id) {
    return <div>Erreur, saississez un id valide</div>;
  }

  return (
    <div>
      <NavBar />
      <DecisionDetail id={id} />
      <PostCommentDecision id={id} />
      <CommentsList id={id} />
      {/* <AnimatorsList id={id} /> */}
    </div>
  );
}
