export const EmailProtocols = ['IMAP', 'POP3'] as const;

export type EmailProtocol = typeof EmailProtocols[number];
