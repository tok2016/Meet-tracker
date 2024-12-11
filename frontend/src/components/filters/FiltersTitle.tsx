import { Stack, Typography } from '@mui/material';
import { FilterAlt } from '@mui/icons-material';

import useMediaMatch from '../../hooks/useMediaMacth';

const FiltersTitle = () => {
  const {medium} = useMediaMatch();

  return (
    <Stack display='flex' flexDirection='row' gap='5px' marginBottom={medium ? '10px' : 0} alignSelf='center'>
      <FilterAlt sx={{order: medium ? 2 : 1}} />
      <Typography variant={medium ? 'body1' : 'h3'} style={{order: medium ? 1 : 2}}>
        Сортировка:
      </Typography>
    </Stack>
  );
}

export default FiltersTitle;
