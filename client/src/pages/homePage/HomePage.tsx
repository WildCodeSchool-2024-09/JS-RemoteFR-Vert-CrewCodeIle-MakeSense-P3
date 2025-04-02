import style from "./homePage.module.css";
import logo from "../../assets/images/logo.png";
// type Decision = {
//   id: number;
//   title: string;
// };

export default function HomePage() {
  // const [decisionList, setDecisionList] = useState([] as Decision[]);

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_API_URL}/api/decisions`)
  //     .then((response) => response.json())
  //     .then((data: Decision[]) => {
  //       setDecisionList(data);
  //     });
  // }, []);

  return (
    <>
      <section>
        {/* <ul className={style.decisioncontainer}>
          {decisionList.map((decision) => (
            <li key={decision.id}>
              <Link to={`/decisions/${decision.id}`}>{decision.title}</Link>
            </li>
          ))}
        </ul> */}

        <article className={style.container}>
          <h1> Intra Net </h1>
          <h2>Bienvenue sur</h2>
          <img src={logo} alt="Logo Intra Sense" className={style.logo} />
        </article>
      </section>
    </>
  );
}
