import { Button, Stack } from '@mui/material';
import Page from '../types/Page';
import { useLocation, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { breakpoints } from '../theme/BasicTypography';
import useMediaMatch from '../hooks/useMediaMacth';

const ButtonsTab = ({pages, hidden=false}: {pages: Page[], hidden?: boolean}) => {
  const {pathname} = useLocation();
  const navigate = useNavigate();

  const [path, setPath] = useState<string>(pathname);
  const {medium} = useMediaMatch();

  const onButtonPageClick = (pagePath: string) => {
    navigate(pagePath);
    setPath(pagePath);
  };

  useEffect(() => {
    setPath(pathname);
  }, [pathname])

  return (
    <Stack
      sx={{
        overflowX: 'auto',
        [breakpoints.down('md')]: {
          display: hidden ? 'none' : 'grid',
          gridTemplateColumns: '1fr 1fr',
          columnGap: '5vw',
          rowGap: '2vh',
          marginBottom: '30px'
        },
        [breakpoints.up('md')]: {
          display: hidden ? 'none' : 'flex',
          flexDirection: 'row',
          gap: '3.5vw',
          width: '100%',
          marginBottom: '45px'
        }
      }}>
      {pages.map((page) => {
        const pagePath = path[path.length - 1] === '/' ? path.slice(0, path.length - 1) : path;
        return (
          <Button
            key={page.path}
            variant={pagePath.includes(page.path) || page.highlight ? 'containtedTabSelected' : 'containtedTab'}
            onClick={() => onButtonPageClick(page.path)}
            style={{
              width: medium ? '100%' : 'inherit'
            }}>
              {page.name}
          </Button>
        )}
      )}
    </Stack>
  );
};

export default ButtonsTab;
