import { Meta } from '@storybook/angular';
import { MatxAvatarComponent } from './avatar.component';

export default {
  title: 'Components/Avatar',
  component: MatxAvatarComponent,
  parameters: {
    layout: 'centered',
  },
} as Meta<MatxAvatarComponent>;

export const WithDefaultFallback = {
  render: (args: MatxAvatarComponent) => ({
    props: args,
  }),
  args: {},
};
