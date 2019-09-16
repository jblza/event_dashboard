import React from 'react';

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

export default RadarMarker;