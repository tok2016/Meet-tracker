import { AppBar, Button, IconButton, Toolbar } from '@mui/material';
import { AccountCircle } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

import Logo from '../assets/Logo.png';
import useMediaValue from '../hooks/useMediaValue';
import { useAppDispatch, useAppSelector } from '../hooks/useAppDispatch';
import { selectUser } from '../store/user/userSlice';
import { postLogout } from '../store/user/userThunks';
import { LOGO_WIDTH, AVATAR_WIDTH } from '../utils/utils';

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
            style={{
              display: user.id > 0 ? 'none' : 'inherit'
            }}
            variant='contained' 
            onClick={() => navigate('/login')}>
              Войти
          </Button>

          <Button
            style={{
              display: user.id <= 0 ? 'none' : 'inherit'
            }}
            variant='transparent'
            onClick={logout} >
            Выйти
          </Button>
          
          <IconButton 
            style={{
              display: user.id <= 0 ? 'none' : 'inherit'
            }}
            color='primary' >
              <AccountCircle sx={ {width: avatarWidth, height: avatarWidth} } />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default NavigationBar;
