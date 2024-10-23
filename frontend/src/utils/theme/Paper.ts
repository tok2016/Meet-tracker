import { Components } from '@mui/material';

import { UIColors } from '../Colors';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    elevationSmall: true
  }
}

const Paper: Components['MuiPaper'] = {
  defaultProps: {
    color: UIColors.main,
    variant: 'elevation',
    elevation: 0,
    sx: {
      borderRadius: 10,
      paddingX: '2.6vw',
      paddingY: '3.7vh',
    },
  },
  variants: [
    {
      props: {
        variant: 'elevationSmall'
      },
      style: {
        padding: 30
      }
    }
  ]
};

export default Paper;
