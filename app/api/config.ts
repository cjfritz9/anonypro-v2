const ENV = process.env;

const config = {
  igApi: {
    baseUrl: ENV.IG_API_URL!,
    key: ENV.IG_API_KEY!,
  },
  smmRajaApi: {
    baseUrl: ENV.SMMRAJA_API_URL!,
    key: ENV.SMMRAJA_API_KEY!,
  },
  sanityCms: {
    apiVersion: '2022-03-07',
    dataset: 'production',
    projectId: 'vvw86v5i',
  },
};

export default config;
