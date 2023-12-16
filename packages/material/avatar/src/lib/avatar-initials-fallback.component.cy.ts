import { faker } from '@faker-js/faker';
import { moduleMetadata } from '@storybook/angular';
import { composeStory, createMountable } from '@storybook/testing-angular';
import {
  MATX_AVATAR_INITIALS_COLORS_FUNCTION,
  MATX_AVATAR_INITIALS_INITIALS_FUNCTION,
  MatxAvatarInitialsFallbackComponent,
} from './avatar-initials-fallback.component';
import meta, { WithInitialsFallback } from './avatar.component.stories';

const expectedInitials = 'AD';
const expectedColors = {
  foreground: faker.color.rgb({ format: 'css' }),
  background: faker.color.rgb({ format: 'css' }),
  border: faker.color.rgb({ format: 'css' }),
};

const initialsStory = composeStory(WithInitialsFallback, meta, {
  decorators: [
    moduleMetadata({
      providers: [
        {
          provide: MATX_AVATAR_INITIALS_INITIALS_FUNCTION,
          useValue: () => expectedInitials,
        },
        {
          provide: MATX_AVATAR_INITIALS_COLORS_FUNCTION,
          useValue: () => expectedColors,
        },
      ],
    }),
  ],
});

describe(MatxAvatarInitialsFallbackComponent.name, () => {
  describe('rendering', () => {
    beforeEach(() => {
      const { component, applicationConfig } = createMountable(
        initialsStory({}),
      );
      cy.mount(component, applicationConfig);
    });
    it('should render the initials from the initialsName', () => {
      cy.get('matx-avatar')
        .contains(expectedInitials, { includeShadowDom: true })
        .should('exist');
    });
  });
  describe('styling', () => {
    context('given a theme palette (color) is undefined', () => {
      beforeEach(() => {
        const { component, applicationConfig } = createMountable(
          initialsStory({}),
        );
        cy.mount(component, applicationConfig);
      });
      it('should set the custom colors on the avatar', () => {
        cy.get('matx-avatar')
          .should('have.css', 'color', expectedColors.foreground)
          .and('have.css', 'background-color', expectedColors.background)
          .and('have.css', 'border-color', expectedColors.border);
      });
    });
    context('given a theme palette (color) is defined', () => {
      beforeEach(() => {
        const { component, applicationConfig } = createMountable(
          initialsStory({ color: 'primary' }),
        );
        cy.mount(component, applicationConfig);
      });
      it('should not set the custom colors on the avatar', () => {
        cy.get('matx-avatar')
          .should('not.have.css', 'color', expectedColors.foreground)
          .and('not.have.css', 'background-color', expectedColors.background)
          .and('not.have.css', 'border-color', expectedColors.border);
      });
    });
  });
});
