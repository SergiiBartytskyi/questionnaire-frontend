import { NavLink } from "react-router-dom";
import styles from "./HomePage.module.css";

const HomePage = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <h1>Welcome to Questionnaire Builder App</h1>
        <p>To go to the catalogue page, click</p>
        <NavLink to="/catalog" className={styles.br}>
          here
        </NavLink>
      </div>
    </section>
  );
};

export default HomePage;
