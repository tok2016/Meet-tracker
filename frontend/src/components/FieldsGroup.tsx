import { ReactNode } from 'react';

const FieldsGroup = ({children}: {children: ReactNode}) => (
  <div style={{
    display: 'flex',
    flexDirection: 'column',
    paddingTop: '0.5em',
    gap: '3.5vh',
    maxHeight: '53vh',
    overflowY: 'auto'
  }}>
    {children}
  </div>
);

export default FieldsGroup;
