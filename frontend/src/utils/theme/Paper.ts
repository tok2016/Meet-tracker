import { Components } from '@mui/material';

import { UIColors } from '../Colors';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    elevationSmall: true
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
        }
      ]
    }
  }
};

export default Paper;
export {PAPER_SMALL_PADDING};
