import { CircularProgress } from '@mui/material';
import { Status } from '../types/Status';

const ButtonContent = ({content, status}: {content: string, status: Status}) => (
  status === 'pending'
    ? <CircularProgress color='secondary' size={'2.2em'} />
    : content
);

export default ButtonContent;
