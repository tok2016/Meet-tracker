import { Components } from '@mui/material';

import { UIColors } from '../Colors';

declare module '@mui/material/Paper' {
  interface PaperPropsVariantOverrides {
    elevationSmall: true
  }
}

const Paper: Components['MuiPaper'] = {
  defaultProps: {
    color: UIColors.background,
    variant: 'elevation',
    elevation: 0,
    sx: {
      borderRadius: 10,
      paddingX: 50,
      paddingY: 40
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
