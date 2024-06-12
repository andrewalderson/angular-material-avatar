import type { StorybookConfig } from '@storybook/angular';
import { dirname, join } from 'path';

const config: StorybookConfig = {
  core: {},
  stories: ['../../../packages/**/*.@(mdx|stories.@(js|jsx|ts|tsx))'],
  addons: [getAbsolutePath('@storybook/addon-essentials'), '@chromatic-com/storybook'],

  framework: {
    name: getAbsolutePath('@storybook/angular'),
    options: {},
  },

  docs: {},

  staticDirs: ['../src/assets'],
};

module.exports = config;

// To customize your webpack configuration you can use the webpackFinal field.
// Check https://storybook.js.org/docs/react/builders/webpack#extending-storybooks-webpack-config
// and https://nx.dev/packages/storybook/documents/custom-builder-configs

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, 'package.json')));
}
