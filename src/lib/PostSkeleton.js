import React, { Fragment } from 'react'
import NoImg from '../images/blank-profile-picture.png'
import PropTypes from 'prop-types'
// MUI
import Card from '@material-ui/core/Card'
import CardMedia from '@material-ui/core/CardMedia'
import CardContent from '@material-ui/core/CardContent'
import withStyles from '@material-ui/core/styles/withStyles'
import theme from './theme'

const styles = theme => ({
  card: {
    display: 'flex',
    marginBottom: 20,
    position: 'relative'
  },
  image: {
    minWidth: 200,
    objectFit: 'cover'
  },
  content: {
    width: '100%',
    padding: 25
  },
  handle: {
    width: 60,
    height: 18,
    backgroundColor: theme.palette.primary.main,
    marginBottom: 10
  },
  date: {
    width: 100,
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.3)',
    marginBottom: 10
  },
  fullline: {
    width: '90%',
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginBottom: 10
  },
  halfline: {
    width: '50%',
    height: 15,
    backgroundColor: 'rgba(0,0,0,0.4)',
    marginBottom: 10
  },
})

const PostSkeleton = props => {
  const { classes } = props;

  const content = Array.from({ length: 5 }).map((item, index) => (
    <Card className={classes.card} key={index}>
      <CardMedia className={classes.image} image={NoImg} title="Profile Image" />
      <CardContent className={classes.content}>
        <div className={classes.handle}></div>
        <div className={classes.date}></div>
        <div className={classes.fullline}></div>
        <div className={classes.fullline}></div>
        <div className={classes.halfline}></div>
      </CardContent>
    </Card>
  ))
  return (
    <Fragment>
      {content}
    </Fragment>
  )
}

PostSkeleton.propTypes = {
  classes: PropTypes.object.isRequired
}
export default withStyles(styles)(PostSkeleton)
