import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';
import grey from '@material-ui/core/colors/grey';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3F51B5',
      light: '#5EA7DB'
    },
    secondary: red
  },
  status: {
    danger: 'red'
  },
  background: {
    darkgrey: grey[300],
    lightgrey: grey[100]
  }/* ,
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
  } */
});

export default theme;
