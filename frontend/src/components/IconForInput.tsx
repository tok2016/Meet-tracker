import { HTMLInputTypeAttribute } from 'react';
import { Tag, Info, Email, Key } from '@mui/icons-material';

import { TextColors } from '../utils/Colors';
import { INPUT_ICON_WIDTH } from '../utils/utils';

const IconForInput = ({type, readOnly}: {type: HTMLInputTypeAttribute, readOnly: boolean}) => {
  switch(type) {
    case 'email':
      return <Email sx={{color: TextColors.main, width: INPUT_ICON_WIDTH, height: INPUT_ICON_WIDTH}} />
    case 'password': 
      return <Key sx={{color: TextColors.main, width: INPUT_ICON_WIDTH, height: INPUT_ICON_WIDTH}} />
  }
  return readOnly 
    ? <Tag sx={{color: TextColors.main, width: INPUT_ICON_WIDTH, height: INPUT_ICON_WIDTH}} /> 
    : <Info sx={{color: TextColors.main, width: INPUT_ICON_WIDTH, height: INPUT_ICON_WIDTH}} />
};

export default IconForInput;
