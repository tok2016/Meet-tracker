import { BreakpointsOptions, createTheme } from '@mui/material';
import { TypographyOptions } from '@mui/material/styles/createTypography';

import {getCssVariable} from '../utils/Colors';
import { LgFontSizes, MdFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from './FontSizes';

const Breakpoints: BreakpointsOptions = {
  values: {
    xs: 0,
    sm: 300,
    md: 700,
    lg: 1200,
    xl: 1600
  }
};
const defaultTheme = createTheme({breakpoints: Breakpoints});

export const { breakpoints } = defaultTheme;

const BasicTypography: TypographyOptions = {
  fontFamily: 'Inter',
  button: {
    [breakpoints.down('sm')]: {
      fontSize: XsFontSizes.h3,
    },
    [breakpoints.up('sm')]: {
      fontSize: SmFontSizes.h3
    },
    [breakpoints.up('md')]: {
      fontSize: MdFontSizes.h3
    },
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.h3
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.h3
    },
    fontWeight: 400,
    textTransform: 'none',
    padding: 0,
    color: getCssVariable('textContrastColor'),
    backgroundColor: getCssVariable('mainColor'),
    ':hover': {
      backgroundColor: getCssVariable('secondaryColor')
    },
    ':disabled': {
      backgroundColor: getCssVariable('disabledColor')
    },
  },
  h1: {
    [breakpoints.down('sm')]: {
      fontSize: XsFontSizes.h1
    },
    [breakpoints.up('sm')]: {
      fontSize: SmFontSizes.h1
    },
    [breakpoints.up('md')]: {
      fontSize: MdFontSizes.h1
    },
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.h1
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.h1
    }
  },
  h2: {
    [breakpoints.down('sm')]: {
      fontSize: XsFontSizes.h2
    },
    [breakpoints.up('sm')]: {
      fontSize: SmFontSizes.h2
    },
    [breakpoints.up('md')]: {
      fontSize: MdFontSizes.h2
    },
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.h2
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.h2
    }
  },
  h3: {
    [breakpoints.down('sm')]: {
      fontSize: XsFontSizes.h3
    },
    [breakpoints.up('sm')]: {
      fontSize: SmFontSizes.h3
    },
    [breakpoints.up('md')]: {
      fontSize: MdFontSizes.h3
    },
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.h3
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.h3
    }
  },
  h4: {
    [breakpoints.down('sm')]: {
      fontSize: XsFontSizes.h4
    },
    [breakpoints.up('sm')]: {
      fontSize: SmFontSizes.h4
    },
    [breakpoints.up('md')]: {
      fontSize: MdFontSizes.h4
    },
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.h4
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.h4
    }
  },
  body1: {
    [breakpoints.down('sm')]: {
      fontSize: XsFontSizes.body1
    },
    [breakpoints.up('sm')]: {
      fontSize: SmFontSizes.body1
    },
    [breakpoints.up('md')]: {
      fontSize: MdFontSizes.body1
    },
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.body1
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.body1
    }
  },
  body2: {
    [breakpoints.down('sm')]: {
      fontSize: XsFontSizes.body2
    },
    [breakpoints.up('sm')]: {
      fontSize: SmFontSizes.body2
    },
    [breakpoints.up('md')]: {
      fontSize: MdFontSizes.body2
    },
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.body2
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.body2
    }
  },
  subtitle1: {
    [breakpoints.down('sm')]: {
      fontSize: XsFontSizes.subtitle1
    },
    [breakpoints.up('sm')]: {
      fontSize: SmFontSizes.subtitle1
    },
    [breakpoints.up('md')]: {
      fontSize: MdFontSizes.subtitle1
    },
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.subtitle1
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.subtitle1
    }
  },
  subtitle2: {
    [breakpoints.down('sm')]: {
      fontSize: XsFontSizes.subtitle2
    },
    [breakpoints.up('sm')]: {
      fontSize: SmFontSizes.subtitle2
    },
    [breakpoints.up('md')]: {
      fontSize: MdFontSizes.subtitle2
    },
    [breakpoints.up('lg')]: {
      fontSize: LgFontSizes.subtitle2
    },
    [breakpoints.only('xl')]: {
      fontSize: XlFontSizes.subtitle2
    }
  },
}

export default BasicTypography;
