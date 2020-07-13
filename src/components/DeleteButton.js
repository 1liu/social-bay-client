import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'

//MUI
import withStyles from '@material-ui/core/styles/withStyles'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogTitle from '@material-ui/core/DialogTitle'
import DeleteIcon from '@material-ui/icons/DeleteOutline'
// redux
import { connect } from 'react-redux'
import { deletePost } from '../redux/actions/dataActions'
import MyButton from 'lib/MyButton'

const styles = theme => ({
  deleteButton: {
    position: 'absolute',
    right: '5%',
    top: '5%'
  }
})
class DeleteButton extends Component {
  state = {
    open: false
  }
  handleOpen = () => {
    this.setState({ open: true });
  }
  handleClose = () => {
    this.setState({ open: false });
  }
  handleDelete = () => {
    this.props.deletePost(this.props.postId);
    this.setState({ open: false })
  }
  render() {
    const { classes } = this.props;
    return (
      <Fragment>
        <MyButton tip="Delete Post"
          onClick={this.handleOpen}
          btnClassName={classes.deleteButton}
        >
          <DeleteIcon color="secondary" />
        </MyButton>
        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Are you sure you want to delete it?</DialogTitle>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary">
              Cancel
              </Button>
            <Button onClick={this.handleDelete} color="secondary">
              Delete
              </Button>
          </DialogActions>
        </Dialog>
      </Fragment>
    )
  }
}
DeleteButton.propTypes = {
  deletePost: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
}
export default connect(null, { deletePost })(withStyles(styles)(DeleteButton))
