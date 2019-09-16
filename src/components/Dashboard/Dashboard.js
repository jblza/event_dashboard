import React from 'react';
import axios from 'axios';
import EventList from './EventList/EventList';
import EventMap from './EventMap/EventMap';

class Dashboard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      selected: false
    }
  }

  setSelected = (id) => {
    this.setState({selected: id});
  }

  componentDidMount() {
    const radarEvents = axios.create({
      baseURL: process.env.REACT_APP_RADAR_API_ENDPOINT,
      headers: {
        Authorization: process.env.REACT_APP_RADAR_API_KEY
      }
    });
    radarEvents.get()
    .then((res) => {
      this.setState({events: res.data.events});
    }).catch(err => {
      console.error("Error on API call");
    });
  }

  render() {
    return (
        <div className="container" id="wrapper">
          <div className="row">
            <div className="col-4 listCol">
              <EventList 
                events={this.state.events} 
                selected={this.state.selected} 
                setSelected={this.setSelected}
              />
            </div>
            <div className="col-8">
              <EventMap 
                events={this.state.events} 
                selected={this.state.selected} 
                setSelected={this.setSelected}
              />
            </div>
          </div>
        </div>
    );

  }
}

export default Dashboard;