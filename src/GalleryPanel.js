import React, { Component } from 'react';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import Gallery from './Gallery';
import './GalleryPanel.css';
import './global.css';
import scream from './the-scream-square.jpg';

class GalleryPanel extends Component {
  render() {
    const tallGrid = {
      height: this.props.mainHeight * 0.55 + 'px',
    };
    const shortGrid = {
      height: this.props.mainHeight * 0.4 + 'px',
      display: 'flex',
    };
    const gridHeight = this.props.gridType === 'tall' ? tallGrid : shortGrid;

    return (
      <div className='GalleryPanel' style={gridHeight}>
        {this.props.results.length ? (
          <div className='toggle-all-details'>
            {this.props.showAllDetails ? (
              <Tooltip title='Hide all details' placement='top' arrow>
                <IconButton
                  aria-label='Hide all details'
                  className='infoAllBtn'
                  style={{ padding: '10px' }}
                  onClick={this.props.toggleAllDetails}
                >
                  <InfoIcon className='show-all-icon' />
                </IconButton>
              </Tooltip>
            ) : (
              <Tooltip
                title='Show all details'
                className='tooltip'
                placement='top'
                arrow
              >
                <IconButton
                  aria-label='Show all details'
                  className='infoAllBtn'
                  style={{ padding: '10px' }}
                  onClick={this.props.toggleAllDetails}
                >
                  <InfoOutlinedIcon className='show-all-icon' />
                </IconButton>
              </Tooltip>
            )}
          </div>
        ) : (
          ''
        )}

        {this.props.results.length ? (
          <Gallery {...this.props} />
        ) : (
          this.props.mapLoaded && (
            <div className='noresults-msg-wrapper'>
              <div>
                <a href='https://www.artic.edu/artworks/17229/the-scream'>
                  <img
                    src={scream}
                    style={{ width: '75px' }}
                    alt='Edvard Munch. The Scream. 1895. The Art Institute of Chicago.'
                  />
                </a>
              </div>
              <p>No results.</p>
              <p className='noresults-sugg'>
                Psst! Try widening the year range or changing the media options.
              </p>
            </div>
          )
        )}
      </div>
    );
  }
}

export default GalleryPanel;
