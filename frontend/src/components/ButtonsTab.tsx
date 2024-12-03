import { Button, Stack } from '@mui/material';
import Page from '../types/Page';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';

const ButtonsTab = ({pages, hidden=false}: {pages: Page[], hidden?: boolean}) => {
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const [path, setPath] = useState<string>(pathname);

  const onButtonPageClick = (pagePath: string) => {
    navigate(pagePath);
    setPath(pagePath);
  };

  useEffect(() => {
    setPath(pathname);
  }, [pathname])

  return (
    <Stack
      display={hidden ? 'none' : 'flex'}
      flexDirection='row'
      gap='3.5vw'
      width='100%'
      marginBottom='45px'
      sx={{
        overflowX: 'auto'
      }}>
      {pages.map((page) => {
        const pagePath = path[path.length - 1] === '/' ? path.slice(0, path.length - 1) : path;
        return (
          <Button
            key={page.path}
            variant={pagePath.includes(page.path) || page.highlight ? 'containtedTabSelected' : 'containtedTab'}
            onClick={() => onButtonPageClick(page.path)}>
              {page.name}
          </Button>
        )}
      )}
    </Stack>
  );
};

export default ButtonsTab;
