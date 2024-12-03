import { Typography } from '@mui/material';
import { useState } from 'react';
import { prominent } from 'color.js';

import UploadPlain from './UploadPlain';
import UIColors, { CustomColors } from '../utils/Colors';
import ColorBlock from './ColorBlock';
import CustomColorPalette from '../types/CustomColorPalette';
import useMediaValue from '../hooks/useMediaValue';
import MediaValue from '../types/MediaValue';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectSettings } from '../store/settings/settingsSlice'; 
import { HexColor } from '../types/HexColor';
import { postColorPalette } from '../store/palette/paletteThunks';

const COLORS_GRID_COLUMNS: MediaValue = {
  xs: '1fr',
  sm: '1fr',
  md: '1fr 1fr',
  lg: '1fr 1fr 1fr',
  xl: '1fr 1fr 1fr'
};

const ColorUploadPlain = () => {
  const columns = useMediaValue(COLORS_GRID_COLUMNS);

  const [file, setFile] = useState<File | undefined>();
  const [url, setUrl] = useState<string>('');
  const [palette, setPalette] = useState<CustomColorPalette>({...UIColors.palette});

  const colorsSet = new Set<HexColor>(Object.values(palette));
  const colors = Array.from(colorsSet.values());

  const {status} = useAppSelector(selectSettings);
  const dispatch = useAppDispatch();

  const extractColors = async (url: string) => {
    const newColors = await prominent(url, {
      amount: Object.keys(CustomColors).length,
      format: 'hex'
    });

    const count = newColors.length;

    const newPalette = palette;
    Object.keys(palette).forEach((key, i) => {
      newPalette[key as keyof CustomColorPalette] = newColors[i % count] as HexColor;
    });

    document.documentElement.style.setProperty('--main', newColors[0] as HexColor);

    setPalette(newPalette);
  };

  const setFileImage = async (image: File | undefined) => {
    if(url) {
      URL.revokeObjectURL(url);
    }

    if(image) {
      const newUrl = URL.createObjectURL(image);
      await extractColors(newUrl);
      setUrl(newUrl);
    } else {
      setUrl('');
      setPalette({...UIColors.palette});
    }

    setFile(image);
  };

  const selectColor = (role: keyof CustomColorPalette) => (color: HexColor) => {
    setPalette((prev) => ({...prev, [role]: color}));
  };

  const onPaletteUpload = () => {
    dispatch(postColorPalette(palette)).then(() => setFile(undefined)).then(() => setUrl(''));
  };

  return (
    <div>
      <Typography variant='h2'>
        Цветовая гамма
      </Typography>

      <UploadPlain
        file={file}
        attentionText='Внимание! Поддерживается только формат SVG!'
        status={status}
        acceptedFormats='.svg'
        setFile={setFileImage}
        onFileUpload={onPaletteUpload}>
          <img src={url} style={{ width: '20vw', margin: 'calc(2vh + 10px)' }} />
      </UploadPlain>

      <div style={{
        width: '100%',
        display: 'grid',
        gridTemplateColumns: columns,
        justifyContent: 'space-between'
      }}>
        {Object.entries(palette).map((entry) => (
          <ColorBlock 
            key={entry[0]}
            role={entry[0] as keyof CustomColorPalette} 
            color={palette[entry[0] as keyof CustomColorPalette]} 
            colors={colors}
            selectColor={selectColor(entry[0] as keyof CustomColorPalette)} />
        ))}
      </div>
    </div>
  );
};

export default ColorUploadPlain;
