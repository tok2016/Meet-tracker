import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';

import Logo from '../assets/Logo.png';
import { useNavigate } from 'react-router-dom';

const NavigationBar = () => {
  const navigate = useNavigate();

  return (
    <AppBar>
      <Toolbar>
        <img 
          src={Logo} 
          alt='Brify' 
          width={200} 
          onClick={() => navigate('/')}/>
        
        <div style={ {display: 'flex', gap: '30px', flexDirection: 'row', alignItems: 'center'} }>
          <Button 
            variant='contained' 
            onClick={() => navigate('/login')}>
              Войти
          </Button>
          
          <IconButton color='primary' >
            <AccountCircle sx={ {width: '8.5vh', height: '8.5vh'} } />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
