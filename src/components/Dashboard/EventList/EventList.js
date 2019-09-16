import React, { useEffect } from 'react';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles } from '@material-ui/core/styles';
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

function EventList(props) {

  const classes = useStyles();
  const listRefs = {};

  const handleChange = id => (event, isExpanded) => {
    props.setSelected(isExpanded ? id : false);
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

export default EventList;