import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Gallery from "./Gallery";
import "./ArtPanel.css";

class ArtPanel extends Component {
  state = {
    showAllDetails: false,
    detailItems: [],
  };

  toggleAllDetails = () => {
    //if showAllDetails = false, = true & loop thru all results & put them in state.detailItem arr
    //if showAllDetails = true, = false & remove all items from arr
    if (!this.state.showAllDetails) {
      let showIds = [];
      this.props.results.forEach((r) => {
        showIds.push(r.aic_id);
      });
      this.setState({ showAllDetails: true, detailItems: showIds });
    }
    if (this.state.showAllDetails) {
      this.setState({ showAllDetails: false, detailItems: [] });
    }
  };

  toggleTileDetails = (id) => {
    //if id in arr, remove it
    //if id not in arr, add it
    //presence of id checked in various Gallery className conditionals
    if (this.state.detailItems.includes(id)) {
      let showing = this.state.detailItems || [];
      let newShowing = showing.filter((t) => t !== id);
      this.setState({ detailItems: newShowing });
    } else if (!this.state.detailItems.includes(id)) {
      let showing = this.state.detailItems || [];
      showing.push(id);
      this.setState({ detailItems: showing });
    }
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
          detailItems={this.state.detailItems}
          toggleTileDetails={this.toggleTileDetails}
          selectPlace={this.props.selectPlace}
          selectedPlace={this.props.selectedPlace}
          removeSelectedPlace={this.props.removeSelectedPlace}
          toggleSelectedPlace={this.props.toggleSelectedPlace}
          // togglehighlightPointFromTile={this.props.togglehighlightPointFromTile}
        />
      </div>
    );
  }
}

export default ArtPanel;
