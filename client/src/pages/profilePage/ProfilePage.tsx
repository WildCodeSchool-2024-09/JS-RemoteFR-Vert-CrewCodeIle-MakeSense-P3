import ModifyPassword from "../../components/modifyPassword/ModifyPassword";
import Profile from "../../components/profile/Profile";
import style from "./profilePage.module.css";

export default function ProfilePage() {
  return (
    <section className={style.pageContainer}>
      <section className={style.card}>
        <section className={style.section}>
          <Profile />
        </section>
        <section className={style.section}>
          <ModifyPassword />
        </section>
      </section>
    </section>
  );
}
