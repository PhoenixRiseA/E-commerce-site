import classes from "./Home.module.css";
import { Fragment } from "react";
const Home = () => {
  return (
    <Fragment>
      <h1 className={classes.h1}>Welcome</h1>
      <p>
        Here you can find all the colors you need. We worked really hard to
        bring you products of different colors. Every single person worked hard
        to bring you these products, Yes, every single one of them(a whole tech
        community trying to get a job that is!). We hope the products are to
        your liking.
      </p>
    </Fragment>
  );
};
export default Home;
