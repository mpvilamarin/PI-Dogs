import { Link } from "react-router-dom";
import style from "../Landing/Landing.module.css";
import LandingDog from "../../assets/LandingDog.jpg";

const Landing = () => {
  return (
    <div className={style.container}>
      <div className={style.background} style={{ backgroundImage: `url(${LandingDog})` }}></div>
      <div className={style.overlay}></div>
      <div className={style.content}>
        <h1 className={style.title}>Welcome to KodaBase</h1>
        <Link to="/home" className={style.link}>
          <button className={`${style.button} ${style.enterButton}`}>Enter</button>
        </Link>
      </div>
    </div>
  );
};

export default Landing;