import { Typography } from '@mui/material';
import { useState } from 'react';

import UploadPlain from '../UploadPlain';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { selectPalette } from '../../store/palette/paletteSlice';
import { postLogo } from '../../store/palette/paletteThunks';
import useMediaValue from '../../hooks/useMediaValue';
import { LOGO_WIDTH } from '../../utils/utils';

const LogoUploadPlain = () => {
  const {logo, status} = useAppSelector(selectPalette);

  const [file, setFile] = useState<File | undefined>();
  const [url, setUrl] = useState<string>(logo);

  const dispatch = useAppDispatch();
  const logoHeight = useMediaValue(LOGO_WIDTH);

  const setFileLogo = (logo: File | undefined) => {
    if(url) {
      URL.revokeObjectURL(url);
    }

    if(logo) {
      const newUrl = URL.createObjectURL(logo);
      setUrl(newUrl);
    } else {
      setUrl('');
    }

    setFile(logo);
  };

  const onLogoUpload = () => {
    if(file) {
      dispatch(postLogo({file, url})).then(() => setFile(undefined));
    }
  };

  return (
    <div>
      <Typography variant='h2'>
        Загрузка логотипа
      </Typography>

      <UploadPlain 
        attentionText={'Допускаются только изображения форматов PNG, JPG, SVG и WEBP'} 
        status={status} 
        file={file}
        inputId='logo' 
        acceptedFormats='.png, .jpg, .jpeg, .svg, .webp'
        setFile={setFileLogo} 
        onFileUpload={onLogoUpload}>
          <img src={url} style={{ height: logoHeight, margin: '10px' }} />
      </UploadPlain>
    </div>
  );
};

export default LogoUploadPlain;
