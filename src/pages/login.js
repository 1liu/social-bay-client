import React, { Component } from 'react'
import { TextField } from '@material-ui/core';
import withStyles from '@material-ui/core/styles/withStyles'
import PropTypes from 'prop-types'
//MUI
import Grid from '@material-ui/core/Grid'
const styles = {
  form: {
    textAlign: 'center'
  }
}
class Login extends Component {
  render() {
    const { classes } = this.props;
    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>Login</Grid>
        <Grid item sm></Grid>
      </Grid>
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);
