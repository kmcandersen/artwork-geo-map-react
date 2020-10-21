import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Tooltip from "@material-ui/core/Tooltip";
import "./SearchPanel.css";
import "./global.css";
import { capitalize } from "./utils/helpers.js";
import { classStrToQuery } from "./utils/class_queries.js";
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';

class SearchPanel extends Component {
  state = {
    startYear: 1890,
    endYear: 1900,
    classes: [],
  };

  componentDidMount() {
    ValidatorForm.addValidationRule("yearInRangeStart", () => {
      return (this.state.startYear >= -2000 && this.state.startYear <= 1950);
    });
    ValidatorForm.addValidationRule("yearInRangeEnd", () => {
      return (this.state.endYear >= -2000 && this.state.endYear <= 1950);
    });
    ValidatorForm.addValidationRule("endYearGreater", () => {
      return (Number(this.state.endYear) - Number(this.state.startYear)) >= 0;
    });
  }

  //handler for change event on checkbox; adds/removes classes from state array
  onCheckClass = (e) => {
    let className = e.target.name;
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
    return;
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
      <div
        className={`panel ${this.props.openPanel === "search" ? "" : "hidden"}`}
      >
        <div>
          <ValidatorForm
            className="root"
            autoComplete="off"
            instantValidate={false}
            onSubmit={(e) => this.onFormSubmit(e)}
          >
            <div>
              <div className="input-fields">
                <div className="left-input">
                  <TextValidator
                    id="standard-basic"
                    type="number"
                    name="startYear"
                    label="start year"
                    value={this.state.startYear}
                    onChange={(e) =>
                      this.setState({
                        startYear: e.target.value,
                      })
                    }
                    validators={["yearInRangeStart"]}
                    errorMessages={["Invalid year"]}
                  />
                </div>
                <div className="right-input">
                  <TextValidator
                    id="standard-basic"
                    type="number"
                    name="endYear"
                    label="end year"
                    value={this.state.endYear}
                    onChange={(e) =>
                      this.setState({
                        endYear: e.target.value,
                      })
                    }
                    validators={["yearInRangeEnd", "endYearGreater"]}
                    errorMessages={["Invalid year", "Invalid end year"]}
                  />
                </div>
                <Tooltip title="Years -2000 to 1950" placement="top" arrow>
                  <HelpOutlineIcon style={{ zIndex: 5, position: "absolute", right: "27px" }} />
                </Tooltip>
              </div>

              <div className="class-option-wrapper">
                <div className="media-header">Specify Media (optional)</div>
                <div className="class-option-group">
                  <FormGroup row>
                    {classes.map((c, i) => (
                      <div className="class-option" key={i}>
                        <FormControlLabel
                          control={
                            <Checkbox
                              className="checkbox"
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
                    !this.props.mapLoaded
                    //   || this.state.endYear === "" ||
                    //   this.state.endYear < this.state.startYear
                    //     ? true
                    //     : false
                  }
                >
                  Submit
                </Button>
              </div>
            </div>
          </ValidatorForm>
          {/* end input-form */}
        </div>
      </div>
    );
  }
}

export default SearchPanel;
