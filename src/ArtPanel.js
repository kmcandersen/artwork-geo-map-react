import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import IconButton from "@material-ui/core/IconButton";
import ExpandLessIcon from "@material-ui/icons/ExpandLess";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TextField from "@material-ui/core/TextField";
import "./ArtPanel.css";

class ArtPanel extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showSearch: true,
      startYear: 1890,
      endYear: 1900,
    };
  }

  onFormSubmit(e) {
    e.preventDefault();
    this.props.onSearchSubmit(this.state.startYear, this.state.endYear);
    this.setState({ detailItems: [] });
  }

  toggleSearch = () => {
    this.setState({ showSearch: !this.state.showSearch });
  };

  render() {
    return (
      <div className={`ArtPanel ${this.props.isModalOpen && "dimmed"}`}>
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
        </div>
      </div>
    );
  }
}

export default ArtPanel;
