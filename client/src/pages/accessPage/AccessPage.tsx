import LoginForm from "../../components/loginForm/LoginForm";
import styles from "./accessPage.module.css";

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <LoginForm />
    </main>
  );
}
