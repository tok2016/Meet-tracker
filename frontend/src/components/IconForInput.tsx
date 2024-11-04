import { HTMLInputTypeAttribute } from 'react';
import { Tag, Info, Email, Key } from '@mui/icons-material';

import { TextColors } from '../utils/Colors';
import { UserIconSx } from '../utils/theme/UserIcon';

const IconForInput = ({type, readOnly}: {type: HTMLInputTypeAttribute, readOnly: boolean}) => {
  const sx = {...UserIconSx, color: TextColors.main };

  switch(type) {
    case 'email':
      return <Email sx={sx} />
    case 'password': 
      return <Key sx={sx} />
  }
  return readOnly 
    ? <Tag sx={sx} /> 
    : <Info sx={sx} />
};

export default IconForInput;
