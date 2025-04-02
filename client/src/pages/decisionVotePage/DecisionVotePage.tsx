import { useParams, useOutletContext } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import Vote from "../../components/vote/vote";
import style from "./decisionVotePage.module.css";
export default function DecisionVotePage() {
  const { id } = useParams<{ id: string }>();
  console.log("id récupéré decision vote page", id);
  const { auth } = useOutletContext() as {
    auth: Auth | null;
  };
  console.log("toekn evoyé depuis vote", auth?.token);

  if (!id) {
    return <div>Erreur : ID de décision introuvable</div>;
  }

  return (
    <section className={style.voteContainer}>
      <article className={style.voteBox}>
        <h2 className={style.title}>Voter pour la décision #{id}</h2>{" "}
        {auth ? (
          <Vote id={id} />
        ) : (
          <p className={style.loginMessage}>Connectez-vous pour voter.</p>
        )}{" "}
        <ToastContainer />{" "}
      </article>
    </section>
  );
}
