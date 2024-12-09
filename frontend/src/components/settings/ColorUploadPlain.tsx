import { Button, Stack, Typography } from '@mui/material';
import { useMemo, useState } from 'react';
import { prominent } from 'color.js';

import UploadPlain from '../UploadPlain';
import UIColors, { CustomColors } from '../../utils/Colors';
import ColorBlock from './ColorBlock';
import CustomColorPalette from '../../types/CustomColorPalette';
import useMediaValue from '../../hooks/useMediaValue';
import MediaValue from '../../types/MediaValue';
import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { HexColor } from '../../types/HexColor';
import { postColorPalette } from '../../store/palette/paletteThunks';
import { selectPalette } from '../../store/palette/paletteSlice';
import ColorRoleBlock from './ColorRoleBlock';

const ROLE_GRID_COLUMNS: MediaValue = {
  xs: '1fr',
  sm: '1fr',
  md: '1fr 1fr',
  lg: '1fr 1fr 1fr',
  xl: '1fr 1fr 1fr'
};

const COLOR_GRID_COLUMNS: MediaValue = {
  xs: '1fr 1fr',
  sm: '1fr 1fr',
  md: '1fr 1fr 1fr',
  lg: '1fr 1fr 1fr 1fr',
  xl: '1fr 1fr 1fr 1fr'
};

const ColorUploadPlain = () => {
  const roleColumns = useMediaValue(ROLE_GRID_COLUMNS);
  const colorColumns = useMediaValue(COLOR_GRID_COLUMNS);

  const {status, palette: defaultPalette} = useAppSelector(selectPalette);
  const dispatch = useAppDispatch();

  const [file, setFile] = useState<File | undefined>();
  const [url, setUrl] = useState<string>('');
  const [palette, setPalette] = useState<CustomColorPalette>({...UIColors.palette});
  const [colors, setColors] = useState<HexColor[]>(() => {
    const colorsSet = new Set<HexColor>(Object.values(defaultPalette));
    return Array.from(colorsSet.values());
  });

  const disabled = useMemo(() => JSON.stringify(defaultPalette) === JSON.stringify(palette), [palette, defaultPalette]);

  const extractColors = async (url: string) => {
    const newColors = await prominent(url, {
      amount: Object.keys(CustomColors).length,
      format: 'hex'
    }) as HexColor[];

    setColors(newColors);

    const count = newColors.length;

    const newPalette = palette;
    Object.keys(palette).forEach((key, i) => {
      newPalette[key as keyof CustomColorPalette] = newColors[i % count] as HexColor;
    });

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

  const onPaletteUpload = async () => {
    try {
      await dispatch(postColorPalette(palette));
      setFile(undefined);
      setUrl('');
    } catch {}
  };

  return (
    <Stack 
      display='flex' 
      flexDirection='column' 
      gap='20px' 
      alignItems='center'>
        <Typography variant='h2'>
          Цветовая гамма
        </Typography>

        <UploadPlain
          file={file}
          attentionText='Внимание! Поддерживается только формат SVG!'
          status={status}
          acceptedFormats='.svg'
          inputId='palette'
          hideSubmitButton
          setFile={setFileImage}
          onFileUpload={onPaletteUpload}>
            <img src={url} style={{ width: '20vw', margin: 'calc(2vh + 10px)' }} />
        </UploadPlain>

        <div style={{
          width: '100%',
          display: 'grid',
          gridTemplateColumns: colorColumns,
          rowGap: '10px',
          justifyContent: 'space-between'
        }}>
          {colors.map((color) => 
            <ColorBlock key={color} color={color} />
          )}
        </div>

        <div style={{
          width: '100%',
          display: 'grid',
          rowGap: '10px',
          gridTemplateColumns: roleColumns,
          justifyContent: 'space-between'
        }}>
          {Object.entries(palette).map((entry) => (
            <ColorRoleBlock 
              key={entry[0]}
              role={entry[0] as keyof CustomColorPalette} 
              color={palette[entry[0] as keyof CustomColorPalette]} 
              colors={colors}
              selectColor={selectColor(entry[0] as keyof CustomColorPalette)} />
          ))}
        </div>

        <Button
          variant='containtedSecondary'
          disabled={disabled}
          onClick={onPaletteUpload}>
            Отрпавить
        </Button>
    </Stack>
  );
};

export default ColorUploadPlain;
