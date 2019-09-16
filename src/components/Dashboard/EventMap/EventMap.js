import React from'react';
import GoogleMapReact from 'google-map-react';
import RadarMarker from './RadarMarker';

class EventMap extends React.Component {

  //coordinates are to center the map on NYC
  static defaultProps = {
    center: {
      lat: 40.7128,
      lng: -74.0060
    },
    zoom: 11
  };

  render() {
    return (
      <div style={{ height: '100%', width: '100%' }}>
        <GoogleMapReact
          bootstrapURLKeys={{ 
            key: process.env.REACT_APP_GOOGLE_API_KEY,
            region: 'US',
            language: 'EN' 
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
        >
          {(this.props.events).map((e) => 
            <RadarMarker
              key={e._id}
              lat={e.location.coordinates[1]}
              lng={e.location.coordinates[0]}
              text={e._id}
              selected={this.props.selected}
              event={e}
              setSelected={this.props.setSelected}
            />
          )}   
        </GoogleMapReact>
      </div>
    );
  }
}

export default EventMap;