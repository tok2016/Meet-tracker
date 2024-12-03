import { TextareaAutosize } from '@mui/material';
import { ChangeEvent, CSSProperties } from 'react';

import UIColors from '../utils/Colors';
import { LgFontSizes, XlFontSizes } from '../theme/FontSizes';
import useMediaMatch from '../hooks/useMediaMacth';

type TextAreaProps = {
  value: string,
  variant: 'body1' | 'body2' | 'body2Highlight',
  hidden: boolean,
  readOnly: boolean,
  className?: string,
  onChange?: (evt: ChangeEvent<HTMLTextAreaElement>) => void,
  onKeyUp: () => void
  onKeyDown: () => void
};

const ColorsForTextArea = {
  body1: UIColors.palette.textMain,
  body2: UIColors.palette.textSecondary,
  body2Highlight: UIColors.palette.textMain
}

const FontWeightsForTextArea = {
  body1: 400,
  body2: 400,
  body2Highlight: 700
}

const TextArea = ({value, variant, hidden, readOnly, className, onChange, onKeyDown, onKeyUp}: TextAreaProps) => {
  const {large, xLarge} = useMediaMatch();

  let fontSize = 18;

  if(xLarge) {
    fontSize = XlFontSizes[variant as keyof object] as number;
  } else if(large) {
    fontSize = LgFontSizes[variant as keyof object] as number;
  }

  const styles: CSSProperties = {
    resize: 'none',
    color: ColorsForTextArea[variant as keyof object],
    fontWeight: FontWeightsForTextArea[variant as keyof object],
    outline: 'none',
    fontSize,
    fontFamily: 'Inter',
    width: '100%'
  };

  return (
    <TextareaAutosize
      style={className === 'outlined'
        ? {
            ...styles,
            border: `solid 3px ${UIColors.palette.main}`,
            borderRadius: 15,
            padding: '0.5em'
          }
        : styles
      }
      hidden={hidden}
      value={value}
      readOnly={readOnly}
      onChange={onChange}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      > 
    </TextareaAutosize>
  );
}

export default TextArea;
