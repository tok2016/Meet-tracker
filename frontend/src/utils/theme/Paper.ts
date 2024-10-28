import { Components } from '@mui/material';

import { UIColors } from '../Colors';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    elevationSmall: true,
    elevationInside: true,
    elevationDashed: true
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
            padding: PAPER_SMALL_PADDING
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
            border: `1px dashed ${UIColors.quaternary}`,
            borderRadius: 15,
            padding: 'calc(10px + 1vh) calc(50px + 5vh)'
          }
        }
      ]
    }
  }
};

export default Paper;
export {PAPER_SMALL_PADDING};
