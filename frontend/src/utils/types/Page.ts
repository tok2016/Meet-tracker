export default interface Page {
  name: string,
  path: string | ((id: string) => string),
  forAdmin: boolean,
  highlight?: boolean
};
