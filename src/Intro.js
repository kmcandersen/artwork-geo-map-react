import React from "react";
import "./Intro.css";
import "./global.css";

const Intro = (props) => {
  return (
    <div className={`panel ${props.openPanel === "about" ? "" : "hidden"}`}>
      <div className="intro-msg">
        <p>
          ARTIMELINE displays artwork from around the world created during a
          selected time period. Use this app to place familiar works and artists
          in their historical contexts, and see art and styles from around the
          world that you might not be familiar with (yet). For example, you
          might recognize the work of Impressionist painters in Europe and the
          United States during the late 1800s, but ARTIMELINE can show you what
          other artists were creating at the same time.
        </p>
        <p>
          Enter a year range in the Search panel to generate a selection of
          random artwork from the 
          <a href="https://www.artic.edu/">Art Institute of Chicago's</a>{" "}
          collection. Optionally, you can focus your search on specific media.
        </p>
        <p>
          Made by <a href="https://kristenandersen.online/">Kristen Andersen</a>{" "}
          with information from the Art Institute of Chicago’s{" "}
          <a href="https://www.artic.edu/open-access/public-api">Public API</a>.
        </p>
      </div>
      <div></div>
    </div>
  );
};

export default Intro;
