import { TextField } from '@mui/material';
import { ChangeEvent, KeyboardEvent } from 'react';

type SearchProps = {
  word: string, 
  onChange: (evt: ChangeEvent<HTMLInputElement>) => void,
  onSubmit: () => void
}

const Search = ({word, onSubmit, onChange}: SearchProps) => {
  const onEnterDown = (evt: KeyboardEvent<HTMLInputElement>) => {
    if(evt.key === 'Enter') {
      onSubmit();
    }
  };

  return (
    <TextField 
      variant='outlined'
      value={word}
      onChange={onChange}
      onKeyDown={onEnterDown}
      style={{
        width: '20vw'
      }} />
  );
};

export default Search;
