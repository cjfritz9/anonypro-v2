const ENV = process.env;

const config = {
  igApi: {
    baseUrl: ENV.IG_API_URL!,
    key: ENV.IG_API_KEY!,
  },
  smmRajaApi: {
    baseUrl: ENV.SMMRAJA_API_URL!,
    key: ENV.SMMRAJA_API_KEY!,
  }
};

export default config;
