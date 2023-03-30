import { Meta } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

export default {
  title: 'Components/Avatar',
  component: AvatarComponent,
  parameters: {
    layout: 'centered',
  },
} as Meta<AvatarComponent>;

export const WithDefaultIcon = {
  argTypes: {
    useThemeColor: { control: 'boolean' },
    color: {
      control: 'radio',
      options: ['primary', 'accent', 'warn'],
      if: { arg: 'useThemeColor' },
    },
  },
  render: (args: AvatarComponent) => ({
    props: args,
  }),
  args: {
    useThemeColor: false,
    color: 'primary',
  },
};
