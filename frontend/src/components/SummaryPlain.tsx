import { Stack, SxProps, Typography, Theme, MenuItem } from '@mui/material';
import { Description, InsertDriveFile, PlayCircleOutline, VolumeOff, VolumeUp } from '@mui/icons-material';
import { memo } from 'react';
import { Link } from 'react-router-dom';

import { SummaryInfo } from '../utils/types/Summary';
import { TextColors } from '../utils/Colors';
import { getLocaleString, statusesTranslations } from '../utils/utils';
import ItemPlain from './ItemPlain';
import PlainMenu from './PlainMenu';
import { useAppDispatch } from '../hooks/useAppDispatch';
import { deleteRecordById, deleteSummaryById } from '../store/admin/adminThunks';

const RawSummaryPlain = ({summary, isForAdmin=false, onDelete}: {summary: SummaryInfo, isForAdmin: boolean, onDelete: () => void}) => {
  const dispatch = useAppDispatch();

  const date = getLocaleString(summary.creationDate);

  const iconSx: SxProps<Theme> = {
    color: TextColors.main, 
    width: '1em', 
    height: '1em'
  };

  const subPlainsStyle: SxProps<Theme> = {
    display: 'flex',
    flexDirection: 'row',
    gap: '1em',
    alignItems: 'center'
  };

  const deleteSummary = () => {
    dispatch(deleteSummaryById(summary.id)).then(() => onDelete());
  };

  const deleteRecord = () => {
    dispatch(deleteRecordById(summary.id)).then(() => onDelete());
  };

  return (
    <ItemPlain>
      <Stack sx={subPlainsStyle}>
        <PlayCircleOutline sx={iconSx}/>
        <Link to={`/account/summary/${summary.id}`}>
          <Typography variant='h3'>
            {summary.title}
          </Typography>
        </Link>
      </Stack>

      <Stack sx={subPlainsStyle}>
        <Typography variant='h3' color={summary.status === 'error' ? 'error' : 'textPrimary'}>
          {statusesTranslations[summary.status]}
        </Typography>
        {summary.audioId ? <VolumeUp sx={iconSx}/> : <VolumeOff sx={iconSx}/>}
        {summary.hasText ? <Description sx={iconSx}/> : <InsertDriveFile sx={iconSx}/>}
        <Typography variant='h3Normal'>
          {date}
        </Typography>
        <PlainMenu hidden={!isForAdmin}>
          <MenuItem onClick={deleteSummary}>Удалить резюме</MenuItem>
          <MenuItem onClick={deleteRecord}>Удалить аудио</MenuItem>
        </PlainMenu>
      </Stack>
    </ItemPlain>
  );
};

const SummaryPlain = memo(RawSummaryPlain);

export default SummaryPlain;
