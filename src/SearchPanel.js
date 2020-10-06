import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import Intro from "./Intro";
import "./SearchPanel.css";

class SearchPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: true,
      startYear: 1890,
      endYear: 1900,
      showIntro: true,
    };
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.onSearchSubmit(this.state.startYear, this.state.endYear);
  }

  toggleSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  hideIntro = () => {
    this.setState({ showIntro: false });
  };

  render() {
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
