import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./vote.modules.css";

interface VoteProps {
  id: string;
}

export default function Vote({ id }: VoteProps) {
  const [votesFor, setVotesFor] = useState(0);
  const [votesAgainst, setVotesAgainst] = useState(0);
  const [hasVoted, setHasVoted] = useState<"for" | "against" | null>(null);
  const [voteId, setVoteId] = useState<number | null>(null);

  useEffect(() => {
    //pas d'exécution si

    const fetchVotes = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/vote/${voteId}`,
        );
        if (response.ok) {
          const voteData = await response.json();

          setVotesFor(voteData.votesFor || 0);
          setVotesAgainst(voteData.votesAgainst || 0);
        }
      } catch (error) {
        console.error("Erreur lors de la récupération des votes :", error);
      }
    };

    const checkUserVote = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/vote/check/${id}`,
        );
        if (response.ok) {
          const existingVote = await response.json();

          setVoteId(existingVote.id);
          setHasVoted(existingVote.state ? "for" : "against");
        } else {
          console.info("Aucun vote trouvé pour cette décision.");
          setVoteId(null);
          setHasVoted(null);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la récupération du vote utilisateur :",
          error,
        );
        toast.error("Erreur lors de la récupération du vote utilisateur.");
      }
    };

    checkUserVote();
    fetchVotes();
  }, [id, voteId]);

  const submitVote = async (state: boolean) => {
    try {
      let url: string;
      let method: string;

      if (voteId === null) {
        url = `${import.meta.env.VITE_API_URL}/api/vote`;
        method = "POST";
      } else {
        url = `${import.meta.env.VITE_API_URL}/api/vote/${voteId}`;
        method = "PUT";
      }

      const response = await fetch(url, {
        method: method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          decision_id: id,
          state: state,
          user_id: 1,
        }),
      });

      if (!response.ok) {
        toast.error("Erreur lors de l'enregistrement du vote.");
        return;
      }

      toast.success(
        `Vote ${voteId === null ? "enregistré" : "modifié"} avec succès!`,
      );
      setHasVoted(state ? "for" : "against");

      if (voteId === null) {
        const res = await response.json();
        setVoteId(res.insertId);
      }
    } catch (error) {
      console.error("Erreur réseau :", error);
      toast.error("Erreur de connexion au serveur.");
    }
  };

  return (
    <div>
      <h2>Votez :</h2>
      <p>Votes Pour : {votesFor}</p>
      <p>Votes Contre : {votesAgainst}</p>

      <button
        type="button"
        className={`toggle-button ${hasVoted === "for" ? "active-positive" : "active-negative"}`}
        onClick={() => submitVote(hasVoted !== "for")}
      >
        <div className="toggle-circle">.</div>
        <span className="toggle-label">
          {hasVoted === "for" ? "Pour" : "Contre"}
        </span>
      </button>
    </div>
  );
}
