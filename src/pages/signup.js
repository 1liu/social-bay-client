import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import AppIcon from '../images/icon.png'
import axios from 'axios'
//MUI
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';
import TextField from '@material-ui/core/TextField';
import withStyles from '@material-ui/core/styles/withStyles'
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
// redux
import { connect } from 'react-redux'
import { signupUser } from '../redux/actions/userActions'

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

class Signup extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      confirmedPassword: '',
      handle: '',
      errors: {

      }
    }
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.UI.errors) {
      this.setState({ errors: nextProps.UI.errors });
    }
  }

  handleSubmit = (event) => {
    event.preventDefault();
    this.setState({ loading: true });
    const userData = {
      email: this.state.email,
      password: this.state.password,
      confirmedPassword: this.state.confirmedPassword,
      handle: this.state.handle
    };
    /* axios.post('/signup', userDate)
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
      ]) */
    this.props.signupUser(userData, this.props.history);
    console.log('submitted');
  }
  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  render() {
    const { classes, UI: { loading } } = this.props;
    const { errors } = this.state;

    return (
      <Grid container className={classes.form}>
        <Grid item sm></Grid>
        <Grid item sm>
          <img src={AppIcon} alt="appIcon" className={classes.image} />
          <Typography variant="h2"
            className={classes.pageTitle}>
            Signup
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
            <TextField
              id="confirmedPassword"
              name="confirmedPassword"
              type="password"
              label="ConfirmedPassword"
              fullWidth
              className={classes.textField}
              helperText={errors.confirmedPassword}
              error={errors.confirmedPassword ? true : false}
              value={this.state.confirmedPassword}
              onChange={this.handleChange}
            >
            </TextField>
            <TextField
              id="handle"
              name="handle"
              type="text"
              label="Handle"
              fullWidth
              className={classes.textField}
              helperText={errors.handle}
              error={errors.handle ? true : false}
              value={this.state.handle}
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
              Signup
              {loading && (
                <CircularProgress
                  className={classes.progress}
                  size={30}
                  color='secondary' />
              )}
            </Button>

            <Link to='/login'>
              <small>
                Back to Login Page
            </small>
            </Link>

          </form>
        </Grid>
        <Grid item sm></Grid>
      </Grid >
    )
  }
}

Signup.propTypes = {
  classes: PropTypes.object.isRequired,
  signupUser: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  UI: PropTypes.object.isRequired
}
const mapStateToProps = (state) => ({
  user: state.user,
  UI: state.UI
})

const mapActionsToProps = {
  signupUser
}
export default connect(
  mapStateToProps,
  mapActionsToProps
)(withStyles(styles)(Signup));
