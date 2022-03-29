const path = require('path')

const moduleResolverConfig = {
  root: path.resolve('./'),
  extensions: ['.ts', '.tsx', '.js', '.json'],
  alias: {
    '@src': './src',
    '@screens': './src/screens',
    '@components': './src/components',
    '@navigation': './src/navigation',
  },
}

module.exports = function (api) {
  api.cache(true)

  const presets = ['module:metro-react-native-babel-preset']

  const plugins = [
    ['module-resolver', moduleResolverConfig],
  ]

  return { presets, plugins }
}
