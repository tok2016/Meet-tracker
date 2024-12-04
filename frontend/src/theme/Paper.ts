import { Components } from '@mui/material';

import {getCssVariable} from '../utils/Colors';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    elevationSmall: true,
    elevationInside: true,
    elevationDashed: true,
    elevationInput: true,
    elevationDarker: true
  }
}

const PAPER_SMALL_PADDING = '1.5em';

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
            padding: PAPER_SMALL_PADDING
          }
        },
        {
          props: {
            variant: 'elevationInside'
          },
          style: {
            backgroundColor: getCssVariable('tertiary'),
            borderRadius: 10,
            padding: PAPER_SMALL_PADDING
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
            padding: 'calc(10px + 1vh) calc(50px + 5vh)'
          }
        },
        {
          props: {
            variant: 'elevationInput'
          },
          style: {
            backgroundColor: getCssVariable('background'),
            borderRadius: 10,
            padding: '0.5em 1em',
            paddingLeft: '1.5em'
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
        }
      ]
    }
  }
};

export default Paper;
export {PAPER_SMALL_PADDING};
