import React, { Component, createRef } from "react";
import { ExternalLink } from "react-external-link";
import GridList from "@material-ui/core/GridList";
import GridListTile from "@material-ui/core/GridListTile";
import IconButton from "@material-ui/core/IconButton";
import RoomIcon from "@material-ui/icons/Room";
import RoomOutlinedIcon from "@material-ui/icons/RoomOutlined";
// import FavoriteIcon from "@material-ui/icons/Favorite";
// import FavoriteBorderIcon from "@material-ui/icons/FavoriteBorder";
import LinkIcon from "@material-ui/icons/Link";
import InfoIcon from "@material-ui/icons/Info";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import "./Gallery.css";

class Gallery extends Component {
  constructor(props) {
    super(props);
    this.placeRef = createRef();
    this.tileRef = createRef();
    this.state = {
      width: 0,
      //tileWidth: 0,
    };
  }

  componentDidMount() {
    this.updateWindowWidth();
    window.addEventListener("resize", this.updateWindowWidth);
  }

  componentDidUpdate(prevProps) {
    let tiles = this.placeRef.current.childNodes;

    for (let i = 0; i < tiles.length; i++) {
      if (
        tiles[i].attributes["data-place"].value === this.props.selectedPlace
      ) {
        tiles[i].scrollIntoView(true);
        // tiles[i].scrollIntoView({
        //   alignToTop: true,
        //   // behavior: "smooth",
        //   //block: "center",
        // });
        //find first match only
        break;
      }
    }
  }

  updateWindowWidth = () => {
    this.setState({
      width: window.innerWidth,
    });
    //this.getTileWidth();
  };

  // getTileWidth = () => {
  //   this.setState({ tileWidth: this.tileRef.current.clientWidth });
  // };

  setColWidth = (width) => {
    if (width < 540) {
      return 2;
    } else if (width < 800) {
      return 1;
    } else if (width < 1020) {
      return 0.666;
    } else if (width < 1200) {
      return 0.5;
    } else {
      return 0.4;
    }
  };

  tallGrid = {
    flexWrap: "wrap",
    overflowY: "scroll",
    height: "100%",
    width: "100%",
  };
  shortGrid = {
    flexWrap: "nowrap",
    // overflowX: "scroll",
    height: "100%",
    width: "100%",
  };

  //revise: if will be more than 1 row, sb tall

  //unsure this is needed; outcome of setGridHeight needs to go to App.js to send to GalleryPanel && EsriMap to det those heights
  // setTileHeight = () => {
  //   let results = this.props.results;
  //   let width = this.state.width;
  //   if (width < 540) {
  //     return "100%";
  //   } else if (width < 800) {
  //     if (results.length > 2) {
  //       return "100%";
  //     } else {
  //       return "250px";
  //     }
  //   } else if (width < 1020) {
  //     if (results.length > 3) {
  //       return "100%";
  //     } else {
  //       return "250px";
  //     }
  //   } else {
  //     return "250px";
  //   }
  // };

  //narrow tile widths (just above a breakpoint) hide style OR reduce font-size
  //photos blurry at smallest window width, bc largest image width
  //all stacked gallery cb tallgrid
  //revisit eliminating style conditional--replace with long title slice func

  //in App, state.gridType incorrectly listed as "tall" when 5 results on wide screen
  //this.props.setGridType running onLoad (why set as tall) but not being updated with new search. In CDU = error in EsriMap
  //map won't rerender if state.gridType changes?
  //if not fully re-rendered, 5 images not filling full screen--not getting cols?
  //if

  render() {
    const cols = this.setColWidth(this.state.width);

    //const tileHeight = this.props.results.length > 5 ? "250px" : "100%";
    const tileHeight = this.props.gridType === "tall" ? "250px" : "100%";

    // const gridStyle =
    //   this.props.results.length > 5 ? this.tallGrid : this.setGridHeight();

    const gridStyle =
      this.props.gridType === "tall" ? this.tallGrid : this.shortGrid;

    return (
      <div>
        <GridList ref={this.placeRef} className="gridList" style={gridStyle}>
          {this.props.results.map((result) => (
            <GridListTile
              key={result.aic_id}
              style={{ height: `${tileHeight}` }}
              cols={cols}
              data-place={result.place_of_origin}
              ref={this.tileRef}
              //onLoad={this.getTileWidth}
              // onLoad={() =>
              //   this.props.setGridType(this.tileRef.current.clientWidth)
              // }
            >
              <img
                className="gridListImg"
                src={`${result.thumbnailUrl}/square/325,/0/default.jpg`}
                alt={`${result.artist_title}. ${result.title}. ${result.date_start}. The Art Institute of Chicago.`}
              />
              <div
                className={
                  this.props.detailItems.includes(result.aic_id)
                    ? "gridListTile gridListTile-full"
                    : "gridListTile gridListTile-info-only"
                }
              >
                <div
                  className={
                    this.props.detailItems.includes(result.aic_id)
                      ? "tile-info"
                      : "tile-info hidden"
                  }
                >
                  <p className="tile-details">
                    {result.artist_title}
                    <span style={{ padding: "0 10px" }}>|</span>
                    {result.place_of_origin}
                  </p>
                  <p className="tile-title">{result.title}</p>
                  <p className="tile-details">
                    {result.classification_title}
                    {result.style_title && this.state.tileWidth > 270
                      ? " | " + result.style_title
                      : null}
                  </p>
                  <p className="tile-details">{result.date_start}</p>
                </div>
                <div className="tile-icons">
                  <IconButton
                    title="Highlight Place"
                    onClick={() =>
                      this.props.toggleSelectedPlace(result.place_of_origin)
                    }
                  >
                    {/* condition doesn't allow for toggle on/off of icon */}
                    {result.place_of_origin === this.props.selectedPlace ? (
                      <RoomIcon style={{ color: "yellow" }} />
                    ) : (
                      <RoomOutlinedIcon style={{ color: "white" }} />
                    )}
                  </IconButton>
                  {/* <IconButton
                    title="Add/Remove Favorite"
                      style={{ color: "white" }}
                      className={
                        this.props.detailItems.includes(result.aic_id)
                          ? ""
                          : "hidden"
                      }
                    >
                      <FavoriteBorderIcon />
                    </IconButton> */}
                  <IconButton
                    title="AIC Webpage"
                    className={
                      this.props.detailItems.includes(result.aic_id)
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
                    aria-label="Show/Hide Details"
                    title="Show/Hide Details"
                    style={{ color: "white" }}
                    onClick={() => {
                      this.props.toggleTileDetails(result.aic_id);
                    }}
                  >
                    {this.props.detailItems.includes(result.aic_id) ? (
                      <InfoIcon />
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
