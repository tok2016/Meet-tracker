import { Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';

import OllamaLogo from '../../assets/ollamaLogo.svg';
import UIColors from '../../utils/Colors';
import LLMConfig from '../../types/LLMConfig';
import { getLocaleString } from '../../utils/utils';
import MediaValue from '../../types/MediaValue';
import useMediaValue from '../../hooks/useMediaValue';

type LLMPanelProps = {
  llmConfig: LLMConfig, 
  selected: boolean,
  onClick: () => void
};

const LLM_ICON_WIDTH: MediaValue = {
  xs: 30,
  sm: 35,
  md: 40,
  lg: 50,
  xl: 50
};

const LLM_ICON_PADDING: MediaValue = {
  xs: '0.5em',
  sm: '0.5em',
  md: '0.8em',
  lg: '1em',
  xl: '1em'
};

const getSizeString = (size: number): string => {
  const gb = Math.round(size / Math.pow(1024, 3) * 100) / 100;
  return `${gb}GB`;
};

const LLMPanelRaw = ({llmConfig, selected, onClick}: LLMPanelProps) => {
  const iconWidth = useMediaValue(LLM_ICON_WIDTH);
  const iconPadding = useMediaValue(LLM_ICON_PADDING);

  const date = getLocaleString(llmConfig.modifiedAt);
  const size = getSizeString(llmConfig.size);

  return (
    <Paper 
      variant='elevationDarker'
      onClick={onClick}
      sx={(theme) => (theme.components?.MuiPaper 
      ? {
        ...theme.components.MuiPaper,
        display: 'flex',
        flexDirection: 'column',
        gap: '5px',
        maxWidth: '100%',
        backgroundColor: selected ? UIColors.palette.background : UIColors.palette.quaternary,
        border: selected ? `solid 3px ${UIColors.palette.main}` : 'none'
      } : {})}>
        <Stack
          display='flex'
          flexDirection='row'
          gap='calc(10px + 1vw)'>
            <img src={OllamaLogo} width={iconWidth} style={{
              backgroundColor: UIColors.palette.background,
              padding: iconPadding,
              borderRadius: '1em'
            }}/>

            <Stack
              display='flex'
              flexDirection='column'
              width='100%'>
                <Typography className='title' variant='h3' textAlign='left' whiteSpace='wrap'>
                  {llmConfig.name}
                </Typography>

                <Typography variant='subtitle1' textAlign='left'>
                  Compiled by Ollama
                </Typography>
            </Stack>
        </Stack>
        
        <Stack
          display='flex'
          flexDirection='column'>
            <Typography variant='body1'>
              Архитектура: {llmConfig.details.family}
            </Typography>

            <Typography variant='body1'>
              Размер параметров: {llmConfig.details.parameterSize}
            </Typography>

            <Typography variant='body1'>
              Квантование: {llmConfig.details.quantizationLevel}
            </Typography>

            <Typography variant='body1'>
              Последнее обновление: {date}
            </Typography>
        </Stack>

        <Typography variant='h3' textAlign='right'>
          {size}
        </Typography>
    </Paper>
  )
};

const LLMPanel = memo(LLMPanelRaw);

export default LLMPanel;
