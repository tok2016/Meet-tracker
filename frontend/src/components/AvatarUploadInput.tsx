import { Theme } from '@emotion/react';
import { AccountCircle } from '@mui/icons-material';
import { Avatar, SxProps } from '@mui/material';

import AvatarEditorPopup from './AvatarEditorPopup';
import { ChangeEvent, useReducer, useRef, useState } from 'react';

type AvatarUploadInputProps = {
  sx: SxProps<Theme>, 
  defaultAvatar: string, 
  isForAdmin: boolean,
  disabled: boolean,
  userId: number
};

const AvatarUploadInput = ({sx, defaultAvatar, userId, isForAdmin=false, disabled=false}: AvatarUploadInputProps) => {
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
        disabled={disabled}
        onChange={onFileChoice}
        onClick={(evt) => evt.currentTarget.value = ''} />
      <label htmlFor='avatar'>
        {defaultAvatar ? <Avatar src={defaultAvatar} sx={sx} /> : <AccountCircle sx={sx} />}
      </label>

      <AvatarEditorPopup 
        open={open} 
        isForAdmin={isForAdmin}
        userId={userId}
        toggleOpen={closePopup} 
        defaultAvatar={avatar}/>
    </div>
  );
};

export default AvatarUploadInput;
