import { Theme, createTheme } from '@mui/material/styles';
import { createBreakpoints } from '@mui/system';
import { breakpointsTheme } from './breakpointsTheme';
import { componentsTheme } from './componentsTheme';

declare module "@mui/material/styles" {
  interface BreakpointOverrides {
    xs: true;
    sm: true;
    md: true;
    lg: true;
    xl: true;
    xxl: true;
  }
}

const breakpoints = createBreakpoints({ ...breakpointsTheme });
const palette = {
  background: {
    default: '#493B2A',
    paper: '#593F62'
  },
  text: {
    primary: '#fff',
    secondary: '#1a1a1a',
  }
}

export const themeOptions = createTheme({
  palette: {
    ...palette
  },
  breakpoints: {
    ...breakpoints
  },
  ...componentsTheme(palette)
});