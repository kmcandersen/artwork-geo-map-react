import React, { Component, createRef } from "react";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import Gallery from "./Gallery";
import "./GalleryPanel.css";

class GalleryPanel extends Component {
  constructor(props) {
    super(props);
    this.galleryPanelRef = createRef();
    this.state = {
      detailItems: [],
    };
  }

  componentDidUpdate(prevProps) {
    if (this.props.results !== prevProps.results) {
      this.props.setGridType(this.galleryPanelRef.current.clientWidth);
      console.log(
        "galleryPanelWidth GP",
        this.galleryPanelRef.current.clientWidth
      );
    }
  }

  toggleAllDetails = () => {
    //if showAllDetails = false, = true & loop thru all results & put them in state.detailItem arr
    //if showAllDetails = true, = false & remove all items from arr
    if (!this.props.showAllDetails) {
      let showIds = [];
      this.props.results.forEach((r) => {
        showIds.push(r.aic_id);
      });
      this.setState({ detailItems: showIds });
    }
    if (this.props.showAllDetails) {
      this.setState({ detailItems: [] });
    }
    this.props.toggleAllDetailsState();
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
      <div
        //
        className={`GalleryPanel ${
          this.props.gridType === "tall" ? "tall-grid" : "short-grid"
        }`}
        ref={this.galleryPanelRef}
      >
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
              onClick={this.toggleAllDetails}
            >
              {this.props.showAllDetails ? (
                <InfoIcon className="infoIcon" />
              ) : (
                <InfoOutlinedIcon className="infoIcon" />
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
            detailItems={this.state.detailItems}
            toggleTileDetails={this.toggleTileDetails}
            selectPlace={this.props.selectPlace}
            selectedPlace={this.props.selectedPlace}
            removeSelectedPlace={this.props.removeSelectedPlace}
            toggleSelectedPlace={this.props.toggleSelectedPlace}
            gridType={this.props.gridType}
            // setGridType={this.props.setGridType}
          />
        ) : (
          this.props.searchMade &&
          this.props.mapResultsLoaded && (
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
