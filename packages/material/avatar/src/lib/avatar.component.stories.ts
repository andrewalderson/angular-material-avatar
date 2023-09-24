import { Meta } from '@storybook/angular';
import { MatxAvatarComponent } from './avatar.component';

export default {
  title: 'Components/Avatar',
  component: MatxAvatarComponent,
} as Meta<MatxAvatarComponent>;

export const Primary = {
  render: (args: MatxAvatarComponent) => ({
    props: args,
  }),
  args: {},
};
