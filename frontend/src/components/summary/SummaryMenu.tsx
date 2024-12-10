import { MenuItem } from '@mui/material';

import PlainMenu from '../PlainMenu';
import { useAppDispatch } from '../../hooks/useAppDispatch';
import { archiveRecordById, deleteRecordById, deleteSummaryById } from '../../store/admin/adminThunks';

type SummaryMenuProps = {
  id: number,
  isForAdmin: boolean,
  downMedium: boolean,
  onDelete: () => void
};

const SummaryMenu = ({id, isForAdmin, downMedium, onDelete}: SummaryMenuProps) => {
  const dispatch = useAppDispatch();

  const deleteSummary = () => {
    dispatch(deleteSummaryById(id)).then(onDelete);
  };

  const deleteRecord = () => {
    dispatch(deleteRecordById(id)).then(onDelete);
  };

  const archiveRecord = () => {
    dispatch(archiveRecordById(id)).then(onDelete);
  };

  return (
    <PlainMenu hidden={!isForAdmin} downMedium={downMedium}>
      <MenuItem onClick={deleteSummary}>Удалить резюме</MenuItem>
      <MenuItem onClick={deleteRecord}>Удалить аудио</MenuItem>
      <MenuItem onClick={archiveRecord}>Архивировать аудио</MenuItem>
    </PlainMenu>
  );
};

export default SummaryMenu;
