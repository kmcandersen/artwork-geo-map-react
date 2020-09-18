import React, { Component } from "react";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import "./Gallery.css";

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
                alt={result.title}
              />
              <GridListTileBar
                title={result.title}
                titlePosition="bottom"
                // actionIcon={
                //   <IconButton
                //     aria-label={`info about ${result.title}`}
                //     className="icon"
                //   >
                //     <InfoIcon />
                //   </IconButton>
                // }
              />
            </GridListTile>
          ))}
        </GridList>
      </div>
    );
  }
}

export default Gallery;
