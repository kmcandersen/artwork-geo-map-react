import React from "react";
import axios from "axios";

import { query } from "./utils/query.js";
import { places } from "./utils/places_list.js";
import { compareValues } from "./utils/helpers.js";
import { createFeatureArr } from "./utils/createFeatureArr.js";
import ArtPanel from "./ArtPanel";
import EsriMap from "./EsriMap";
import IntroModal from "./IntroModal";
import "./App.css";

class App extends React.Component {
  state = {
    mapLoaded: false,
    mapResultsLoaded: false,
    searchResults: [],
    selectedPlace: "",
    tilePointOn: false,
    modalOpen: true,
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

  onSearchSubmit = async (startYear, endYear) => {
    this.setMapResultsLoad(false);
    if (startYear && endYear && startYear <= endYear) {
      await axios
        .post(
          "https://aggregator-data.artic.edu/api/v1/search",
          query(startYear, endYear)
        )
        .then((res) => {
          let resOrdered = res.data.data.sort(compareValues("place_of_origin"));
          let featureArr = createFeatureArr(resOrdered, places);
          this.setState({ searchResults: featureArr });
        });
    }
  };

  onMapLoad = () => {
    this.setState({ mapLoaded: true });
  };

  setMapResultsLoad = (boolean) => {
    this.setState({ mapResultsLoaded: boolean });
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

  //to change searchResults from [] to sampleArtwork arr during EsriMap CDM, triggering CDU
  setSampleArtwork = (arr) => {
    this.setState({ searchResults: arr });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  render() {
    return (
      <div className="App">
        <EsriMap
          onLoad={this.onMapLoad}
          setMapResultsLoad={this.setMapResultsLoad}
          results={this.state.searchResults}
          selectPlace={this.selectPlace}
          selectedPlace={this.state.selectedPlace}
          removeSelectedPlace={this.removeSelectedPlace}
          setSampleArtwork={this.setSampleArtwork}
        />
        <ArtPanel
          results={this.state.searchResults}
          mapResultsLoaded={this.state.mapResultsLoaded}
          onSearchSubmit={this.onSearchSubmit}
          selectPlace={this.selectPlace}
          selectedPlace={this.state.selectedPlace}
          removeSelectedPlace={this.removeSelectedPlace}
          toggleSelectedPlace={this.toggleSelectedPlace}
        />
        {this.state.modalOpen && <IntroModal closeModal={this.closeModal} />}
      </div>
    );
  }
}

export default App;
