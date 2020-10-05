import React from "react";
import axios from "axios";

import { query } from "./utils/query.js";
import { places } from "./utils/places_list.js";
import { compareValues } from "./utils/helpers.js";
import { createFeatureArr } from "./utils/createFeatureArr.js";
import ArtPanel from "./ArtPanel";
import EsriMap from "./EsriMap";
//import IntroModal from "./IntroModal";
import "./App.css";
import GalleryPanel from "./GalleryPanel.js";

class App extends React.Component {
  state = {
    mapLoaded: false,
    //so No Results msg doesn't flash before results actually returned; runs with CDU: prevProps.results in EsriMap.js
    mapResultsLoaded: false,
    searchResults: [],
    selectedPlace: "",
    tilePointOn: false,
    modalOpen: true,
    //used with mapResultsLoaded in GalleryPanel to ensure that No Results only shown when it's legit. Still nec, now that sampleArtwork loads first?
    searchMade: false,
    //held here bc needs to be accessed by onSearchSubmit
    showAllDetails: false,
    gridType: "",
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

  // componentDidMount() {
  //   this.updateGalleryWidth();
  //   window.addEventListener("resize", this.updateGalleryWidth);
  // }

  // updateGalleryWidth = () => {
  //   this.setState({ width: window.innerWidth });
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
          this.setState({
            searchResults: featureArr,
            searchMade: true,
            showAllDetails: false,
          });
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

  toggleAllDetailsState = () => {
    this.setState({ showAllDetails: !this.state.showAllDetails });
  };

  //to change searchResults from [] to sampleArtwork arr during EsriMap CDM, triggering CDU
  setSampleArtwork = (arr) => {
    this.setState({ searchResults: arr });
  };

  closeModal = () => {
    this.setState({ modalOpen: false });
  };

  //breakpoints set on width of Window, or GalleryPanel?
  //App & EsriMap ea render 2x before this func runs
  setGridType = (width) => {
    let results = this.state.searchResults;
    let gridType = "";

    if (width < 540) {
      gridType = "tall";
    } else if (width < 800) {
      if (results.length > 2) {
        gridType = "tall";
      } else {
        gridType = "short";
      }
    } else if (width < 1020) {
      if (results.length > 3) {
        gridType = "tall";
      } else {
        gridType = "short";
      }
    } else if (width < 1200) {
      if (results.length > 4) {
        gridType = "tall";
      } else {
        gridType = "short";
      }
    } else if (width >= 1200) {
      if (results.length > 5) {
        gridType = "tall";
      } else {
        gridType = "short";
      }
    }

    this.setState({ gridType: gridType });
    console.log("setGridType App", this.state.gridType);
  };

  render() {
    console.log("render App", this.state.gridType);
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
          isModalOpen={this.state.modalOpen}
          gridType={this.state.gridType}
        />
        <ArtPanel
          onSearchSubmit={this.onSearchSubmit}
          isModalOpen={this.state.modalOpen}
        />
        <GalleryPanel
          mapResultsLoaded={this.state.mapResultsLoaded}
          results={this.state.searchResults}
          selectPlace={this.selectPlace}
          selectedPlace={this.state.selectedPlace}
          removeSelectedPlace={this.removeSelectedPlace}
          toggleSelectedPlace={this.toggleSelectedPlace}
          showAllDetails={this.state.showAllDetails}
          toggleAllDetailsState={this.toggleAllDetailsState}
          searchMade={this.state.searchMade}
          gridType={this.state.gridType}
          setGridType={this.setGridType}
        />
        {/* {this.state.modalOpen && <IntroModal closeModal={this.closeModal} />} */}
      </div>
    );
  }
}

export default App;
