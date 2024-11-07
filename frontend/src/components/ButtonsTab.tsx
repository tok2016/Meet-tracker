import { Button, Stack } from '@mui/material';
import Page from '../utils/types/Page';
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';

const ButtonsTab = ({pages}: {pages: Page[]}) => {
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const [path, setPath] = useState<string>(pathname);

  const onButtonPageClick = (pagePath: string) => {
    navigate(pagePath);
    setPath(pagePath);
  };

  return (
    <Stack
      display='flex'
      flexDirection='row'
      gap='3.5vw'
      width='100%'
      marginBottom='45px'
      sx={{
        overflowX: 'auto'
      }}>
      {pages.map((page) => {
        const pagePath = typeof page.path === 'function' ? page.path('1') : page.path;

        return (
          <Button
            key={pagePath}
            variant={pagePath === path || page.highlight ? 'containtedTabSelected' : 'containtedTab'}
            onClick={() => onButtonPageClick(pagePath)}>
              {page.name}
          </Button>
        )
      })}
    </Stack>
  );
};

export default ButtonsTab;
