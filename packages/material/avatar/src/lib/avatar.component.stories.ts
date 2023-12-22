import { Component, ViewEncapsulation } from '@angular/core';
import { Meta, moduleMetadata, type StoryObj } from '@storybook/angular';
import { MatxAvatarImageDirective } from './avatar-image.directive';
import { MatxAvatarInitialsFallbackComponent } from './avatar-initials-fallback.component';
import {
  MatxAvatarComponent,
  MatxAvatarFallbackDirective,
} from './avatar.component';

type StoryArgTypes = MatxAvatarComponent &
  HTMLImageElement &
  MatxAvatarInitialsFallbackComponent & {
    borderWidth: number;
    content: string;
  };

type Story = StoryObj<StoryArgTypes>;

@Component({
  selector: 'matx-avatar-custom-fallback[matxAvatarFallback]',
  standalone: true,
  template: ` <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    height="100%"
    width="100%"
    fill="currentColor"
  >
    <path
      d="M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48H45.4C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4H342.7c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.7 3.3-8.8 6.1-15.5 6.1zm56 208H267.6c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2H168c-22.1 0-40-17.9-40-40V169.6c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4V184c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z"
    />
  </svg>`,
  styles: [
    `
      :host {
        display: block;
        height: 80%;
        width: 80%;
        overflow: hidden;
        border-width: 1px;
        border-style: solid;
        border-color: transparent;
        border-radius: 50%;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
})
class MatxAvatarCustomIconComponent {}

const meta: Meta<StoryArgTypes> = {
  title: 'Components/Avatar',
  component: MatxAvatarComponent,
  decorators: [
    moduleMetadata({
      imports: [
        MatxAvatarCustomIconComponent,
        MatxAvatarFallbackDirective,
        MatxAvatarImageDirective,
        MatxAvatarInitialsFallbackComponent,
      ],
    }),
  ],
  parameters: {
    layout: 'centered',
    viewport: {
      disable: true,
    },
  },
  argTypes: {
    color: {
      name: 'Theme Palette (color)',
      control: {
        type: 'select',
        labels: {
          undefined: 'None',
          primary: 'Primary',
          accent: 'Accent',
          warn: 'warn',
        },
      },
      options: [undefined, 'primary', 'accent', 'warn'],
    },
    borderWidth: {
      name: 'Border Width',
      control: { type: 'number', min: 0 },
    },
    content: {
      table: {
        disable: true,
      },
    },
  },
  args: {
    color: undefined,
    borderWidth: 0,
  },
};

export default meta;

const calculateStyles = (args: StoryArgTypes) => {
  let style = '';
  if (args.borderWidth) {
    style += `--matx-avatar-border-width: ${args.borderWidth}px`;
  }
  return style ? `style="${style}"` : '';
};

const Template: Story = {
  render: (args) => ({
    props: args,
    template: `<matx-avatar ${calculateStyles(args)} 
    ${args.color ? '[color]="color"' : ''}>${args.content || ''}</matx-avatar>`,
  }),
};

export const WithDefaultFallback: Story = {
  ...Template,
};

export const WithCustomFallback: Story = {
  ...Template,
  args: {
    content:
      '<matx-avatar-custom-fallback data-testid="custom-fallback" matxAvatarFallback/>',
  },
};

export const WithInitialsFallback: Story = {
  ...Template,
  args: {
    initialsName: 'William Wallace',
    colorsName: 'william.wallace@outlook.com',
    content:
      '<matx-avatar-initials-fallback matxAvatarFallback [initialsName]="initialsName" [colorsName]="colorsName"/>',
  },
};

export const WithImage: Story = {
  ...Template,
  args: {
    src: 'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/170.jpg', // don't use faker here or it will be bundled when we publish storybook
    content: '<img matxAvatarImage [src]="src"/>',
  },
};
