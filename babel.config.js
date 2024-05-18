const packageJson = require('./package.json')

const babelRuntimeVersion = packageJson.dependencies['@babel/runtime-corejs3']

module.exports = (api) => {
  api.cache(false)

  const presets = [
    [
      require.resolve('@babel/preset-env'),
      {
        modules: false,
        useBuiltIns: false,
      },
    ],
    require.resolve('@babel/preset-typescript'),
    [
      require.resolve('@babel/preset-react'),
      {
        runtime: 'automatic',
        useSpread: true,
      },
    ],
  ]

  const plugins = [
    [
      require.resolve('babel-plugin-module-resolver'),
      {
        alias: {
          '^@/assets/(.*)$': './assets/\\1',
          '^@/tests/(.*)$': './tests/\\1',
          '^@/(.*)$': './src/\\1',
        },
      },
    ],
  ]

  return {
    presets,
    plugins,
    exclude: ['./dist'],
    env: {
      lib: {
        ignore: [/\.stories\./, /\.test\./],
      },
      app: {
        presets: [
          [
            require.resolve('@babel/preset-env'),
            {
              modules: 'auto',
              useBuiltIns: false,
            },
          ],
        ],
        plugins: [
          [
            require.resolve('@babel/plugin-transform-runtime'),
            {
              corejs: {
                version: 3,
                proposals: true,
              },
              useESModules: true,
              version: babelRuntimeVersion,
            },
          ],
        ],
        ignore: [/\.test\./],
      },
      test: {
        presets: [
          [
            require.resolve('@babel/preset-env'),
            {
              modules: 'auto',
              useBuiltIns: false,
              targets: {
                node: 'current',
              },
            },
          ],
        ],
        ignore: [/\.stories\./],
      },
    },
  }
}
