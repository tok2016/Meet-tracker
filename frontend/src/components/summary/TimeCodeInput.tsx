import { Input, Typography } from '@mui/material';
import { ChangeEvent } from 'react';

import { breakpoints } from '../../theme/BasicTypography';
import { LgFontSizes, MdFontSizes, SmFontSizes, XlFontSizes, XsFontSizes } from '../../theme/FontSizes';

type TimeCodeInputProps = {
  timeCode: string,
  isEditable: boolean,
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  onClick: () => void
};

const TimeCodeInput = ({timeCode, isEditable, onClick, onChange}: TimeCodeInputProps) => {
  if(isEditable) {
    return (
      <Input
        type='time'
        value={timeCode}
        onChange={onChange}
        sx={{
          width: '7em',
          fontWeight: 700,
          [breakpoints.down('sm')]: {
            fontSize: XsFontSizes.subtitle1
          },
          [breakpoints.up('sm')]: {
            fontSize: SmFontSizes.subtitle1
          },
          [breakpoints.up('md')]: {
            fontSize: MdFontSizes.h4
          },
          [breakpoints.up('lg')]: {
            fontSize: LgFontSizes.h4
          },
          [breakpoints.only('xl')]: {
            fontSize: XlFontSizes.h4
          }
        }} />
    );
  }

  return (
    <Typography variant='h4' component='a' onClick={onClick}>
      {timeCode}
    </Typography>
  );
};

export default TimeCodeInput;
