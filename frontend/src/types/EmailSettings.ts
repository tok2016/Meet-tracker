import { EmailProtocol } from './EmailProtocol';

export default interface EmailSettings {
  protocol: EmailProtocol,
  markup: string,
  text: string
};

export const defaultEmailSettings: EmailSettings = {
  protocol: 'IMAP',
  markup: '',
  text: ''
};
