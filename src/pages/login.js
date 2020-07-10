import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
//MUI
import Grid from '@material-ui/core/Grid'
const styles = {
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto',
    width: 100
  }
}

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {}
    }
  }
  handleSubmit = (event) => {
    console.log('submitted')
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={AppIcon} alt="appIcon" className={classes.image} />
          <Typography variant="h2"
            className={classes.pageTitle}>
            Login
            </Typography>
          <form noValidate onSubmit={this.handleSubmit}>
            <TextField
              id="email"
              name="email"
              type="email"
              label="Email"
              fullWidth
              className={classes.textField}
              value={this.state.email}
              onChange={this.handleChange}
            >
            </TextField>
          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);
