import React, { Component } from "react";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Gallery from "./Gallery";
import "./GalleryPanel.css";
import "./global.css";

class GalleryPanel extends Component {
  render() {
    const tallGrid = {
      height: this.props.mainHeight * 0.55 + "px",
    };
    const shortGrid = {
      height: this.props.mainHeight * 0.4 + "px",
      display: "flex",
    };
    const gridHeight = this.props.gridType === "tall" ? tallGrid : shortGrid;

    return (
      <div className="GalleryPanel" style={gridHeight}>
        {this.props.results.length ? (
          <div className="toggle-all-details">
            <IconButton
              aria-label={
                this.props.showAllDetails
                  ? "Hide all details"
                  : "Show all details"
              }
              title={
                this.props.showAllDetails
                  ? "Hide all details"
                  : "Show all details"
              }
              className="infoAllBtn"
              style={{ padding: "10px" }}
              onClick={this.props.toggleAllDetails}
            >
              {this.props.showAllDetails ? (
                <InfoIcon className="show-all-icon" />
              ) : (
                <InfoOutlinedIcon className="show-all-icon" />
              )}
            </IconButton>
          </div>
        ) : (
          ""
        )}

        {this.props.results.length ? (
          <Gallery
            results={this.props.results}
            showAllDetails={this.props.showAllDetails}
            detailItems={this.props.detailItems}
            toggleTileDetails={this.props.toggleTileDetails}
            selectPlace={this.props.selectPlace}
            selectedPlace={this.props.selectedPlace}
            removeSelectedPlace={this.props.removeSelectedPlace}
            toggleSelectedPlace={this.props.toggleSelectedPlace}
            gridType={this.props.gridType}
            windowWidth={this.props.windowWidth}
          />
        ) : (
          this.props.searchMade &&
          this.props.mapLoaded && (
            <div className="noresults-msg-wrapper">
              <div>
                <p>No results.</p>
                <p className="noresults-sugg">
                  Psst! Try changing or widening the year range.
                </p>
              </div>
            </div>
          )
        )}
      </div>
    );
  }
}

export default GalleryPanel;
