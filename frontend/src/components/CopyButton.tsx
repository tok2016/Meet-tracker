import { ContentCopy } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { useRef } from 'react';

import { UserIconSx } from '../utils/theme/UserIcon';

const CopyButton = ({value, onError}: {value: string, onError: () => void}) => {
  const hiddenRef = useRef<HTMLTextAreaElement>(null);

  const copyToClipboard = () => {
    if(window.isSecureContext) {
      navigator.clipboard.writeText(value);
    } else if(hiddenRef.current) {
      hiddenRef.current.hidden = false;
      hiddenRef.current.select();

      try {
        document.execCommand('copy');
      } catch {
        onError();
      } finally {
        hiddenRef.current.hidden = true;
      }
    }
  };

  return (
    <>
      <IconButton 
        color='secondary'
        onClick={copyToClipboard}>
        <ContentCopy sx={UserIconSx}/>
      </IconButton>

      <textarea 
        ref={hiddenRef} 
        value={value}
        hidden 
        style={{
          position: 'absolute', 
          left: '-9999999px'
        }}
        readOnly>
      </textarea>
    </>
  );
};

export default CopyButton;
