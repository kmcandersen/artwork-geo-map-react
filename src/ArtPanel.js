import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import Gallery from "./Gallery";
import "./ArtPanel.css";

class ArtPanel extends Component {
  render() {
    return (
      <div className="ArtPanel">
        <Gallery results={this.props.results} />
      </div>
    );
  }
}

export default ArtPanel;
