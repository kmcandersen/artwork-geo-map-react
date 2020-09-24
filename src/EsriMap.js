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

  componentDidUpdate(prevProps) {
    if (this.props.results !== prevProps.results) {
      if (this._view) {
        //result arr converted to graphics arr, graphics arr added to layer.source, layer added to map
        this._view.map.removeAll();
        this.props.selectedPlace && this.props.onSelectPlace(null);
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
                  console.log("point click");
                  if (highlight) {
                    highlight.remove();
                  }
                  this._view.hitTest(event).then((response) => {
                    console.log("point hitTest");
                    if (response.results.length) {
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

                      this.props.onSelectPlace(mapSelectedPlace);

                      highlight = resultsLayerView.highlight(feature);
                    } else {
                      if (this._view.popup.visible) {
                        this._view.popup.visible = false;
                      }
                      if (this.props.selectedPlace !== "") {
                        this.props.onSelectPlace(null);
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
