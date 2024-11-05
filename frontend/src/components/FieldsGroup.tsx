import { ReactNode } from 'react';

const FieldsGroup = ({children}: {children: ReactNode}) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '3.5vh',
    maxHeight: '53vh',
    overflowY: 'auto',
    padding: '0 5px 10px',
    paddingTop: '0.5em',
  }}>
    {children}
  </div>
);

export default FieldsGroup;
