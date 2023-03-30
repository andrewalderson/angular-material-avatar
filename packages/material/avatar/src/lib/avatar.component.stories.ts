import { Meta } from '@storybook/angular';
import { AvatarComponent } from './avatar.component';

export default {
  title: 'AvatarComponent',
  component: AvatarComponent
} as Meta<AvatarComponent>;

export const Primary = {
  render: (args: AvatarComponent) => ({
    props: args,
  }),
  args: {
  },
};