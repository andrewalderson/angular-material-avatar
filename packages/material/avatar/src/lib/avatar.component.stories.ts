import { Meta, Story } from '@storybook/angular';
import { MatxAvatarComponent } from './avatar.component';

type StoryArgTypes = MatxAvatarComponent & {
  borderWidth: number;
  useThemeColor: boolean;
};

export default {
  title: 'Components/Avatar',
  component: MatxAvatarComponent,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    useThemeColor: {
      control: 'boolean',
      if: { arg: 'useThemeColor', exists: true },
    },
    color: {
      control: 'radio',
      options: ['primary', 'accent', 'warn'],
      if: { arg: 'useThemeColor' },
    },
  },
} as Meta<StoryArgTypes>;

const calculateStyles = (args: StoryArgTypes) => {
  let style = '';
  if (args.borderWidth) {
    style += `--matx-avatar-border-width: ${args.borderWidth}px`;
  }
  return style;
};

/**
 * Ensures that the color Input is reset to an empty state when the 'useThemeColor'
 * property is toggled from 'true' back to 'false'
 */
const ensureColorInputReset = (args: StoryArgTypes) => {
  return {
    ...args,
    color: args.useThemeColor ? args.color : null,
  };
};

const Template: Story<StoryArgTypes> = (args: StoryArgTypes) => ({
  props: ensureColorInputReset(args),
  template: `<matx-avatar style="${calculateStyles(args)}" [color]="color" />`,
});

export const WithDefaultFallback = Template.bind(this);
WithDefaultFallback.args = {
  useThemeColor: false,
  color: 'primary',
  borderWidth: 0,
};
