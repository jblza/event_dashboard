import React, { useEffect } from 'react';
import axios from 'axios';

import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import GoogleMapReact from 'google-map-react';
import Moment from 'react-moment';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  details: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightRegular,
  },
  detailsHeading: {
    fontSize: theme.typography.pxToRem(12),
    fontWeight: theme.typography.fontWeightBold,
  }
}));

function EventComponent(props) {

  const classes = useStyles();
  const listRefs = {};

  const handleChange = id => (event, isExpanded) => {
    props.setSelected(isExpanded ? id: false);
    //console.log(event);
  };

  const scrollTo = (id) => {
    if(listRefs[id]){
      listRefs[id].scrollIntoView({behavior: "smooth", block: "center", inline: "nearest"});
    }
  };

  useEffect(() => {
    scrollTo(props.selected);
  });

  return props.events.map((e) => 
    <div key={e._id} ref={el => (listRefs[e._id] = el)}>
      <ExpansionPanel expanded={props.selected === e._id} onChange={handleChange(e._id)}>
        <ExpansionPanelSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls={e._id + "a-content"}
          id={e._id + "a-header"}
        >
          <Typography className={classes.heading}>{e.place ? e.place.name : e.geofence.description}</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          
            <div className="container">
              <div className="row">
                <div className="col">
                  <Typography className={classes.detailsHeading}>Event ID</Typography>
                  <Typography className={classes.detailsHeading}>Time</Typography>
                  <Typography className={classes.detailsHeading}>Event Type</Typography>
                  <Typography className={classes.detailsHeading}>Confidence</Typography>
                </div>
                <div className="col pull-right">
                  <Typography className={classes.details}>{e._id}</Typography>
                  <Typography className={classes.details}>
                    <Moment format="MM-DD-YYYY HH:mm">
                      {e.actualCreatedAt}
                    </Moment>
                  </Typography>
                  <Typography className={classes.details}>{e.type}</Typography>
                  <Typography className={classes.details}>{e.confidence}</Typography>
                </div>
              </div>
            </div>
      
        </ExpansionPanelDetails>
      </ExpansionPanel>
    </div>
  )
}

function RadarMarker(props){
  return (
    <img 
      className="radarmarker"
      src={props.selected === props.event._id ? 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_white.png' : 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png'}
      alt="T"
      onClick={() => props.setSelected(props.event._id)}
    />
  )
}

class EventMap extends React.Component {

  static defaultProps = {
    center: {
      lat: 40.7128,
      lng: -74.0060
    },
    zoom: 11
  };

/*
  renderMarker(map, maps) {
    (this.props.events).map((e) => {
      let lat = e.location.coordinates[1];
      let lng = e.location.coordinates[0];
      new maps.Marker({
        map: map,
        position: new maps.LatLng(lat, lng),
        title: e._id,
        icon: this.props.selected === e._id ? 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_white.png' : 'http://maps.gstatic.com/mapfiles/ridefinder-images/mm_20_blue.png'
      }).addListener('click', (a) =>{
        this.props.setSelected(e._id);
      });
    });
  };*/

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
          //yesIWantToUseGoogleMapApiInternals={true}
          //onGoogleApiLoaded={({ map, maps }) => this.renderMarker(map, maps)}
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


class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      endpoint: process.env.REACT_APP_RADAR_API_ENDPOINT,
      apiKey: process.env.REACT_APP_RADAR_API_KEY,
      events: [],
      selected: false
    }
  }

  setSelected(id){
    this.setState({selected: id});
    //console.log("parent: " + this.state.selected);
  }

  componentDidMount() {
    const radarEvents = axios.create({
      baseURL: this.state.endpoint,
      headers: {
        Authorization: this.state.apiKey
      }
    });
    radarEvents.get()
    .then((res) => {
      //console.log("api call");
      this.setState({events: res.data.events});
      //this.setState({selected: res.data.events[0]._id})
    });
  }

  render() {
    return (
        <div className="container" id="wrapper">
          <div className="row">
            <div className="col-4 listCol">
              <EventComponent 
                events={this.state.events} 
                selected={this.state.selected} 
                setSelected={this.setSelected.bind(this)}
              />
            </div>
            <div className="col-8">
              <EventMap 
                events={this.state.events} 
                selected={this.state.selected} 
                setSelected={this.setSelected.bind(this)}
              />
            </div>
          </div>
        </div>
    );

  }
}

export default Dashboard;