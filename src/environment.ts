const environment = {
  ENDPOINT: process.env.REACT_APP_ENDPOINT || '',
};

export type IEnvironment = typeof environment;
export default environment;
