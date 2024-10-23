import { useMediaQuery } from '@mui/material';

import { breakpoints } from '../utils/theme/BasicTypography';

const useMediaMatch = () => {
  const xSmall = useMediaQuery(breakpoints.down('sm'));
  const small = useMediaQuery(breakpoints.down('md'));
  const medium = useMediaQuery(breakpoints.down('lg'));
  const large = useMediaQuery(breakpoints.down('xl'));
  const xLarge = useMediaQuery(breakpoints.only('xl'));

  return {xSmall, small, medium, large, xLarge};
};

export default useMediaMatch;
