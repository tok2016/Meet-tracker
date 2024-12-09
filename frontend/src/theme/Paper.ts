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
            backgroundColor: getCssVariable('background'),
            borderRadius: 10,
            padding: '2vw 2vw',
          }
        },
        {
          props: {
            variant: 'elevationSmall'
          },
          style: {
            backgroundColor: getCssVariable('background'),
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
            backgroundColor: getCssVariable('tertiary'),
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
            backgroundColor: getCssVariable('background'),
            border: `1px dashed ${getCssVariable('disabled')}`,
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
            backgroundColor: getCssVariable('background'),
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
            backgroundColor: getCssVariable('quaternary'),
            borderRadius: 5,
            padding: '0.6em 0.8em',
            ':hover': {
              cursor: 'pointer',
              backgroundColor: getCssVariable('background')
            },
            ':hover .title': {
              color: getCssVariable('textHighlight')
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
