import { useState } from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function Vote() {
  const [votesFor, setVotesFor] = useState(0);
  const [votesAgainst, setVotesAgainst] = useState(0);
  const [hasVoted, setHasVoted] = useState<null | "for" | "against">(null);

  const submitVote = async (state: boolean) => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/vote`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          decision_id: 1,
          state: state,
          user_id: 1, // ID utilisateur à remplacer dynamiquement
        }),
      });

      //   const responseData = await response.json();

      //   console.log("reponse backend", responseData);

      if (response.ok) {
        //est ce que lerreur 403 du back est considéré comme ok à false ?? A VERIFIER
        toast.success("Vote enregistré avec succès !");
      } else {
        toast.error("Erreur lors de l'enregistrement du vote.");
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      toast.error("Erreur de connexion au serveur.");
    }
  };

  const handleVoteFor = () => {
    if (hasVoted === "for") {
      // L'utilisateur a déjà voté "Pour", on retire le vote
      setVotesFor(votesFor - 1);
      setHasVoted(null);
      submitVote(false); // Retirer le vote avec état false
      toast.info("Votre vote POUR a été retiré.");
    } else if (hasVoted === "against") {
      // L'utilisateur avait voté "Contre", on retire ce vote et on ajoute un vote "Pour"
      setVotesAgainst(votesAgainst - 1);
      setVotesFor(votesFor + 1);
      setHasVoted("for");
      submitVote(true); // Enregistrer le nouveau vote
      toast.success("Vous avez changé votre vote POUR !");
    } else {
      // Aucun vote précédent, on ajoute un vote "Pour"
      setVotesFor(votesFor + 1);
      setHasVoted("for");
      submitVote(true); // Enregistrer le nouveau vote
      toast.success("Vous avez voté POUR !");
    }
  };

  const handleVoteAgainst = () => {
    if (hasVoted === "against") {
      // L'utilisateur a déjà voté "Contre", on retire le vote
      setVotesAgainst(votesAgainst - 1);
      setHasVoted(null);
      submitVote(false); // Retirer le vote avec état false
      toast.info("Votre vote CONTRE a été retiré.");
    } else if (hasVoted === "for") {
      // L'utilisateur avait voté "Pour", on retire ce vote et on ajoute un vote "Contre"
      setVotesFor(votesFor - 1);
      setVotesAgainst(votesAgainst + 1);
      setHasVoted("against");
      submitVote(false); // Enregistrer le nouveau vote
      toast.error("Vous avez changé votre vote CONTRE !");
    } else {
      // Aucun vote précédent, on ajoute un vote "Contre"
      setVotesAgainst(votesAgainst + 1);
      setHasVoted("against");
      submitVote(false); // Enregistrer le nouveau vote
      toast.error("Vous avez voté CONTRE !");
    }
  };

  return (
    <div>
      <h2>Votez :</h2>
      <p>Votes Pour : {votesFor}</p>
      <p>Votes Contre : {votesAgainst}</p>

      <button
        type="button"
        onClick={handleVoteFor}
        disabled={hasVoted === "against"} // Désactive le bouton si l'utilisateur a voté "Contre"
      >
        Voter Pour
      </button>

      <button
        type="button"
        onClick={handleVoteAgainst}
        disabled={hasVoted === "for"} // Désactive le bouton si l'utilisateur a voté "Pour"
      >
        Voter Contre
      </button>
    </div>
  );
}
