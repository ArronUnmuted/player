module.exports = function (config) {
  config.set({
    files: [
      "src/tests.webpack.js",
    ],
    preprocessors: {
      "src/tests.webpack.js": ["webpack", "sourcemap"],
    },
    colors: true,
    logLevel: config.LOG_INFO,
    reporters: ["mocha"],
    plugins: [
      require("karma-phantomjs-launcher"),
      require("karma-jasmine"),
      require("karma-mocha-reporter"),
      require("karma-webpack"),
      require("karma-sourcemap-loader"),
    ],
    frameworks: ["jasmine"],
    browsers: ["PhantomJS"],
    singleRun: true,
    webpack: require("./webpack.make")({ BUILD: false, TEST: true }),
    webpackMiddleware: {
      noInfo: true,
    },
  });
};
