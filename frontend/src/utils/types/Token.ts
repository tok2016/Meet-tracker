type BearerToken = `Bearer ${string}`

export default interface Token {
  token: BearerToken | undefined,
  expireTime: string
};
