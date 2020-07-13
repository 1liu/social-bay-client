import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../lib/MyButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
//mui

import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import CloseIcon from '@material-ui/icons/Close'
import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import UnfoldMoreIcon from '@material-ui/icons/UnfoldMore';
//redux
import { connect } from 'react-redux'
import { getPost } from '../redux/actions/dataActions'

const styles = theme => ({
  invisibleSeparator: {
    border: 'none',
    margin: 4
  },
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
  },
  closeButton: {
    position: 'absolute',
    right: '5%'
  },
  expandButton: {
    position: 'absolute',
    right: '5%'
  },
  spinnerDiv: {
    textAlign: 'center',
    margin: '20px 0 20px 0'
  }

})

class PostDialog extends Component {
  state = {
    open: false
  }
  handleOpen = () => {
    this.setState({ open: true });
    this.props.getPost(this.props.postId);
  }

  handleClose = () => {
    this.setState({ open: false })
  }

  render() {
    const { classes,
      post: { postId, body, createdAt, likeCount, userImage, userHandle },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} />
      </div>
    ) : (
        <Grid container spacing={16}>
          <Grid item sm={5}>
            <img src={userImage} alt="profile" className={classes.profileImage} />
          </Grid>
          <Grid item sm={7}>
            <Typography
              component={Link}
              to={`/user/${userHandle}`}
            >
              @{userHandle}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body2" color="textSecondary">
              {dayjs(createdAt).format('h:mm a, MMMM DD YYYY')}
            </Typography>
            <hr className={classes.invisibleSeparator} />
            <Typography variant="body1" color="textSecondary">
              {body}
            </Typography>
          </Grid>
        </Grid>
      )
    return (
      <Fragment>
        <MyButton tip="Expand Post"
          onClick={this.handleOpen}
          btnClassName={classes.expandButton}>
          <UnfoldMoreIcon color="primary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm">
          <MyButton
            tip="Close"
            onClick={this.handleClose}
            btnClassName={classes.closeButton}
          >
            <CloseIcon />
          </MyButton>
          {/* <DialogTitle>Create new post</DialogTitle> */}
          <DialogContent className={classes.dialogContent}>
            {dialogMarkup}
          </DialogContent>

        </Dialog>
      </Fragment>
    )
  }
}

PostDialog.propTypes = {
  getPost: PropTypes.func.isRequired,
  userHandle: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
  post: state.data.post,
  UI: state.UI
})

const mapActionstoProps = {
  getPost
}

export default connect(mapStatetoProps, mapActionstoProps)(withStyles(styles)(PostDialog))
