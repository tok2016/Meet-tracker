import { Components } from '@mui/material';

import { TextColors, UIColors } from '../utils/Colors';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    elevationSmall: true,
    elevationInside: true,
    elevationDashed: true,
    elevationInput: true
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
            backgroundColor: UIColors.background,
            borderRadius: 10,
            padding: '2vw 2vw',
          }
        },
        {
          props: {
            variant: 'elevationSmall'
          },
          style: {
            backgroundColor: UIColors.background,
            borderRadius: 10,
            padding: PAPER_SMALL_PADDING,
            ':hover a': {
              color: TextColors.highlight,
              transition: 'color 0.15s'
            }
          }
        },
        {
          props: {
            variant: 'elevationInside'
          },
          style: {
            backgroundColor: UIColors.tertiary,
            borderRadius: 10,
            padding: PAPER_SMALL_PADDING
          }
        },
        {
          props: {
            variant: 'elevationDashed'
          },
          style: {
            backgroundColor: UIColors.background,
            border: `1px dashed ${UIColors.disabled}`,
            borderRadius: 15,
            padding: 'calc(10px + 1vh) calc(50px + 5vh)'
          }
        },
        {
          props: {
            variant: 'elevationInput'
          },
          style: {
            backgroundColor: UIColors.background,
            borderRadius: 10,
            padding: '0.5em 1em',
            paddingLeft: '1.5em'
          }
        }
      ]
    }
  }
};

export default Paper;
export {PAPER_SMALL_PADDING};