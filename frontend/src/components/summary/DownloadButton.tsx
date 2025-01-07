import { Button, Menu, MenuItem } from '@mui/material';
import { useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../../hooks/useAppDispatch';
import { selectSummary } from '../../store/summary/summarySlice';
import { getSummaryFile } from '../../store/summary/summaryThunks';
import { FileFormat, FileFormats } from '../../types/FileFormat';
import ButtonContent from '../ButtonContent';

const DownloadButton = ({summaryId, summaryTitle}: {summaryId: number, summaryTitle: string}) => {
  const [anchor, setAnchor] = useState<HTMLElement | undefined>(undefined);

  const {fileStatus} = useAppSelector(selectSummary);
  const dispatch = useAppDispatch();

  const linkRef = useRef<HTMLAnchorElement>(null);

  const onFormatChoice = async (format: FileFormat) => {
    try {
      setAnchor(undefined);

      const {payload} = await dispatch(getSummaryFile({id: summaryId, format}));

      if(typeof payload === 'string' && linkRef.current) {
        linkRef.current.hidden = false;
        linkRef.current.href = payload;
        linkRef.current.download = `${summaryTitle}.${format}`;
        linkRef.current.click();

        linkRef.current.href = '';
        linkRef.current.download = '';
        linkRef.current.hidden = true;
      }
    } catch {
      setAnchor(undefined);
    }
  };

  return (
    <>
      <Button 
        fullWidth
        variant='contained'
        onClick={(evt) => anchor ? setAnchor(undefined) : setAnchor(evt.currentTarget)}>
          <ButtonContent content='Скачать' status={fileStatus} />
      </Button>

      <Menu 
        open={anchor !== undefined} 
        anchorEl={anchor}
        onClose={() => setAnchor(undefined)}>
          {FileFormats.map((format) => (
            <MenuItem 
              disabled={status === 'pending'}
              key={format}
              onClick={() => onFormatChoice(format)}
              style={{
                width: '10vw'
              }}>
                {format}
            </MenuItem>
          ))}
      </Menu>

      <a 
        className='no-hover' 
        ref={linkRef} 
        href='' 
        hidden 
        style={{
          position: 'absolute', 
          left: '-9999999px'
        }}>
      </a>
    </>
  );
};

export default DownloadButton;
