import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import ArrowForwardIcon from "@material-ui/icons/ArrowForward";
import "./Intro.css";

class Intro extends Component {
  render() {
    return (
      <div className="intro-content">
        <div className="intro-msg">
          <p>
            Enter a year range to generate a selection of random artwork from
            the <a href="https://www.artic.edu/">Art Institute of Chicago's</a>{" "}
            collection. Place familiar works and artists in their historical
            contexts, and see art and styles from around the world that you
            might not be familiar with (yet).
          </p>
        </div>
        <div className="intro-dismiss">
          <div>
            <p className="intro-dismiss-text">Get Started</p>
          </div>
          <IconButton
            title="Go to search"
            className="startBtn"
            onClick={this.props.hideIntro}
          >
            <ArrowForwardIcon />
          </IconButton>
        </div>
      </div>
    );
  }
}

export default Intro;
