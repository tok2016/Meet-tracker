import { Paper, Stack, Typography } from '@mui/material';
import { memo } from 'react';

import OllamaLogo from '../../assets/ollamaLogo.svg';
import UIColors from '../../utils/Colors';
import LLMConfig from '../../types/LLMConfig';
import { getLocaleString } from '../../utils/utils';

type LLMPanelProps = {
  llmConfig: LLMConfig, 
  selected: boolean,
  onClick: () => void
};

const getSizeString = (size: number): string => {
  const gb = Math.round(size / Math.pow(1024, 3) * 100) / 100;
  return `${gb}GB`;
};

const LLMPanelRaw = ({llmConfig, selected, onClick}: LLMPanelProps) => {
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
        width: '100%',
        backgroundColor: selected ? UIColors.palette.background : UIColors.palette.quaternary,
        border: selected ? `solid 3px ${UIColors.palette.main}` : 'none'
      } : {})}>
        <Stack
          display='flex'
          flexDirection='row'
          gap='calc(10px + 1vw)'>
            <img src={OllamaLogo} style={{
              width: '50px',
              backgroundColor: UIColors.palette.background,
              padding: '1em',
              borderRadius: '1em'
            }}/>

            <Stack
              display='flex'
              flexDirection='column'>
                <Typography className='title' variant='h3' textAlign='left'>
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
