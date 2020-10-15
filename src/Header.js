import React, { Component } from "react";
import Button from "@material-ui/core/Button";
import "./Header.css";
import Intro from "./Intro";
import SearchPanel from "./SearchPanel";

class Header extends Component {
  state = {
    openPanel: [],
  };

  handleClick = (event) => {
    if (this.state.openPanel.includes(event.currentTarget.name)) {
      this.setState({ openPanel: [] });
    } else {
      this.setState({ openPanel: event.currentTarget.name });
    }
  };

  render() {
    const navItems = ["about", "search"];
    // const navItems = ["about", "search", "log in"];
    const { openPanel } = this.state;
    const { mapLoaded, onSearchSubmit } = this.props;
    return (
      <div className="Header-wrapper">
        <header className="header-style">
          <div className="logo-wrapper">
            ART<span className="gray-text">IMELINE</span>
          </div>
          <nav>
            {navItems.map((n, i) => (
              <Button
                // style={{ margin: "7px" }}
                aria-controls={n}
                aria-haspopup="true"
                // variant="contained"
                onClick={this.handleClick}
                color="inherit"
                name={n}
                key={i}
                className={this.state.openPanel === n ? "open" : ""}
              >
                {n}
              </Button>
            ))}
          </nav>
        </header>

        <Intro name="about" openPanel={openPanel} />
        <SearchPanel
          onSearchSubmit={onSearchSubmit}
          mapLoaded={mapLoaded}
          name="search"
          openPanel={openPanel}
        />
        {/* <Login name="login" openPanel={openPanel} /> */}
      </div>
    );
  }
}

export default Header;
