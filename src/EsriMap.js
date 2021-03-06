import React, { Component, createRef } from "react";
import { loadMap } from "./utils/map";
import { loadHome } from "./utils/home";
import { loadLayer } from "./utils/layer";
import { setGraphics } from "./utils/graphics";
import { getFlags } from "./utils/helpers.js";
import { places } from "./utils/places_list.js";
import "./EsriMap.css";
import { sampleArtwork } from "./utils/sampleArtwork";

//inside CDU, were getting overwritten each update. Elsewhere, weren't accessible
let highlight;
let mapClickListener;

class EsriMap extends Component {
  constructor(props) {
    super(props);
    this.mapDiv = createRef();
  }

  componentDidMount() {
    // use the ref as a container
    const container = this.mapDiv.current;
    loadMap(container).then((view) => {
      this._view = view; // hold on to the view for later
      loadHome(view);
      this.props.setSampleArtwork(sampleArtwork);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.results !== prevProps.results) {
      this.props.selectedPlace && this.props.removeSelectedPlace();

      //so click listeners don't accumulate with ea Update & run multiple times
      if (mapClickListener) {
        mapClickListener.remove();
      }

      if (this._view) {
        //existing map points removed, whether next search has results or not
        let layer = "";
        layer = this._view.map.layers.getItemAt(0);
        if (layer) {
          this._view.map.remove(layer);
        }

        setGraphics(this.props.results)
          .then((graphicsArr) => {
            return (layer = loadLayer(graphicsArr));
          })
          .then((layer) => {
            if (this.props.windowWidth < 1200) {
              this._view.goTo({ zoom: 1 });
            } else {
              this._view.goTo({ zoom: 2 });
            }
            this._view.map.add(layer);
            this._view.whenLayerView(layer).then((layerView) => {
              //for loading-spinner & to delay no results msg in GalleryPanel from loading, until it's known if there are actually no results (no flash)
              this.props.onMapLoad(true);

              const mapMoveHandler = (event) => {
                this._view.hitTest(event).then((response) => {
                  if (response.results.length) {
                    const feature = response.results[0].graphic;
                    let { latitude, longitude } = feature.attributes;
                    let mapSelectedPlace = feature.attributes.place_of_origin;

                    this._view.popup.location = {
                      latitude: latitude,
                      longitude: longitude,
                    };
                    this._view.popup.title = getFlags(mapSelectedPlace, places);
                    this._view.popup.visible = true;
                  } else {
                    this._view.popup.visible = false;
                  }
                });
              };

              const mapClickHandler = (event) => {
                if (highlight) {
                  highlight.remove();
                }

                this._view.hitTest(event).then((response) => {
                  if (response.results.length) {
                    const feature = response.results[0].graphic;
                    let { latitude, longitude } = feature.attributes;
                    let mapSelectedPlace = feature.attributes.place_of_origin;

                    this._view.popup.location = {
                      latitude: latitude,
                      longitude: longitude,
                    };
                    this._view.popup.title = getFlags(mapSelectedPlace, places);
                    this._view.popup.visible = true;

                    if (this.props.selectedPlace === mapSelectedPlace) {
                      if (highlight) {
                        highlight.remove();
                      }
                      this.props.removeSelectedPlace();
                    } else if (this.props.selectedPlace !== mapSelectedPlace) {
                      this.props.selectPlace(mapSelectedPlace);
                      this.props.selectOnMap();
                      highlight = layerView.highlight(feature);
                    }
                  } else {
                    if (this._view.popup.visible) {
                      this._view.popup.visible = false;
                    }
                    if (this.props.selectedPlace !== "") {
                      this.props.removeSelectedPlace();
                    }
                  }
                });
                // can't remove mapClickListener inside this func, bc disables toggle
              };

              //formerly let mapMoveListener
              this._view.on("pointer-move", mapMoveHandler);

              mapClickListener = this._view.on(
                "immediate-click",
                mapClickHandler
              );
              //end when layerView
            });
            //end prevProps.results
          });
        //end this._view
      }
    }

    if (this.props.selectedPlace !== prevProps.selectedPlace) {
      if (this._view) {
        const layer = this._view.map.layers.getItemAt(0);
        this._view.whenLayerView(layer).then((layerView) => {
          let query = layer.createQuery();
          let queryString = `place_of_origin = '${this.props.selectedPlace}'`;
          query.where = queryString;
          layer.queryFeatures(query).then((result) => {
            //popup on highlighted map point; disappears if cursor enters map
            if (result.features.length) {
              let feature = result.features[0];
              let { latitude, longitude } = feature.attributes;
              let mapSelectedPlace = feature.attributes.place_of_origin;

              this._view.popup.location = {
                latitude: latitude,
                longitude: longitude,
              };
              this._view.popup.title = getFlags(mapSelectedPlace, places);
              this._view.popup.visible = true;
            } else {
              if (this._view.popup.visible) {
                this._view.popup.visible = false;
              }
              if (this.props.selectedPlace !== "") {
                this.props.removeSelectedPlace();
              }
            }

            if (highlight) {
              highlight.remove();
            }
            highlight = layerView.highlight(result.features);
          });
          //whenLayerView
        });
        //this._view
      }
      //props.selectedPlace
    }
    //CDU
  }

  componentWillUnmount() {
    if (this._view) {
      this._view.container = null;
      delete this._view;
    }
  }
  render() {
    const tallGridHeight = this.props.mainHeight * 0.45;
    const shortGridHeight = this.props.mainHeight * 0.6;
    const gridHeight =
      this.props.gridType === "tall" ? tallGridHeight : shortGridHeight;

    return (
      <div
        className="esri-map"
        style={{ height: `${gridHeight}px` }}
        ref={this.mapDiv}
      >
        <div className={`${!this.props.mapLoaded && "loading-spinner"}`}></div>
      </div>
    );
  }
}

export default EsriMap;
