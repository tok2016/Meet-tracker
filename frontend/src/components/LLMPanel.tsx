import { Paper, Stack, Typography } from '@mui/material';

import OllamaLogo from '../assets/ollamaLogo.svg';
import { UIColors } from '../utils/Colors';

const LLMPanel = () => (
  <Paper 
    variant='elevationDarker'
    sx={(theme) => (theme.components?.MuiPaper 
    ? {
      ...theme.components.MuiPaper,
      display: 'flex',
      flexDirection: 'column',
      gap: '5px',
      width: '100%',
    } : {})}>
      <Stack
        display='flex'
        flexDirection='row'
        gap='calc(10px + 1vw)'>
          <img src={OllamaLogo} style={{
            width: '50px',
            backgroundColor: UIColors.background,
            padding: '1em',
            borderRadius: '1em'
          }}/>

          <Stack
            display='flex'
            flexDirection='column'>
              <Typography variant='h3' textAlign='left'>
                LLama 3.1
              </Typography>

              <Typography variant='subtitle1' textAlign='left'>
                Compiled by Oliama
              </Typography>
          </Stack>
      </Stack>
      
      <Stack
        display='flex'
        flexDirection='column'>
          <Typography variant='body1'>
            Доступ: Публичный
          </Typography>

          <Typography variant='body1'>
            Hugging face: Да
          </Typography>
      </Stack>

      <Typography variant='h3' textAlign='right'>
        Stable
      </Typography>
  </Paper>
);

export default LLMPanel;
