import React, { Component } from "react";
import CloseIcon from "@material-ui/icons/Close";
import IconButton from "@material-ui/core/IconButton";
import "./IntroModal.css";

class IntroModal extends Component {
  render() {
    return (
      <div className="Modal">
        <div className="modal-content">
          <div className="top-modal">
            <div className="logo-text logo-text-modal">
              ART<span className="gray-text">IMELINE</span>
            </div>
            <div>
              <IconButton onClick={this.props.closeModal} title="Close popup">
                <CloseIcon />
              </IconButton>
            </div>
          </div>
          <div className="modal-msg">
            <p>
              Enter a year range to generate a selection of random artwork from
              the{" "}
              <a href="https://www.artic.edu/">Art Institute of Chicago's</a>{" "}
              collection. Place familiar works and artists in their historical
              contexts, and see art and styles from around the world that you
              might not be familiar with.
            </p>
            <p>
              To start, take a look at a sample selection of artwork, created
              between 1890 and 1900.
            </p>
          </div>
        </div>
      </div>
    );
  }
}

export default IntroModal;
