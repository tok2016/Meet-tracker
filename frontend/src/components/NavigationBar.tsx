import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import Logo from '../assets/Logo.png';
import useMediaValue from '../hooks/useMediaValue';
import MediaValue from '../utils/types/MediaValue';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/userSlice';
import { postLogout } from '../store/userThunks';

const LOGO_WIDTH: MediaValue = {
  xs: 20,
  sm: 50,
  md: 100,
  lg: 150,
  xl: 200
};

const AVATAR_WIDTH: MediaValue = {
  xs: 10,
  sm: 25,
  md: 45,
  lg: 65,
  xl: 95
}

const NavigationBar = () => {
  const logoWidth = useMediaValue(LOGO_WIDTH);
  const avatarWidth = useMediaValue(AVATAR_WIDTH);
  const navigate = useNavigate();

  const dispatch = useAppDispatch();
  const {user} = useAppSelector(selectUser);

  const logout = () => {
    dispatch(postLogout())
      .then(() => navigate('/login'));
  };

  return (
    <AppBar>
      <Toolbar>
        <img 
          className='logo'
          src={Logo} 
          alt='Brify' 
          width={logoWidth} 
          onClick={() => navigate('/')}/>
        
        <div style={ {display: 'flex', gap: '30px', flexDirection: 'row', alignItems: 'center'} }>
          <Button 
            hidden={user.id > 0}
            variant='contained' 
            onClick={() => navigate('/login')}>
              Войти
          </Button>

          <Button
            hidden={user.id <= 0}
            variant='transparent'
            onClick={logout} >
            Выйти
          </Button>
          
          <IconButton 
            hidden={user.id <= 0}
            color='primary' >
              <AccountCircle sx={ {width: avatarWidth, height: avatarWidth} } />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
