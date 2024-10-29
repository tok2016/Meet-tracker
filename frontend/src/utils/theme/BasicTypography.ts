import { BreakpointsOptions, createTheme } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

import { TextColors, UIColors } from '../Colors';

const Breakpoints: BreakpointsOptions = {
  values: {
    xs: 0,
    sm: 600,
    md: 900,
    lg: 1200,
    xl: 1600
  }
};
const defaultTheme = createTheme({breakpoints: Breakpoints});

export const { breakpoints } = defaultTheme;

const BasicTypography: TypographyOptions = {
  fontFamily: 'Inter',
  button: {
    [breakpoints.up('lg')]: {
      fontSize: 24
    },
    [breakpoints.only('xl')]: {
      fontSize: 32
    },
    fontWeight: 400,
    textTransform: 'none',
    padding: 0,
    color: TextColors.contrast,
    backgroundColor: UIColors.main,
    ':disabled': {
      backgroundColor: UIColors.tertiary,
    },
    ':hover': {
      backgroundColor: UIColors.background,
      color: TextColors.highlight,
    }
  },
  h1: {
    [breakpoints.up('lg')]: {
      fontSize: 48
    },
    [breakpoints.only('xl')]: {
      fontSize: 64
    }
  },
  h2: {
    [breakpoints.up('lg')]: {
      fontSize: 32
    },
    [breakpoints.only('xl')]: {
      fontSize: 40
    }
  },
  h3: {
    [breakpoints.up('lg')]: {
      fontSize: 24
    },
    [breakpoints.only('xl')]: {
      fontSize: 32
    }
  },
  h4: {
    [breakpoints.up('lg')]: {
      fontSize: 24
    },
    [breakpoints.only('xl')]: {
      fontSize: 32
    }
  },
  body1: {
    [breakpoints.up('lg')]: {
      fontSize: 20
    },
    [breakpoints.only('xl')]: {
      fontSize: 32
    }
  },
  body2: {
    [breakpoints.up('lg')]: {
      fontSize: 20
    },
    [breakpoints.only('xl')]: {
      fontSize: 32
    }
  },
  subtitle1: {
    [breakpoints.up('lg')]: {
      fontSize: 12
    },
    [breakpoints.only('xl')]: {
      fontSize: 16
    }
  },
  subtitle2: {
    [breakpoints.up('lg')]: {
      fontSize: 12
    },
    [breakpoints.only('xl')]: {
      fontSize: 16
    }
  },
}

export default BasicTypography;
