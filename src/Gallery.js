import React, { Component } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import InfoIcon from "@material-ui/icons/Info";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import "./Gallery.css";
import { capitalize } from "./utils/helpers.js";

class Gallery extends Component {
  render() {
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
              <GridListTileBar
                className="GridListTileBar"
                data-place={result.place_of_origin}
                style={{
                  height: "100%",
                }}
                subtitle={
                  <div className="tile-subtitle">
                    <div className="tile-info">
                      <p className="tile-details">
                        {result.artist_title
                          ? result.artist_title + " "
                          : "Unknown Artist "}
                        | {result.place_of_origin}
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
                      <IconButton style={{ color: "white" }}>
                        <FavoriteBorderIcon />
                      </IconButton>
                      <IconButton
                        aria-label={
                          this.props.displayInfo
                            ? "hide tile details"
                            : "show tile details"
                        }
                        style={{ color: "white" }}
                        onClick={this.props.toggleInfo}
                      >
                        {this.props.displayInfo ? (
                          <InfoIcon />
                        ) : (
                          <InfoOutlinedIcon />
                        )}
                      </IconButton>
                    </div>
                  </div>
                }
              ></GridListTileBar>
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default Gallery;
