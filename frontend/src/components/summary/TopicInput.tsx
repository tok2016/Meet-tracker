import { Input } from '@mui/material';
import { ChangeEvent } from 'react';

import { breakpoints } from '../../theme/BasicTypography';
import { LgFontSizes, MdFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from '../../theme/FontSizes';

type TopicInputProps = {
  type: 'text' | 'time' | 'date' | 'number' | 'email' | 'tel',
  value: string,
  width: string | number,
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  onKeyUp?: () => void,
  onKeyDown?: () => void
};

const TopicInput = ({type, value, width, onChange, onKeyDown, onKeyUp}: TopicInputProps) => (
  <Input
    type={type}
    disableUnderline
    value={value}
    itemType=''
    onChange={onChange}
    onKeyUp={onKeyUp}
    onKeyDown={onKeyDown}
    sx={{
      fontWeight: 700,
      [breakpoints.down('sm')]: {
        fontSize: XsFontSizes.h4
      },
      [breakpoints.up('sm')]: {
        fontSize: SmFontSizes.h4
      },
      [breakpoints.up('md')]: {
        fontSize: MdFontSizes.h4
      },
      [breakpoints.up('lg')]: {
        fontSize: LgFontSizes.h3
      },
      [breakpoints.only('xl')]: {
        fontSize: XlFontSizes.h3
      },
      width,
      maxWidth: '50%',
      '& .MuiInputBase-input': {
        overflow: "hidden",
        textOverflow: "ellipsis"
      }
  }} />
);

export default TopicInput;
