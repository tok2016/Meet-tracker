import { Typography } from '@mui/material';

import useMediaValue from '../hooks/useMediaValue';
import { AVATAR_WIDTH } from '../utils/utils';
import UploadPlain from '../components/UploadPlain';
import Mouse from '../assets/Mouse.svg';
import useMediaMatch from '../hooks/useMediaMacth';
import PromoInfo from '../types/PromoInfo';
import PromoStub from '../assets/PromoStub.svg';
import Promo from '../components/Promo';

const PROMOS: PromoInfo[] = [
  {
    id: 1,
    text: 'Расшифровка аудио и видео',
    image: PromoStub
  },
  {
    id: 2,
    text: 'Загрузка любых форматов',
    image: PromoStub
  },
  {
    id: 3,
    text: 'Суммаризация встречи',
    image: PromoStub
  },
  {
    id: 4,
    text: 'Редактирование резюме',
    image: PromoStub
  }
];

const MainPage = () => {
  const marginTop = useMediaValue(AVATAR_WIDTH);
  const {small} = useMediaMatch();

  return (
    <div style={{
      paddingTop: `calc(${marginTop}px + 10vh)`,
      paddingLeft: '6vw',
      paddingRight: '6vw',
      paddingBottom: '10vh'
    }}>
      <div style={{
        height: `calc(95vh - ${marginTop}px)`,
        minHeight: 'fit-content'
      }}>
        <Typography variant='h1' width='70%' marginBottom='0.7em' component='h1'>
          <Typography variant='h1Highlight' component='span'>Brify </Typography>
          - ваш личный помощник для составления резюме по проведенным встречам
        </Typography>

        <Typography variant='body1' marginBottom='2rem' textAlign='left' width='70%'>
          С помощью Brify вам не придётся пересматривать запись 
          или отвлекаться во время встречи на составление резюме.
        </Typography>

        <UploadPlain attentionText='Загрузите или перетащите видео или аудио файл сюда'/>

        <img src={Mouse} alt='' style={{
          display: 'block',
          margin: '2rem auto 0',
        }}/>
      </div>

      <div>
        <Typography variant='h2Promo' marginBottom='1em' textAlign='center' component='h2'>
          Возможности <Typography variant='h2PromoHighlight' component='span' textAlign='center'>Brify</Typography>
        </Typography>
        

        <div style={{
          display: 'grid',
          gridTemplateColumns: small ? '1fr' : '1fr 1fr',
          columnGap: '15vw',
          rowGap: '8vh'
        }}>
          {PROMOS.map((promo) => (
            <Promo promoInfo={promo} key={promo.id} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MainPage;
