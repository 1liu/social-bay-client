import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../lib/MyButton'
import dayjs from 'dayjs'
import { Link } from 'react-router-dom'
import LikeButton from './LikeButton'
import Comments from './Comments'
import CommentForm from './CommentForm'
//mui
import ChatIcon from '@material-ui/icons/Chat'
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
import { getPost, clearErrors } from '../redux/actions/dataActions'

const styles = theme => ({
  ...theme.global,
  profileImage: {
    maxWidth: 200,
    height: 200,
    borderRadius: '50%',
    objectFit: 'cover'
  },
  dialogContent: {
    padding: 20
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
    open: false,
    oldPath: '',
    newPath: ''
  }

  componentDidMount() {
    if (this.props.openDialog) {
      this.handleOpen();
    }
  }


  handleOpen = () => {
    let oldPath = window.location.pathname;
    const { userHandle, postId } = this.props;
    const newPath = `/user/${userHandle}/post/${postId}`;

    if (oldPath === newPath) oldPath = `/user/${userHandle}`;
    window.history.pushState(null, null, newPath);
    this.setState({ open: true, oldPath, newPath });
    this.props.getPost(this.props.postId);
  }

  handleClose = () => {
    window.history.pushState(null, null, this.state.oldPath);
    this.setState({ open: false });
    this.props.clearErrors();
  }

  render() {
    const { classes,
      post: { postId, body, createdAt, likeCount, commentCount, userImage, userHandle, comments },
      UI: { loading }
    } = this.props;

    const dialogMarkup = loading ? (
      <div className={classes.spinnerDiv}>
        <CircularProgress size={200} />
      </div>
    ) : (
        <Grid container spacing={2}>
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
            <LikeButton postId={postId} />
            <span>{likeCount} likes</span>
            <MyButton tip="comment">
              <ChatIcon color="primary" />
            </MyButton>
            <span>{commentCount} Comments</span>
            <hr className={classes.invisibleSeparator} />
          </Grid>
          <CommentForm postId={postId} />
          <Comments comments={comments} />
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
  clearErrors: PropTypes.func.isRequired,
  getPost: PropTypes.func.isRequired,
  userHandle: PropTypes.string.isRequired,
  postId: PropTypes.string.isRequired,
  post: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired,
  openDialog: PropTypes.object
}

const mapStatetoProps = state => ({
  post: state.data.post,
  UI: state.UI
})

const mapActionstoProps = {
  getPost,
  clearErrors
}

export default connect(mapStatetoProps, mapActionstoProps)(withStyles(styles)(PostDialog))
