import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Gallery from "./Gallery";
import "./ArtPanel.css";

class ArtPanel extends Component {
  state = {
    displayInfo: false,
  };

  toggleInfo = () => {
    this.setState({ displayInfo: !this.state.displayInfo });
  };

  render() {
    return (
      <div className="ArtPanel">
        <div>
          <IconButton
            aria-label={
              this.state.displayInfo ? "hide all details" : "show all details"
            }
            onClick={this.toggleInfo}
          >
            {this.state.displayInfo ? <InfoIcon /> : <InfoOutlinedIcon />}
          </IconButton>
        </div>
        <Gallery
          results={this.props.results}
          displayInfo={this.state.displayInfo}
          toggleInfo={this.toggleInfo}
        />
      </div>
    );
  }
}

export default ArtPanel;
