import React from "react";
import { loadMap } from "./utils/map";
import { loadHome } from "./utils/home";
import { loadLayer } from "./utils/layer";
import { setGraphics } from "./utils/graphics";
import { getFlags } from "./utils/helpers.js";
import { places } from "./utils/places_list.js";
import "./EsriMap.css";
import { sampleArtwork } from "./utils/sampleArtwork.js";

// function themeToBasemap(theme) {
//   return theme === "light" ? "gray" : "dark-gray";
// }

class EsriMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapDiv = React.createRef();
  }

  componentDidMount() {
    const { onLoad } = this.props;
    // use the ref as a container
    const container = this.mapDiv.current;
    // const basemap = themeToBasemap(theme);

    loadMap(container).then((view) => {
      this._view = view; // hold on to the view for later
      onLoad && onLoad();
      loadHome(view);
      let resultsLayer = "";
      //loads sampleArtwork on initial load
      setGraphics(sampleArtwork)
        .then((graphicsArr) => {
          return (resultsLayer = loadLayer(graphicsArr));
        })
        .then((resultsLayer) => {
          view.map.add(resultsLayer);
          console.log("resultsLayer - CDM");
          this.props.setSampleArtwork(sampleArtwork);
        });
    });
    //end loadMap
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.theme !== prevProps.theme) {
  //     if (this._view) {
  //       const basemap = themeToBasemap(this.props.theme);
  //       this._view.map.basemap = basemap;
  //     }
  //   }
  // }

  // componentDidUpdate(prevProps) {
  //   if (this.props.results !== prevProps.results) {
  //     if (this._view) {
  //       //result arr converted to graphics arr, graphics arr added to layer.source, layer added to map
  //       this._view.map.removeAll();
  //       setGraphics(this.props.results).then((graphicsArr) => {
  //         const resultsLayer = loadLayer(graphicsArr);
  //         this._view.map.add(resultsLayer);
  //       });
  //     }
  //   }
  // }

  //MUST ADD query to highlight selectedPlace when the tile map icon is clicked

  componentDidUpdate(prevProps) {
    if (this.props.results !== prevProps.results) {
      if (this._view) {
        //result arr converted to graphics arr, graphics arr added to layer.source, layer added to map
        this._view.map.removeAll();
        this.props.selectedPlace && this.props.removeSelectedPlace();
        let resultsLayer = "";
        setGraphics(this.props.results)
          .then((graphicsArr) => {
            return (resultsLayer = loadLayer(graphicsArr));
          })
          .then((resultsLayer) => {
            this._view.map.add(resultsLayer);
            console.log("resultsLayer - CDU");
            this._view.whenLayerView(resultsLayer).then(
              (resultsLayerView) => {
                console.log("we have the layer view.");

                const highlightPoint = (place, layer, layerView) => {
                  console.log("in highlightPoint");
                  let query = layer.createQuery();
                  let queryString = "place_of_origin = " + "'" + place + "'";
                  query.where = queryString;
                  layer.queryFeatures(query).then((result) => {
                    if (highlight) {
                      highlight.remove();
                    }
                    highlight = layerView.highlight(result.features);
                  });
                };

                //not changing state--click on Tile is doing that
                //click on tile > if point is highlighted, unhighlight / if point is not highlighted, highlight
                //this func needs to get Place from Tile (multiple Tiles have same Place)
                // if (this.props.selectedPlace !== prevProps.selectedPlace) {
                highlightPoint(
                  this.props.selectedPlace,
                  resultsLayer,
                  resultsLayerView
                );
                //}

                this._view.on("pointer-move", (event) => {
                  this._view.hitTest(event).then((response) => {
                    if (response.results.length) {
                      const feature = response.results[0].graphic;
                      let { latitude, longitude } = feature.attributes;
                      let mapSelectedPlace = feature.attributes.place_of_origin;

                      this._view.popup.location = {
                        latitude: latitude,
                        longitude: longitude,
                      };
                      this._view.popup.title = getFlags(
                        mapSelectedPlace,
                        places
                      );
                      this._view.popup.visible = true;
                    } else {
                      this._view.popup.visible = false;
                    }
                  });
                });

                let highlight;
                let feature;
                this._view.on("click", (event) => {
                  //console.log("point click");
                  //so multiple points not highlighted at once; if the ability to toggle off when clicking on a selected/highlighted point worked, could move this to "if (response.results.length)" else
                  if (highlight) {
                    highlight.remove();
                  }
                  this._view.hitTest(event).then((response) => {
                    //console.log("point hitTest");
                    if (response.results.length) {
                      // console.log("response.resultz:", response.results);
                      feature = response.results[0].graphic;
                      let { latitude, longitude } = feature.attributes;
                      let mapSelectedPlace = feature.attributes.place_of_origin;

                      this._view.popup.location = {
                        latitude: latitude,
                        longitude: longitude,
                      };
                      this._view.popup.title = getFlags(
                        mapSelectedPlace,
                        places
                      );
                      this._view.popup.visible = true;

                      //this section correctly toggles highlight & selected place  on/off when the same point is clicked. But because click & hitTest each run 2x for API results, always finds a match on the second run & removes highlight & selected place.
                      // if (this.props.selectedPlace === mapSelectedPlace) {
                      //   console.log("MATCH");
                      //   if (highlight) {
                      //     highlight.remove();
                      //   }
                      //   this.props.removeSelectedPlace();
                      // } else if (
                      //   this.props.selectedPlace !== mapSelectedPlace
                      // ) {
                      //   this.props.selectPlace(mapSelectedPlace);
                      //   highlight = resultsLayerView.highlight(feature);
                      // }

                      this.props.selectPlace(mapSelectedPlace);
                      highlight = resultsLayerView.highlight(feature);
                    } else {
                      if (this._view.popup.visible) {
                        this._view.popup.visible = false;
                      }
                      if (this.props.selectedPlace !== "") {
                        this.props.removeSelectedPlace();
                      }
                    }
                    //end hitTest
                  });
                  //end on click
                });
                //end then((resultsLayerView) 2
              },
              (error) => {
                console.log("we dont have the layer view: ", error);
              }
              //end then((resultsLayerView) 1
            );
            //end then((resultsLayer)
          });
      }
    }
  }

  componentWillUnmount() {
    if (this._view) {
      this._view.container = null;
      delete this._view;
    }
  }
  render() {
    console.log("render");
    return <div className="esri-map" ref={this.mapDiv} />;
  }
}

export default EsriMap;
