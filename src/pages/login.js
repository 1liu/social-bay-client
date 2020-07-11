import React, { Component } from 'react'
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import axios from 'axios'
//MUI
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
const styles = theme => ({
  form: {
    textAlign: 'center'
  },
  image: {
    margin: '20px auto 20px auto',
    width: 100
  },
  button: {
    margin: 10
  },
  pageTitle: {
    margin: '10px auto 10px auto',
  },
  textField: {
    margin: '10px auto 10px auto',
  },
  customError: {
    color: 'red',
    fontSize: 12
  },
  progress: {
    position: 'absolute'
  }
})


class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      loading: false,
      errors: {

      }
    }
  }
  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const userDate = {
      email: this.state.email,
      password: this.state.password
    };
    axios.post('/login', userDate)
      .then(res => {
        console.log(res.data);
        localStorage.setItem('FBIdToken', `Bearer ${res.data.token}`);
        this.setState({ loading: false });
        this.props.history.push('/');
      })
      .catch(err => [
        this.setState({
          errors: err.response.data,
          loading: false
        })
      ])
    console.log('submitted');
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes } = this.props;
    const { errors, loading } = this.state;

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
              helperText={errors.email}
              error={errors.email ? true : false}
              value={this.state.email}
              onChange={this.handleChange}
            >
            </TextField>
            <TextField
              id="password"
              name="password"
              type="password"
              label="Password"
              fullWidth
              className={classes.textField}
              helperText={errors.password}
              error={errors.password ? true : false}
              value={this.state.password}
              onChange={this.handleChange}
            >
            </TextField>
            {errors.general && (
              <Typography variant='body2'
                className={classes.customError}>
                {errors.general}
              </Typography>
            )}
            <Button
              variant="contained"
              color="primary"
              className={classes.button}
              onClick={this.handleSubmit}
            >
              Login
              {loading && (
                <CircularProgress
                  className={classes.progress}
                  size={30}
                  color='secondary' />
              )}
            </Button>

            <Link to='/signup'>
              <Button
                variant="contained"
                color="primary"
                className={classes.button}
              >
                Signup
            </Button>
            </Link>

          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid >
    )
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withStyles(styles)(Login);
