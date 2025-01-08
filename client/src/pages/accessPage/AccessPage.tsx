import styles from "./accessPage.module.css";
import LoginForm from "../../components/loginForm/LoginForm";

export default function LoginPage() {
  return (
    <main className={styles.container}>
      <LoginForm />
    </main>
  );
}
