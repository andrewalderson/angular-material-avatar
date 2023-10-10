import { faker } from '@faker-js/faker';
import {
  MATX_AVATAR_INITIALS_COLORS_FUNCTION,
  MATX_AVATAR_INITIALS_INITIALS_FUNCTION,
  MatxAvatarInitialsFallbackComponent,
} from './avatar-initials-fallback.component';
import {
  MatxAvatarComponent,
  MatxAvatarFallbackDirective,
} from './avatar.component';

describe(MatxAvatarInitialsFallbackComponent.name, () => {
  describe('rendering', () => {
    it('should render the initials from the initialsName', () => {
      const expectedInitials = 'AD';
      cy.mount(
        `<matx-avatar><matx-avatar-initials-fallback matxAvatarFallback [initialsName]="initialsName"/></matx-avatar>`,
        {
          imports: [
            MatxAvatarComponent,
            MatxAvatarFallbackDirective,
            MatxAvatarInitialsFallbackComponent,
          ],
          componentProperties: {
            initialsName: faker.person.fullName(),
          },
          providers: [
            {
              provide: MATX_AVATAR_INITIALS_INITIALS_FUNCTION,
              useValue: () => expectedInitials,
            },
          ],
        }
      );

      cy.get('matx-avatar')
        .contains(expectedInitials, { includeShadowDom: true })
        .should('exist');
    });
  });
  describe('styling', () => {
    context('given a theme color is not specified', () => {
      it('should set the custom colors on the avatar', () => {
        const expectedColors = {
          foreground: faker.color.rgb({ format: 'css' }),
          background: faker.color.rgb({ format: 'css' }),
          border: faker.color.rgb({ format: 'css' }),
        };
        cy.mount(
          `<matx-avatar><matx-avatar-initials-fallback matxAvatarFallback [colorsName]="colorsName" /></matx-avatar>`,
          {
            imports: [
              MatxAvatarComponent,
              MatxAvatarFallbackDirective,
              MatxAvatarInitialsFallbackComponent,
            ],
            componentProperties: {
              colorsName: faker.person.fullName(),
            },
            providers: [
              {
                provide: MATX_AVATAR_INITIALS_COLORS_FUNCTION,
                useValue: () => expectedColors,
              },
            ],
          }
        );

        cy.get('matx-avatar')
          .should('have.css', 'color', expectedColors.foreground)
          .and('have.css', 'background-color', expectedColors.background)
          .and('have.css', 'border-color', expectedColors.border);
      });
    });
    context('given a theme color is specified', () => {
      it('should not set the custom colors on the avatar', () => {
        const expectedColors = {
          foreground: faker.color.rgb({ format: 'css' }),
          background: faker.color.rgb({ format: 'css' }),
          border: faker.color.rgb({ format: 'css' }),
        };
        cy.mount(
          `<matx-avatar [color]="color"><matx-avatar-initials-fallback matxAvatarFallback [colorsName]="colorsName" /></matx-avatar>`,
          {
            imports: [
              MatxAvatarComponent,
              MatxAvatarFallbackDirective,
              MatxAvatarInitialsFallbackComponent,
            ],
            componentProperties: {
              colorsName: faker.person.fullName(),
              color: 'primary',
            },
            providers: [
              {
                provide: MATX_AVATAR_INITIALS_COLORS_FUNCTION,
                useValue: () => expectedColors,
              },
            ],
          }
        );

        cy.get('matx-avatar')
          .should('not.have.css', 'color', expectedColors.foreground)
          .and('not.have.css', 'background-color', expectedColors.background)
          .and('not.have.css', 'border-color', expectedColors.border);
      });
    });
  });
});
