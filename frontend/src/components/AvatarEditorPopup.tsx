import { Button, Dialog, Slider, Stack, Typography } from '@mui/material';
import { SyntheticEvent, useRef, useState } from 'react';
import AvatarEditor from 'react-avatar-editor';

import useMediaValue from '../hooks/useMediaValue';
import { AVATAR_EDITOR_WIDTH } from '../utils/utils';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { postUserAvatar } from '../store/user/userThunks';

const MIN_SCALE = 1;
const MAX_SCALE = 5;
const SCALE_STEP = 0.1;

const MIN_ROTATION = 0;
const MAX_ROTATION = 360;
const ROTATION_STEP = 10;

const AvatarEditorPopup = ({defaultAvatar, open, toggleOpen}: {defaultAvatar: File | undefined, open: boolean, toggleOpen: () => void}) => {
  const editorWidth = useMediaValue(AVATAR_EDITOR_WIDTH) as number;

  const dispatch = useAppDispatch();

  const avatarRef = useRef<AvatarEditor>(null);

  const [scale, setScale] = useState<number>(MIN_SCALE);
  const [rotation, setRotation] = useState<number>(0);
 
  const onScaleChange = (_evt: Event | SyntheticEvent, value: number | number[]) => {
    setScale(typeof value === 'number' ? value : value[0]);
  };

  const onRotationChange = (_evt: Event | SyntheticEvent, value: number | number[]) => {
    setRotation(typeof value === 'number' ? value : value[0]);
  };

  const close = () => {
    toggleOpen();
    setScale(MIN_SCALE);
    setRotation(MIN_ROTATION);
  };

  const onSubmit = () => {
    if(avatarRef.current) {
      avatarRef.current.getImage().toBlob((blob) => {
        if(blob) {
          dispatch(postUserAvatar(blob));
          close();
        }
      }, 'image/*');
    }
  }
  
  if(!defaultAvatar) {
    return;
  }

  return (
    <Dialog open={open} onClose={close}>
      <AvatarEditor 
        ref={avatarRef}
        image={defaultAvatar}
        scale={scale}
        rotate={rotation}
        width={editorWidth}
        height={editorWidth}
        borderRadius={editorWidth / 2}
        border={0}
        />
      
      <Stack spacing={2} direction='row' alignItems='center'>
        <Typography variant='h4' width='4em'>{scale}x</Typography>
        <Slider 
          value={scale}
          min={MIN_SCALE}
          max={MAX_SCALE}
          step={SCALE_STEP}
          onChange={onScaleChange}/>
      </Stack>

      <Stack spacing={2} direction='row' alignItems='center'>
        <Typography variant='h4' width='4em'>{rotation}&#0176;</Typography>
        <Slider 
          value={rotation}
          min={MIN_ROTATION}
          max={MAX_ROTATION}
          step={ROTATION_STEP}
          onChange={onRotationChange}/>
      </Stack>

      <Button 
        variant='containtedSecondary' 
        disabled={!defaultAvatar} 
        onClick={onSubmit}>
        Отправить
      </Button>
    </Dialog>
  );
};

export default AvatarEditorPopup;
