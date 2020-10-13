import React from "react";
import "./Intro.css";

const Intro = () => {
  return (
    <div className="panel">
      <div className="intro-msg">
        <p>
          Enter a year range to generate a selection of random artwork from the{" "}
          <a href="https://www.artic.edu/">Art Institute of Chicago's</a>{" "}
          collection. Place familiar works and artists in their historical
          contexts, and see art and styles from around the world that you might
          not be familiar with (yet).
        </p>
      </div>
      <div></div>
    </div>
  );
};

export default Intro;
