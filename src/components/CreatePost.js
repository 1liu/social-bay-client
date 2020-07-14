import React, { Component, Fragment } from 'react'
import PropTypes from 'prop-types'
import MyButton from '../lib/MyButton'
//mui
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import withStyles from '@material-ui/core/styles/withStyles';
import CircularProgress from '@material-ui/core/CircularProgress';
import AddIcon from '@material-ui/icons/Add'
import CloseIcon from '@material-ui/icons/Close'
//redux
import { connect } from 'react-redux'
import { createPost, clearErrors } from '../redux/actions/dataActions'


const styles = (theme) => ({
  ...theme.global,
  progress: {
    position: 'absolute'
  },
  submitButton: {
    position: 'relative',
    float: 'right',
    marginTop: 10
  }
});

class CreatePost extends Component {
  state = {
    open: false,
    body: '',
    errors: {}
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({
        open: false,
        body: '',
        errors: {}
      })
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleOpen = () => {
    this.setState({ open: true });
  }

  handleClose = () => {
    this.props.clearErrors();
    this.setState({
      open: false,
      errors: {}
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const newPost = {
      body: this.state.body
    }
    this.props.createPost(newPost);
  }

  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;
    return (
      <Fragment>
        <MyButton
          tip="Create a new post"
          onClick={this.handleOpen}
        >
          <AddIcon color="primary" />
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
          <DialogTitle>Create new post</DialogTitle>
          <DialogContent>
            <form onSubmit={this.handleSubmit}>
              <TextField
                name='body'
                type='text'
                label='Body'
                multiline
                rows="3"
                placeholder="Your new post"
                className={classes.TextField}
                value={this.state.body}
                onChange={this.handleChange}
                error={errors.body ? true : false}
                helperText={errors.body}
                fullWidth
              />



              <Button type="submit"
                color="primary"
                variant="contained"
                className={classes.submitButton}
                disabled={loading}
              >
                Create
              {loading && (
                  <CircularProgress
                    className={classes.progress}
                    size={30}
                    color='secondary' />
                )}
              </Button>
            </form>
          </DialogContent>

        </Dialog>
      </Fragment>
    )
  }
}

CreatePost.propTypes = {
  createPost: PropTypes.func.isRequired,
  clearErrors: PropTypes.func.isRequired,
  classes: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}

const mapStatetoProps = state => ({
  UI: state.UI
})


export default connect(
  mapStatetoProps, { createPost, clearErrors }
)(withStyles(styles)(CreatePost));
