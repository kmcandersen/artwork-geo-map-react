import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Intro from "./Intro";
import "./SearchPanel.css";
import { capitalize } from "./utils/helpers.js";
import { classStrToQuery } from "./utils/class_queries.js";

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: true,
      startYear: 1890,
      endYear: 1900,
      showIntro: true,
      classes: [],
    };
  }

  //handler for change event on checkbox; adds/removes classes from state array
  onCheckClass = (e) => {
    let className = e.target.name;
    this.setState({ classesUpdated: false });
    let classes = this.state.classes || [];
    if (this.state.classes.includes(className)) {
      let newClasses = classes.filter((c) => c !== className);
      this.setState({ classes: newClasses });
    } else if (!this.state.classes.includes(className)) {
      classes.push(className);
    }
  };

  //func to loop thru state.classes & concatenate terms of selected classes
  //should not run if classes = []
  createClassQuery = () => {
    let classQuery = "";
    let classes = this.state.classes;
    for (let i = 0; i < classes.length; i++) {
      if (classQuery.length) {
        classQuery += " OR ";
      }
      classQuery += classStrToQuery(classes[i]);
    }
    console.log("classQuery", classQuery);
    return classQuery;
  };

  onFormSubmit = (e) => {
    e.preventDefault();
    //run func to get concatenated class query
    //oSS will take class arg (add in App)
    let classQuery = "";
    if (this.state.classes.length) {
      classQuery = this.createClassQuery();
    }
    this.props.onSearchSubmit(
      this.state.startYear,
      this.state.endYear,
      classQuery
    );
  };

  toggleSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  hideIntro = () => {
    this.setState({ showIntro: false });
  };

  render() {
    const classes = [
      "drawing",
      "painting",
      "photography",
      "sculpture",
      "textile",
    ];
    return (
      <div className="SearchPanel">
        <div className="SearchPanel-header">
          <div className="logo-wrapper">
            <div className="logo-text">
              ART<span className="gray-text">IMELINE</span>
            </div>
            <div className="form-info">
              {!this.state.showIntro && (
                <IconButton
                  aria-label={
                    this.state.showSearch ? "Collapse Search" : "Expand Search"
                  }
                  title={
                    this.state.showSearch ? "Collapse Search" : "Expand Search"
                  }
                  onClick={this.toggleSearch}
                >
                  {this.state.showSearch ? (
                    <ExpandLessIcon />
                  ) : (
                    <ExpandMoreIcon />
                  )}
                </IconButton>
              )}
            </div>
          </div>
          <hr style={{ borderBottom: "8px solid #b50938", margin: "0" }} />
          {this.state.showIntro ? (
            <Intro hideIntro={this.hideIntro} />
          ) : (
            this.state.showSearch && (
              <div className="input-form">
                <form
                  className="root"
                  noValidate
                  autoComplete="off"
                  onSubmit={(e) => this.onFormSubmit(e)}
                >
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
                            this.setState({
                              startYear: parseInt(e.target.value),
                            })
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
                            this.setState({
                              endYear: parseInt(e.target.value),
                            })
                          }
                        />
                      </div>
                    </div>

                    <FormGroup className="FormGroup">
                      {classes.map((c, i) => (
                        <FormControlLabel
                          control={
                            <Checkbox
                              checked={
                                this.state.classes.length
                                  ? this.state.classes.includes(c)
                                    ? true
                                    : false
                                  : false
                              }
                              onChange={this.onCheckClass}
                              name={c}
                              color="primary"
                              // disabled
                            />
                          }
                          label={capitalize(c)}
                          key={i}
                        />
                      ))}
                    </FormGroup>

                    <div className="submit-button">
                      <Button
                        type="submit"
                        variant="contained"
                        color="primary"
                        // data-theme="dark"
                        disabled={
                          !this.props.mapLoaded ||
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
                </form>
                {/* end input-form */}
              </div>
            )
          )}
        </div>
      </div>
    );
  }
}

export default SearchPanel;
