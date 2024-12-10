import { Components } from '@mui/material';

import {getCssVariable} from '../utils/Colors';
import { breakpoints } from './BasicTypography';
import { PAPER_SMALL_PADDING } from '../utils/utils';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    elevationSmall: true,
    elevationInside: true,
    elevationDashed: true,
    elevationInput: true,
    elevationDarker: true,
    elevationTransparent: true
  }
}

const Paper: Components['MuiPaper'] = {
  styleOverrides: {
    root: {
      variants: [
        {
          props: {
            variant: 'elevation'
          },
          style: {
            backgroundColor: getCssVariable('backgroundColor'),
            borderRadius: 10,
            padding: '2vw 2vw',
          }
        },
        {
          props: {
            variant: 'elevationSmall'
          },
          style: {
            backgroundColor: getCssVariable('backgroundColor'),
            borderRadius: 10,
            [breakpoints.down('md')]: {
              padding: PAPER_SMALL_PADDING.sm
            },
            [breakpoints.only('md')]: {
              padding: PAPER_SMALL_PADDING.md
            },
            [breakpoints.up('lg')]: {
              padding: PAPER_SMALL_PADDING.lg
            }
          }
        },
        {
          props: {
            variant: 'elevationInside'
          },
          style: {
            backgroundColor: getCssVariable('tertiaryColor'),
            borderRadius: 10,
            [breakpoints.down('md')]: {
              padding: PAPER_SMALL_PADDING.sm
            },
            [breakpoints.only('md')]: {
              padding: PAPER_SMALL_PADDING.md
            },
            [breakpoints.up('lg')]: {
              padding: PAPER_SMALL_PADDING.lg
            }
          }
        },
        {
          props: {
            variant: 'elevationDashed'
          },
          style: {
            backgroundColor: getCssVariable('backgroundColor'),
            border: `1px dashed ${getCssVariable('disabledColor')}`,
            borderRadius: 15,
            [breakpoints.down('lg')]: {
              padding: '1vh calc(20px + 4.5vw)'
            },
            [breakpoints.up('lg')]: {
              padding: 'calc(10px + 1vh) calc(50px + 5vw)'
            }
          }
        },
        {
          props: {
            variant: 'elevationInput'
          },
          style: {
            backgroundColor: getCssVariable('backgroundColor'),
            borderRadius: 10,
            [breakpoints.down('md')]: {
              padding: '0.5em 1em',
            },
            [breakpoints.up('md')]: {
              padding: '0.5em 1em',
              paddingLeft: '1.5em'
            }
          }
        },
        {
          props: {
            variant: 'elevationDarker'
          },
          style: {
            backgroundColor: getCssVariable('quaternaryColor'),
            borderRadius: 5,
            padding: '0.6em 0.8em',
            ':hover': {
              cursor: 'pointer',
              backgroundColor: getCssVariable('backgroundColor')
            },
            ':hover .title': {
              color: getCssVariable('textHighlightColor')
            }
          }
        },
        {
          props: {
            variant: 'elevationTransparent'
          },
          style: {
            backgroundColor: 'transparent'
          }
        }
      ]
    }
  }
};

export default Paper;
