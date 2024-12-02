import { BreakpointsOptions, createTheme } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

import UIColors from '../utils/Colors';
import { LgFontSizes, XlFontSizes } from './FontSizes';

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
      fontSize: LgFontSizes.h3
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.h3
    },
    fontWeight: 400,
    textTransform: 'none',
    padding: 0,
    color: UIColors.textContrast,
    backgroundColor: UIColors.main,
    ':disabled': {
      backgroundColor: UIColors.tertiary,
    },
    ':hover': {
      backgroundColor: UIColors.background,
      color: UIColors.textHighlight,
    }
  },
  h1: {
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.h1
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.h1
    }
  },
  h2: {
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.h2
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.h2
    }
  },
  h3: {
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.h3
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.h3
    }
  },
  h4: {
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.h4
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.h4
    }
  },
  body1: {
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.body1
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.body1
    }
  },
  body2: {
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.body2
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.body2
    }
  },
  subtitle1: {
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.subtitle1
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.subtitle1
    }
  },
  subtitle2: {
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.subtitle2
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.subtitle2
    }
  },
}

export default BasicTypography;
