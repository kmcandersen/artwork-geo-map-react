import React from "react";
import axios from "axios";
import { query } from "./utils/query.js";
import { places } from "./utils/places_list.js";
import { compareValues } from "./utils/helpers.js";
import { createFeatureArr } from "./utils/createFeatureArr.js";
import SearchPanel from "./SearchPanel";
import EsriMap from "./EsriMap";
import "./App.css";
import GalleryPanel from "./GalleryPanel.js";

class App extends React.Component {
  state = {
    mapLoaded: false,
    searchResults: [],
    selectedPlace: "",
    tilePointOn: false,
    //used with mapLoaded in GalleryPanel to ensure that No Results only shown when it's legit. Still nec, now that sampleArtwork loads first?
    searchMade: false,
    //held here bc needs to be accessed by onSearchSubmit
    showAllDetails: false,
    windowWidth: 0,
    gridType: "",
    //have class(es) been selected? need 2 queries bc empty class match field = error
    //queryNoClass: true,
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

  componentDidMount = () => {
    //25 = sampleArtwork.length
    this.getGridInfo(25);
    window.addEventListener("resize", () => {
      this.getGridInfo(this.state.searchResults.length);
    });
  };

  getGridInfo = (resultsLength) => {
    let windowWidth = window.innerWidth;
    let gridType = this.setGridType(windowWidth, resultsLength);
    this.setState({
      windowWidth: windowWidth,
      gridType: gridType,
    });
  };

  onSearchSubmit = async (startYear, endYear, classQuery) => {
    this.onMapLoad(false);

    if (startYear && endYear && startYear <= endYear) {
      await axios
        .post(
          "https://aggregator-data.artic.edu/api/v1/search",
          query(startYear, endYear, classQuery)
        )
        .then((res) => {
          let resOrdered = res.data.data.sort(compareValues("place_of_origin"));
          let featureArr = createFeatureArr(resOrdered, places);
          this.setState({
            searchResults: featureArr,
            searchMade: true,
            showAllDetails: false,
          });
          this.getGridInfo(featureArr.length);
        });
    }
  };

  onMapLoad = (boolean) => {
    this.setState({ mapLoaded: boolean });
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

  setGridType = (width, resultsLength) => {
    let gridType = "";

    if (width < 540) {
      gridType = "tall";
    } else if (width < 800) {
      if (resultsLength > 2) {
        gridType = "tall";
      } else {
        gridType = "short";
      }
    } else if (width < 1020) {
      if (resultsLength > 3) {
        gridType = "tall";
      } else {
        gridType = "short";
      }
    } else if (width < 1200) {
      if (resultsLength > 4) {
        gridType = "tall";
      } else {
        gridType = "short";
      }
    } else if (width >= 1200) {
      if (resultsLength > 5) {
        gridType = "tall";
      } else {
        gridType = "short";
      }
    }
    return gridType;
  };

  toggleQueryNoClass = (bool) => {
    this.setState({ queryNoClass: bool });
  };

  render() {
    return (
      <div className="App">
        <EsriMap
          onMapLoad={this.onMapLoad}
          mapLoaded={this.state.mapLoaded}
          results={this.state.searchResults}
          selectPlace={this.selectPlace}
          selectedPlace={this.state.selectedPlace}
          removeSelectedPlace={this.removeSelectedPlace}
          setSampleArtwork={this.setSampleArtwork}
          gridType={this.state.gridType}
        />
        <SearchPanel
          onSearchSubmit={this.onSearchSubmit}
          mapLoaded={this.state.mapLoaded}
          toggleQueryNoClass={this.toggleQueryNoClass}
        />
        <GalleryPanel
          mapLoaded={this.state.mapLoaded}
          results={this.state.searchResults}
          selectPlace={this.selectPlace}
          selectedPlace={this.state.selectedPlace}
          removeSelectedPlace={this.removeSelectedPlace}
          toggleSelectedPlace={this.toggleSelectedPlace}
          showAllDetails={this.state.showAllDetails}
          toggleAllDetailsState={this.toggleAllDetailsState}
          searchMade={this.state.searchMade}
          gridType={this.state.gridType}
          windowWidth={this.state.windowWidth}
        />
      </div>
      // </div>
    );
  }
}

export default App;
