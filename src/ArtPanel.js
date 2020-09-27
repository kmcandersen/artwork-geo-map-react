import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import Divider from "@material-ui/core/Divider";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from "@material-ui/icons/Info";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import InfoOutlinedIcon from "@material-ui/icons/InfoOutlined";
import TextField from "@material-ui/core/TextField";
import Gallery from "./Gallery";
import "./ArtPanel.css";

class ArtPanel extends Component {
  state = {
    showAllDetails: false,
    detailItems: [],
    showSearch: true,
    searchMade: false,
    startYear: "",
    endYear: "",
  };

  onFormSubmit(e) {
    e.preventDefault();
    this.props.onSearchSubmit(this.state.startYear, this.state.endYear);
    this.setState({ showAllDetails: false, detailItems: [], searchMade: true });
  }

  toggleAllDetails = () => {
    //if showAllDetails = false, = true & loop thru all results & put them in state.detailItem arr
    //if showAllDetails = true, = false & remove all items from arr
    if (!this.state.showAllDetails) {
      let showIds = [];
      this.props.results.forEach((r) => {
        showIds.push(r.aic_id);
      });
      this.setState({ showAllDetails: true, detailItems: showIds });
    }
    if (this.state.showAllDetails) {
      this.setState({ showAllDetails: false, detailItems: [] });
    }
  };

  toggleTileDetails = (id) => {
    //if id in arr, remove it
    //if id not in arr, add it
    //presence of id checked in various Gallery className conditionals
    if (this.state.detailItems.includes(id)) {
      let showing = this.state.detailItems || [];
      let newShowing = showing.filter((t) => t !== id);
      this.setState({ detailItems: newShowing });
    } else if (!this.state.detailItems.includes(id)) {
      let showing = this.state.detailItems || [];
      showing.push(id);
      this.setState({ detailItems: showing });
    }
  };

  toggleSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  render() {
    return (
      <div className="ArtPanel">
        <div className="ArtPanel-header">
          <div className="logo-wrapper">
            <div className="logo-text">
              ART<span className="gray-text">IMELINE</span>
            </div>
          </div>
          <div className="input-form">
            <form
              className="root"
              noValidate
              autoComplete="off"
              onSubmit={(e) => this.onFormSubmit(e)}
            >
              <div className="form-info">
                <label htmlFor="standard-basic">Search</label>
                <IconButton
                  aria-label={
                    this.state.showSearch ? "hide Search" : "show Search"
                  }
                  onClick={this.toggleSearch}
                >
                  {this.state.showSearch ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              </div>
              {this.state.showSearch && (
                <div className="input-content">
                  <div className="input-fields">
                    <div className="left-input">
                      <TextField
                        id="standard-basic"
                        type="number"
                        name="startYear"
                        min="-8000"
                        max="2020"
                        label="start year"
                        value={this.state.startYear}
                        onChange={(e) =>
                          this.setState({ startYear: parseInt(e.target.value) })
                        }
                      />
                    </div>
                    <div className="right-input">
                      <TextField
                        id="standard-basic"
                        type="number"
                        name="endYear"
                        min="-8000"
                        max="2020"
                        label="end year"
                        value={this.state.endYear}
                        onChange={(e) =>
                          this.setState({ endYear: parseInt(e.target.value) })
                        }
                      />
                    </div>
                  </div>
                  <div className="submit-button">
                    <Button
                      type="submit"
                      variant="contained"
                      color="primary"
                      // data-theme="dark"
                      disabled={
                        this.state.endYear === "" ||
                        this.state.endYear < this.state.startYear
                          ? true
                          : false
                      }
                    >
                      Submit
                    </Button>
                  </div>
                </div>
              )}
            </form>
          </div>
          <Divider />

          {/* if !results.length (incl if no searchMade yet), # results & Show All Details toggle are hidden  */}
          <div
            className={`input-footer ${!this.props.results.length && "hidden"}
            `}
          >
            <div className="results-length">
              {this.props.results.length} results
            </div>
            <div className="toggle-all-details" onClick={this.toggleAllDetails}>
              {this.state.showAllDetails
                ? "Hide all details"
                : "Show all details"}
            </div>
          </div>
        </div>

        {this.props.results.length ? (
          <Gallery
            results={this.props.results}
            showAllDetails={this.state.showAllDetails}
            detailItems={this.state.detailItems}
            toggleTileDetails={this.toggleTileDetails}
            selectPlace={this.props.selectPlace}
            selectedPlace={this.props.selectedPlace}
            removeSelectedPlace={this.props.removeSelectedPlace}
            toggleSelectedPlace={this.props.toggleSelectedPlace}
          />
        ) : this.state.searchMade && this.props.mapResultsLoaded ? (
          <div>
            No results.
            <div className="noresults-msg">
              Psst! Try changing or widening the year range.
            </div>
          </div>
        ) : (
          <div>Intro text</div>
        )}
      </div>
    );
  }
}

export default ArtPanel;
