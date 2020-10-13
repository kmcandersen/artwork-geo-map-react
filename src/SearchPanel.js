import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import "./SearchPanel.css";
import { capitalize } from "./utils/helpers.js";
import { classStrToQuery } from "./utils/class_queries.js";

class SearchPanel extends Component {
  state = {
    startYear: 1890,
    endYear: 1900,
    classes: [],
  };

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

  render() {
    const classes = [
      "drawing & prints",
      "painting",
      "photography",
      "sculpture",
      "textiles",
    ];
    return (
      <div className="SearchPanel">
        <div>
          <form
            className="root"
            noValidate
            autoComplete="off"
            onSubmit={(e) => this.onFormSubmit(e)}
          >
            <div>
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

              <div className="class-option-wrapper">
                <div className="media-header">Specify Media (optional)</div>
                <div className="class-option-group">
                  <FormGroup row>
                    {classes.map((c, i) => (
                      <div className="class-option">
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
                          style={{ fontSize: ".5rem" }}
                        />
                      </div>
                    ))}
                  </FormGroup>
                </div>
              </div>
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
      </div>
    );
  }
}

export default SearchPanel;
