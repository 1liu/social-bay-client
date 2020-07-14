import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3F51B5',
      light: '#5EA7DB'
    },
    secondary: red
  },
  global: {
    invisibleSeparator: {
      border: 'none',
      margin: 4
    },
    visibleSeparator: {
      width: '100%',
      borderBottom: '1px solid rgba(0,0,0,0.1)',
      marginBottom: 20
    },
    closeButton: {
      position: 'absolute',
      right: '5%'
    },
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
  },

});

export default theme;
