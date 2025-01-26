import { NavLink } from "react-router-dom";
import style from "../applicantPage/applicantPage.module.css";

function ApplicantPage() {
  return (
    <>
      <h1 className={style.applicantTitle}>En attente de validation</h1>
      <div className={style.gif}>
        <img src="applicantpage.gif" alt="GIF makeSense" />
      </div>
      <p className={style.textApplicant}>
        Votre inscription est en attente de validation par l'équipe
        d'administration
      </p>
      <div className={style.sectionButton}>
        <button className={style.buttonContactAdmin} type="button">
          <a href="mailto:admin@gmail.com?subject=Sujet%20du%20mail&body=Contenu%20du%20message">
            Contactez un administrateur
          </a>
        </button>
        <button className={style.buttonLoginPage} type="button">
          <NavLink to={"/"}>Page de connexion</NavLink>
        </button>
      </div>
    </>
  );
}

export default ApplicantPage;
