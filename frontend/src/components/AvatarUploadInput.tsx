import { Theme } from '@emotion/react';
import { AccountCircle } from '@mui/icons-material';
import { Avatar, SxProps } from '@mui/material';

import AvatarEditorPopup from './AvatarEditorPopup';
import { ChangeEvent, useReducer, useRef, useState } from 'react';

const AvatarUploadInput = ({sx, defaultAvatar}: {sx: SxProps<Theme>, defaultAvatar: string}) => {
  const [avatar, setAvatar] = useState<File | undefined>(undefined);
  const [open, toggleOpen] = useReducer((value) => !value, false);

  const avatarRef = useRef<HTMLInputElement>(null);

  const onFileChoice = (evt: ChangeEvent<HTMLInputElement>) => {
    if(evt.target.files !== null && evt.target.files.length > 0) {
      const file = evt.target.files[0];
      setAvatar(file);

      if(file) {
        toggleOpen();
      }
    }
  };

  const closePopup = () => {
    setAvatar(undefined);
    
    toggleOpen();
  };

  return (
    <div>
      <input
        ref={avatarRef}
        id='avatar'
        type='file'
        accept='image/*'
        onChange={onFileChoice}
        onClick={(evt) => evt.currentTarget.value = ''} />
      <label htmlFor='avatar'>
        {defaultAvatar ? <Avatar src={defaultAvatar} sx={sx} /> : <AccountCircle sx={sx} />}
      </label>

      <AvatarEditorPopup open={open} toggleOpen={closePopup} defaultAvatar={avatar}/>
    </div>
  );
};

export default AvatarUploadInput;
