import React from "react";
import { loadMap } from "./utils/map";
import { loadHome } from "./utils/home";
import { loadLayer } from "./utils/layer";
import { setGraphics } from "./utils/graphics";

import "./EsriMap.css";

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
      //loads sampleArtwork on initial load
      setGraphics(this.props.results).then((graphicsArr) => {
        const resultsLayer = loadLayer(graphicsArr);
        view.map.add(resultsLayer);
      });
    });
  }

  // componentDidUpdate(prevProps) {
  //   if (this.props.theme !== prevProps.theme) {
  //     if (this._view) {
  //       const basemap = themeToBasemap(this.props.theme);
  //       this._view.map.basemap = basemap;
  //     }
  //   }
  // }

  componentDidUpdate(prevProps) {
    if (this.props.results !== prevProps.results) {
      if (this._view) {
        //result arr converted to graphics arr, graphics arr added to layer.source, layer added to map
        this._view.map.removeAll();
        setGraphics(this.props.results).then((graphicsArr) => {
          const resultsLayer = loadLayer(graphicsArr);
          this._view.map.add(resultsLayer);
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
    return <div className="esri-map" ref={this.mapDiv} />;
  }
}

export default EsriMap;
