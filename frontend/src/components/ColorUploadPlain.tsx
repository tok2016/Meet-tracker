import { Typography } from '@mui/material';
import { useMemo, useState } from 'react';
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
import { postColorPalette } from '../store/settings/settingsThunks';

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
  const [palette, setPalette] = useState<CustomColorPalette>(UIColors);

  const colors = useMemo(() => {
    const colorsSet = new Set<HexColor>(Object.values(palette).filter((value) => typeof value !== 'function'));
    return Array.from(colorsSet.values());
  }, [palette]);

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

    setPalette(newPalette);
  };

  const setFileImage = (image: File | undefined) => {
    setFile(image);

    if(url) {
      URL.revokeObjectURL(url);
    }

    if(image) {
      const newUrl = URL.createObjectURL(image);
      setUrl(newUrl);
      extractColors(newUrl);
    } else {
      setUrl('');
      setPalette(UIColors);
    }
  };

  const selectColor = (role: keyof CustomColorPalette) => (color: HexColor) => {
    setPalette((prev) => ({...prev, [role]: color}));
  };

  const onPaletteUpload = () => {
    dispatch(postColorPalette(palette));
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
        {Object.entries(CustomColors).map((entry) => (
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
