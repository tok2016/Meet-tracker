import { Stack, Typography } from '@mui/material';

import useMediaValue from '../hooks/useMediaValue';
import { AVATAR_WIDTH, NAV_BAR_MARGIN_BOTTOM } from '../utils/utils';
import Mouse from '../assets/Mouse.svg';
import useMediaMatch from '../hooks/useMediaMacth';
import PromoInfo from '../types/PromoInfo';
import Promo from '../components/Promo';
import RecordUploadPlain from '../components/summary/RecordUploadPlain';
import AudioPromo from '../assets/Audio Promo.png';
import RecordPromo from '../assets/Record Promo.png';
import SummaryPromo from '../assets/Summary Promo.png';
import UploadPromo from '../assets/Upload Promo.png';
import { breakpoints } from '../theme/BasicTypography';

const PROMOS: PromoInfo[] = [
  {
    id: 1,
    text: 'Расшифровка аудио и видео',
    image: AudioPromo
  },
  {
    id: 2,
    text: 'Загрузка любых форматов',
    image: UploadPromo
  },
  {
    id: 3,
    text: 'Суммаризация встречи',
    image: SummaryPromo
  },
  {
    id: 4,
    text: 'Сохранение и прослушивание записи',
    image: RecordPromo
  }
];

const MainPage = () => {
  const marginTop = useMediaValue(AVATAR_WIDTH);
  const paddingTop = useMediaValue(NAV_BAR_MARGIN_BOTTOM);
  const {small, medium} = useMediaMatch();

  return (
    <Stack 
    sx={{
      paddingBottom: '10vh',
      paddingTop: `calc(${marginTop}px + ${paddingTop})`,
      [breakpoints.down('md')]: {
        paddingLeft: '7vw',
        paddingRight: '7vw',
      },
      [breakpoints.up('md')]: {
        paddingLeft: '6vw',
        paddingRight: '6vw',
      }
    }}>
      <Stack 
        sx={{
          [breakpoints.down('lg')]: {
            marginBottom: 'calc(30px + 2.2vh)',
          },
          [breakpoints.up('lg')]: {
            height: `calc(95vh - ${marginTop}px)`,
            minHeight: 'fit-content'
          }
        }}>
          <Typography variant='h1' width='70%' marginBottom='0.7em' component='h1'>
            <Typography variant='h1Highlight' component='span'>Brify </Typography>
            - ваш личный помощник для составления резюме по проведенным встречам
          </Typography>

          <Typography 
            variant='body1' 
            marginBottom='2rem' 
            textAlign='left' 
            width='70%'
            sx={{
              display: small ? 'none' : 'box'
            }}>
              С помощью Brify вам не придётся пересматривать запись 
              или отвлекаться во время встречи на составление резюме.
          </Typography>

          <RecordUploadPlain />

          <img src={Mouse} alt='' style={{
            display: medium ? 'none' : 'block',
            margin: '2rem auto 0',
          }}/>
      </Stack>

      <div>
        <Typography variant='h2Promo' marginBottom='1em' textAlign='center' component='h2'>
          Возможности <Typography variant='h2PromoHighlight' component='span' textAlign='center'>Brify</Typography>
        </Typography>
        

        <div style={{
          display: 'grid',
          gridTemplateColumns: small ? '1fr' : '1fr 1fr',
          columnGap: medium ? '8vw' : '15vw',
          rowGap: medium ? '5vh' : '8vh'
        }}>
          {PROMOS.map((promo) => (
            <Promo promoInfo={promo} key={promo.id} />
          ))}
        </div>
      </div>
    </Stack>
  );
};

export default MainPage;
