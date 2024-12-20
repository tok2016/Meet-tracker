import { Stack, Typography } from '@mui/material';
import { Variant } from '@mui/material/styles/createTypography';
import { FilterAlt } from '@mui/icons-material';

import useMediaMatch from '../../hooks/useMediaMacth';

const FiltersTitle = () => {
  const {small, medium} = useMediaMatch();
  
  let variant: Variant = 'h3';
  if(small) {
    variant = 'body1';
  } else if(medium) {
    variant = 'h4';
  }

  return (
    <Stack display='flex' flexDirection='row' gap='5px' marginBottom={medium ? '10px' : 0} alignSelf='center'>
      <FilterAlt sx={{order: medium ? 2 : 1}} />
      <Typography variant={variant} style={{order: medium ? 1 : 2}}>
        Сортировка:
      </Typography>
    </Stack>
  );
}

export default FiltersTitle;
