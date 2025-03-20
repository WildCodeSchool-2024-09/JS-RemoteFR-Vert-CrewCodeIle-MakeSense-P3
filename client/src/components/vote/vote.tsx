import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import "./vote.modules.css";
import { useOutletContext } from "react-router-dom";

interface VoteProps {
  id: string;
}

export default function Vote({ id }: VoteProps) {
  const { auth } = useOutletContext() as {
    auth: Auth | null;
  };
  // const [votesFor, setVotesFor] = useState(0);
  // const [votesAgainst, setVotesAgainst] = useState(0);
  const [hasVoted, setHasVoted] = useState<"for" | "against" | null>(null);
  const [voteId, setVoteId] = useState<number | null>(null);

  useEffect(() => {
    //pas d'exécution si

    const checkUserVote = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_API_URL}/api/vote/check/${id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${auth?.token}`, // Inclusion du jeton JWT
            },
          },
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
    console.info(auth?.token);
  }, [id, auth?.token]);

  const submitVote = async (state: boolean) => {
    if (auth == null) {
      throw new Error("go to login");
    }

    try {
      const user_id = auth.credentials.id;
      if (user_id === undefined || user_id === null) {
        console.error("erreur l'id de l'utilisateur est introuvable");
        return;
      }
      let url: string;
      let method: string;

      if (voteId === null) {
        url = `${import.meta.env.VITE_API_URL}/api/vote`;
        method = "POST";
      } else {
        url = `${import.meta.env.VITE_API_URL}/api/vote/${voteId}`;
        method = "PUT";
      }

      console.info(auth.token);
      const response = await fetch(url, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.token}`, // Inclusion du jeton JWT
        },

        body: JSON.stringify({
          decision_id: id,
          state: state,
          user_id: user_id, // utilisation de l'id user recupéré
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
      {/* <p>Votes Pour : {votesFor}</p>
      <p>Votes Contre : {votesAgainst}</p> */}

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
