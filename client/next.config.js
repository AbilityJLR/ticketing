module.exports = {
  webpackDevMiddleware: (config) => {
    if (config.watchOptions) {
      config.watchOptions.poll = 300;
    } else {
      config.watchOptions = {
        poll: 300
      };
    }
    return config;
  },
};
