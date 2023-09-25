import { Meta, Story } from '@storybook/angular';
import { MatxAvatarComponent } from './avatar.component';

type StoryArgTypes = MatxAvatarComponent & {
  borderWidth: number;
};

export default {
  title: 'Components/Avatar',
  component: MatxAvatarComponent,
  parameters: {
    layout: 'centered',
  },
} as Meta<StoryArgTypes>;

const calculateStyles = (args: StoryArgTypes) => {
  let style = '';
  if (args.borderWidth) {
    style += `--matx-avatar-border-width: ${args.borderWidth}px`;
  }
  return style;
};

const Template: Story<StoryArgTypes> = (args: StoryArgTypes) => ({
  template: `<matx-avatar style="${calculateStyles(args)}" />`,
});

export const WithDefaultFallback = Template.bind(this);
WithDefaultFallback.args = {
  borderWidth: 0,
};
