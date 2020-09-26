import React from "react";
import axios from "axios";

import { query } from "./utils/query.js";
import { places } from "./utils/places_list.js";
import { compareValues } from "./utils/helpers.js";
import { createFeatureArr } from "./utils/createFeatureArr.js";
import ArtPanel from "./ArtPanel";
import EsriMap from "./EsriMap";
import "./App.css";
import { sampleArtwork } from "./utils/sampleArtwork.js";

class App extends React.Component {
  state = {
    mapLoaded: false,
    searchResults: [],
    selectedPlace: "",
    tilePointOn: false,
  };
  // switchTheme = (e) => {
  //     console.log("clicked!");
  //     this.setState({ theme: e.target.dataset.theme });
  // };

  // componentDidMount() {
  // getArtwork = (query) => {
  //     axios
  //       .post("https://aggregator-data.artic.edu/api/v1/search", query)
  //       .then((res) => {
  //         let resOrdered = res.data.data.sort(compareValues("place_of_origin"));
  //         let featureArr = createFeatureArr(resOrdered, places);
  //         this.setState({ searchResults: featureArr });
  //       });
  // };

  onSearchSubmit = () => {
    axios
      .post(
        "https://aggregator-data.artic.edu/api/v1/search",
        query(1890, 1900)
      )
      .then((res) => {
        let resOrdered = res.data.data.sort(compareValues("place_of_origin"));
        let featureArr = createFeatureArr(resOrdered, places);
        this.setState({ searchResults: featureArr });
      });
  };

  // onSearchSubmit(getArtwork(1890, 1900));
  // }
  onMapLoad = () => {
    this.setState({ mapLoaded: true });
  };

  setSampleArtwork = (sampleArtwork) => {
    this.setState({ searchResults: sampleArtwork });
  };

  selectPlace = (place) => {
    this.setState({ selectedPlace: place });
  };

  removeSelectedPlace = () => {
    this.setState({ selectedPlace: "" });
  };

  //created for tile map point click
  toggleSelectedPlace = (place) => {
    if (this.state.tilePointOn) {
      if (this.state.selectedPlace !== place) {
        this.selectPlace(place);
        this.setState({ tilePointOn: true });
      } else {
        this.removeSelectedPlace();
        this.setState({ tilePointOn: false });
      }
    } else {
      this.selectPlace(place);
      this.setState({ tilePointOn: true });
    }
  };

  render() {
    return (
      <div className="App">
        <div>
          <label>GET ART</label>
          <button
            onClick={this.onSearchSubmit}
            // data-theme="dark"
            disabled={!this.state.mapLoaded}
          >
            Submit
          </button>
        </div>

        <EsriMap
          onLoad={this.onMapLoad}
          setSampleArtwork={this.setSampleArtwork}
          results={this.state.searchResults}
          selectPlace={this.selectPlace}
          selectedPlace={this.state.selectedPlace}
          removeSelectedPlace={this.removeSelectedPlace}
        />
        <ArtPanel
          results={this.state.searchResults}
          selectPlace={this.selectPlace}
          selectedPlace={this.state.selectedPlace}
          removeSelectedPlace={this.removeSelectedPlace}
          toggleSelectedPlace={this.toggleSelectedPlace}
        />
      </div>
    );
  }
}

export default App;
