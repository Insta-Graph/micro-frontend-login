const { merge } = require('webpack-merge');
const singleSpaDefaults = require('webpack-config-single-spa-react-ts');

module.exports = (webpackConfigEnv, argv) => {
  const defaultConfig = singleSpaDefaults({
    orgName: 'snapify',
    projectName: 'mf-login',
    webpackConfigEnv,
    argv,
  });

  return merge(defaultConfig, {
    externals: ['@snapify/shared-modules'],
    module: {
      rules: [
        {
          test: /\.(woff|woff2|ttf|eot)$/,
          loader: 'file-loader',
          options: {
            name: 'fonts/[name].[ext]!static',
          },
          include: /node_modules/,
        },
      ],
    },
    // modify the webpack config however you'd like to by adding to this object
  });
};
