import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Gallery from "./Gallery";
import "./ArtPanel.css";

class ArtPanel extends Component {
  state = {
    showAllDetails: false,
  };

  toggleAllDetails = () => {
    this.setState({ showAllDetails: !this.state.showAllDetails });
  };

  render() {
    return (
      <div className="ArtPanel">
        <div>
          <IconButton
            aria-label={
              this.state.toggleAllDetails
                ? "hide all details"
                : "show all details"
            }
            onClick={this.toggleAllDetails}
          >
            {this.state.showAllDetails ? <InfoIcon /> : <InfoOutlinedIcon />}
          </IconButton>
        </div>
        <Gallery
          results={this.props.results}
          showAllDetails={this.state.showAllDetails}
        />
      </div>
    );
  }
}

export default ArtPanel;
