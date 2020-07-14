import React, { Component } from 'react'
import PropTypes from 'prop-types'
//mui
import Button from '@material-ui/core/Button'
import Gird from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
//redux
import { connect } from 'react-redux'
import { submitComment } from '../redux/actions/dataActions'
import { withStyles } from '@material-ui/core'

const styles = theme => ({
  ...theme.global
})

class CommentForm extends Component {
  state = {
    body: '',
    errors: {}
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.props.submitComment(this.props.postId, { body: this.state.body })
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors })
    }
    if (!nextProps.UI.errors && !nextProps.UI.loading) {
      this.setState({ body: '' })
    }
  }

  render() {
    const { classes, authenticated } = this.props;
    const errors = this.state.errors;

    const commentFormMarkup = authenticated ? (
      <Gird item sm={12} style={{ textAlign: "center" }}>
        <form onSubmit={this.handleSubmit}>
          <TextField
            name="body"
            type="text"
            label="Comment"
            error={errors.comment ? true : false}
            helperText={errors.comment}
            value={this.state.body}
            onChange={this.handleChange}
            fullWidth
            className={classes.textField}
          ></TextField>
          <Button type="submit"
            variant="contained"
            color="primary"
            className={classes.button}
          >Submit</Button>
        </form>
        <hr className={classes.visibleSeparator} />
      </Gird>
    ) : null

    return commentFormMarkup;
  }
}

CommentForm.propTypes = {
  submitComment: PropTypes.func.isRequired,
  UI: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  classes: PropTypes.object.isRequired,
  postId: PropTypes.string.isRequired
}

const mapStatetoProps = state => ({
  UI: state.UI,
  authenticated: state.user.authenticated
})

export default connect(mapStatetoProps, { submitComment })(withStyles(styles)(CommentForm))
