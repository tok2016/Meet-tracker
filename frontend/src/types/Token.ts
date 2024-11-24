export default interface Token {
  token: string | undefined,
  expireTime: string
};

export interface TokenRaw {
  ['access_token']: string,
  ['token_type']: string
};
