import React, { Component } from "react";
import { ExternalLink } from "react-external-link";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LinkIcon from "@material-ui/icons/Link";
import InfoIcon from "@material-ui/icons/Info";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import "./Gallery.css";
import { capitalize } from "./utils/helpers.js";

class Gallery extends Component {
  state = {
    showTileDetails: [],
  };

  //would like to be able to hide details on indiv tiles when they were displayed by ALL icon
  //toggleAllDetails method in ArtPanel adds/removes IDs from the same array as toggleTileDetails
  //could simplify the className conditionals

  toggleTileDetails = (id) => {
    console.log(typeof id);
    //if id in arr, remove it
    //if id not in arr, add it
    //presence of id checked for in various className conditionals
    if (this.state.showTileDetails.includes(id)) {
      let showing = this.state.showTileDetails || [];
      let newShowing = showing.filter((t) => t !== id);
      this.setState({ showTileDetails: newShowing });
    } else if (!this.state.showTileDetails.includes(id)) {
      let showing = this.state.showTileDetails || [];
      showing.push(id);
      this.setState({ showTileDetails: showing });
    }
  };

  render() {
    // const showAllDetails = this.props.showAllDetails ? "" : "hidden";

    return (
      <div className="Gallery">
        <GridList cellHeight={300} spacing={2} className="gridList">
          {this.props.results.map((result) => (
            <GridListTile key={result.aic_id} cols={2}>
              <img
                className="gridListImg"
                src={`${result.thumbnailUrl}/full/350,/0/default.jpg`}
                alt={`${result.thumbnailUrl}. ${result.title}. ${result.date_start}. The Art Institute of Chicago.`}
              />
              <div
                className={
                  this.props.showAllDetails ||
                  this.state.showTileDetails.includes(result.aic_id)
                    ? "gridListTile gridListTile-full"
                    : "gridListTile gridListTile-info-only"
                }
                data-place={result.place_of_origin}
              >
                <div
                  className={
                    this.props.showAllDetails ||
                    this.state.showTileDetails.includes(result.aic_id)
                      ? "tile-info"
                      : "tile-info hidden"
                  }
                >
                  <p className="tile-details">
                    {result.artist_title
                      ? result.artist_title
                      : "Unknown Artist"}
                    <span style={{ padding: "0 10px" }}>|</span>
                    {result.place_of_origin}
                  </p>
                  <p className="tile-title">{result.title}</p>
                  <p className="tile-details">
                    {capitalize(result.classification_title)}
                    {result.style_title
                      ? " | " + capitalize(result.style_title)
                      : null}
                  </p>
                  <p className="tile-details">{result.date_start}</p>
                </div>
                <div className="tile-icons">
                  <IconButton
                    style={{ color: "white" }}
                    className={
                      this.props.showAllDetails ||
                      this.state.showTileDetails.includes(result.aic_id)
                        ? ""
                        : "hidden"
                    }
                  >
                    <FavoriteBorderIcon />
                  </IconButton>
                  <IconButton
                    className={
                      this.props.showAllDetails ||
                      this.state.showTileDetails.includes(result.aic_id)
                        ? ""
                        : "hidden"
                    }
                  >
                    <ExternalLink
                      href={`https://www.artic.edu/artworks/${result.aic_id}`}
                      style={{ color: "white" }}
                    >
                      <LinkIcon />
                    </ExternalLink>
                  </IconButton>

                  <IconButton
                    aria-label={
                      this.props.displayInfo
                        ? "hide tile details"
                        : "show tile details"
                    }
                    style={{ color: "white" }}
                    onClick={() => {
                      this.toggleTileDetails(result.aic_id);
                    }}
                    disabled={this.props.showAllDetails}
                  >
                    {this.props.showAllDetails ||
                    this.state.showTileDetails.includes(result.aic_id) ? (
                      <InfoIcon style={{ opacity: "40%" }} />
                    ) : (
                      <InfoOutlinedIcon />
                    )}
                  </IconButton>
                </div>
              </div>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default Gallery;
