import React, { } from 'react'
import NoImg from '../images/blank-profile-picture.png'
import PropTypes from 'prop-types'
// MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Paper from '@material-ui/core/Paper'
import LocationOn from '@material-ui/icons/LocationOn'
import CalendarToday from '@material-ui/icons/CalendarToday'
import LinkIcon from '@material-ui/icons/Link'
//import theme from './theme'

const styles = theme => ({
  paper: {
    padding: 20
  },
  profile: {
    '& .image-wrapper': {
      textAlign: 'center',
      position: 'relative'
    },
    '& .profile-image': {
      width: 200,
      height: 200,
      objectFit: 'cover',
      maxWidth: '100%',
      borderRadius: '50%'
    },
    '& .profile-details': {
      textAlign: 'center',
      '& span, svg': {
        verticalAlign: 'middle'
      },
      '& a': {
        color: theme.palette.primary.main
      }
    },
    '& hr': {
      border: 'none',
      margin: '0 0 10px 0'
    }
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    margin: '0 auto 7px auto'
  },
  fullline: {
    width: '90%',
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginBottom: 10
  }
})

const ProfileSkeleton = props => {
  const { classes } = props;

  return (
    <Paper className={classes.paper}>
      <div className={classes.profile}>
        <div className="image-wrapper">
          <img src={NoImg} alt="profile" className="profile-image" />
        </div>
        <hr />
        <div className="profile-details">
          <div className={classes.handle}></div>
          <hr />
          <div className={classes.fullline}></div>
          <hr />
          <LocationOn color="primary" /><span>location</span>
          <hr />
          <LinkIcon color="primary" /><span>www.xxx.com</span>
          <hr />
          <CalendarToday color="primary" />
          <span>Joined Date</span>
        </div>
      </div>
    </Paper>
  )
}

ProfileSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(ProfileSkeleton)
