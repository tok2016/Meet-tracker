import { Typography } from '@mui/material';
import PromoInfo from '../types/PromoInfo';

const Promo = ({promoInfo}: {promoInfo: PromoInfo}) => (
  <div style={{
    display: 'block'
  }}>
    <img src={promoInfo.image} alt='' style={{
      borderRadius: '20px',
      marginBottom: '20px',
      width: '100%'
    }}/>

    <Typography variant='h3Promo' width='100%' component='h3'>
      {promoInfo.text}
    </Typography>
  </div>
);

export default Promo;
