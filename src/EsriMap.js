import React from "react";
import { loadMap } from "./utils/map";
import { loadHome } from "./utils/home";
import { loadLayer } from "./utils/layer";
import { setGraphics } from "./utils/graphics";
import { getFlags } from "./utils/helpers.js";
import { places } from "./utils/places_list.js";
import "./EsriMap.css";

// function themeToBasemap(theme) {
//   return theme === "light" ? "gray" : "dark-gray";
// }

//All API, no sampleArtwork.

//inside CDU, was getting overwritten each update. Elsewhere, wasn't accessible
let highlight;

class EsriMap extends React.Component {
  constructor(props) {
    super(props);
    this.mapDiv = React.createRef();
  }

  componentDidMount() {
    const { onLoad } = this.props;
    // use the ref as a container
    const container = this.mapDiv.current;

    loadMap(container).then((view) => {
      this._view = view; // hold on to the view for later
      onLoad && onLoad();
      loadHome(view);
    });
  }

  componentDidUpdate(prevProps) {
    if (this.props.results !== prevProps.results) {
      this.props.selectedPlace && this.props.removeSelectedPlace();
      if (this._view) {
        //to delay no results msg in ArtPanel from loading, until it's known if there are actually no results
        this.props.setMapResultsLoad(true);
        //existing map points removed if next search = no results
        //if (!this.props.results.length) {
        let layer = "";
        layer = this._view.map.layers.getItemAt(0);
        // console.log(
        //   "CDU results lyr b remove",
        //   this._view.map.layers.items.length
        // );
        if (layer) {
          this._view.map.remove(layer);
          //layer = "";
        }
        // console.log(
        //   "CDU results lyr a remove",
        //   this._view.map.layers.items.length
        // );
        //} else {
        //let layer = "";
        setGraphics(this.props.results)
          .then((graphicsArr) => {
            return (layer = loadLayer(graphicsArr));
          })
          .then((layer) => {
            this._view.map.add(layer);
            // console.log(
            //   "CDU results lyr a add",
            //   this._view.map.layers.items.length
            // );
            this._view.whenLayerView(layer).then((layerView) => {
              //console.log("we have the layer view.");
              //let feature;
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
                    this._view.popup.title = getFlags(mapSelectedPlace, places);
                    this._view.popup.visible = true;
                  } else {
                    this._view.popup.visible = false;
                  }
                });
              });
            });

            //end prevProps.results
          });
        //end no results else
        //}
        //end this._view
      }
    }

    if (this.props.selectedPlace !== prevProps.selectedPlace) {
      if (this._view) {
        const layer = this._view.map.layers.getItemAt(0);
        this._view.whenLayerView(layer).then((layerView) => {
          //console.log("layer - CDU");

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
    //console.log("render");
    return <div className="esri-map" ref={this.mapDiv} />;
  }
}

export default EsriMap;
