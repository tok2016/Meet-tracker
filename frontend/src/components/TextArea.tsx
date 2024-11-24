import { TextareaAutosize } from '@mui/material';
import { CSSProperties, Dispatch, SetStateAction } from 'react';

import { TextColors } from '../utils/Colors';
import { LgFontSizes, XlFontSizes } from '../theme/FontSizes';
import useMediaMatch from '../hooks/useMediaMacth';

type TextAreaProps = {
  value: string,
  variant: 'body1' | 'body2' | 'body2Highlight',
  hidden: boolean,
  readOnly: boolean,
  setter: Dispatch<SetStateAction<string>>,
  onKeyUp: () => void
  onKeyDown: () => void
};

const ColorsForTextArea = {
  body1: TextColors.main,
  body2: TextColors.secondary,
  body2Highlight: TextColors.main
}

const FontWeightsForTextArea = {
  body1: 400,
  body2: 400,
  body2Highlight: 700
}

const TextArea = ({value, variant, hidden, readOnly, setter, onKeyDown, onKeyUp}: TextAreaProps) => {
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
      style={styles}
      hidden={hidden}
      value={value}
      readOnly={readOnly}
      onChange={(evt) => setter(evt.target.value)}
      onKeyDown={onKeyDown}
      onKeyUp={onKeyUp}
      > 
    </TextareaAutosize>
  );
}

export default TextArea;
