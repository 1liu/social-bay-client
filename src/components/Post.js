import React, { Component } from 'react'
import withStyles from '@material-ui/core/styles/withStyles'
import { Link } from 'react-router-dom'
import dayjs from 'dayjs'
import PropTypes from 'prop-types'
// MUI
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
//redux
import { connect } from 'react-redux'
import { likePost, unlikePost } from '../redux/actions/dataActions'
var relativeTime = require('dayjs/plugin/relativeTime')

const styles = {
  card: {
    display: 'flex',
    marginBottom: 20
  },
  image: {
    minWidth: 200,
  },
  content: {
    padding: 25,
    objectFit: 'cover'
  }
}
class Post extends Component {
  render() {
    dayjs.extend(relativeTime);
    const { classes, post: { body, createdAt, userImage, userHandle, postId, likeCount, commentCount } } = this.props;
    return (
      <Card className={classes.card}>
        <CardMedia
          className={classes.image}
          image={userImage}
          title="Profile Image"
        />
        <CardContent className={classes.content}>
          <Typography variant="h5"
            component={Link}
            to={`/users/${userHandle}`}
            color="primary"
          >{userHandle}
          </Typography>
          <Typography variant="body2" color="textSecondary">
            {dayjs(createdAt).fromNow()}
          </Typography>
          <Typography variant="body1">
            {body}
          </Typography>
        </CardContent>
      </Card>
    )
  }
}

Post.propTypes = {

}
const mapStateToProps = state => ({
  user: state.user
})
const mapActionsToProps = {
  likePost,
  unlikePost
}
export default connect(mapStateToProps, mapActionsToProps)(withStyles(styles)(Post))
