import MediaValue from '../types/MediaValue';
import useMediaMatch from './useMediaMacth';

const useMediaValue = (value: MediaValue) => {
  const {xSmall, small, medium, large} = useMediaMatch();

  if(xSmall) 
    return value.xs;
  else if(small) 
    return value.sm;
  else if(medium)
    return value.md;
  else if(large) 
    return value.lg;
  return value.xl;
};

export default useMediaValue;
