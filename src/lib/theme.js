import { createMuiTheme } from '@material-ui/core/styles';
import red from '@material-ui/core/colors/red';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#3F51B5',
      light: '#5EA7DB'
    },
    secondary: red
  }
});

export default theme;
