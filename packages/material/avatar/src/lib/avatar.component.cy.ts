import { composeStories, createMountable } from '@storybook/testing-angular';
import { MatxAvatarComponent } from './avatar.component';

import * as stories from './avatar.component.stories';

const {
  WithIconFallback,
  WithCustomFallback,
  WithImage,
  WithInitialsFallback,
} = composeStories(stories);

describe(MatxAvatarComponent.name, () => {
  describe('rendering', () => {
    context('given an image is not added', () => {
      context('and an icon fallback is defined', () => {
        it('should render the icon fallback', () => {
          const { component, applicationConfig } = createMountable(
            WithIconFallback({}),
          );
          cy.mount(component, applicationConfig);

          cy.get('matx-avatar-icon-fallback').should('exist');
        });
      });
      context('and an initials fallback is defined', () => {
        beforeEach(() => {
          const { component, applicationConfig } = createMountable(
            WithInitialsFallback({}),
          );
          cy.mount(component, applicationConfig);
        });
        it('should render the initials fallback', () => {
          cy.get('matx-avatar')
            .find('matx-avatar-initials-fallback', { includeShadowDom: true })
            .should('exist');
        });
      });
      context('and a custom fallback is defined', () => {
        beforeEach(() => {
          const { component, applicationConfig } = createMountable(
            WithCustomFallback({}),
          );
          cy.mount(component, applicationConfig);
        });
        it('should render the custom fallback', () => {
          cy.get('matx-avatar')
            .find('[matxAvatarFallback]', { includeShadowDom: true })
            .should('exist');
        });
      });
    });

    context('given an image is added', () => {
      const src = 'https://some/image-url';
      context('and the image loads successfully', () => {
        beforeEach(() => {
          cy.intercept(
            { method: 'GET', url: src, times: 1 },
            {
              fixture: 'avatar.jpg',
              headers: { 'cache-control': 'no-store' },
            },
          ).as('imageRequest');

          const { component, applicationConfig } = createMountable(
            WithImage({
              src,
              content: `<img matxAvatarImage [src]="src"/>
              <matx-avatar-icon-fallback />`,
            }),
          );
          cy.mount(component, applicationConfig);

          cy.wait('@imageRequest');
        });
        it('should render the image', () => {
          cy.get('matx-avatar')
            .find('img[matxAvatarImage]', { includeShadowDom: true })
            .should('exist')
            .and('have.attr', 'src', src);
        });

        it('should not render the fallback', () => {
          cy.get('matx-avatar')
            .find('matx-avatar-icon-fallback', { includeShadowDom: true })
            .should('not.exist');
        });
      });
      context('and the image fails to load', () => {
        beforeEach(() => {
          cy.intercept(
            { method: 'GET', url: src, times: 1 },
            {
              statusCode: 404,
            },
          ).as('imageRequest');

          const { component, applicationConfig } = createMountable(
            WithImage({
              src,
              content: `<img matxAvatarImage [src]="src"/>
              <matx-avatar-icon-fallback />`,
            }),
          );
          cy.mount(component, applicationConfig);

          cy.wait('@imageRequest');
        });
        it('should not render the image', () => {
          cy.get('matx-avatar')
            .find('img[matxAvatarImage]', { includeShadowDom: true })
            .should('not.exist');
        });

        it('should render the fallback', () => {
          cy.get('matx-avatar')
            .find('matx-avatar-icon-fallback', { includeShadowDom: true })
            .should('exist');
        });
      });
    });
  });
  describe('accessibility', () => {
    context('given an aria-hidden attribute is not defined', () => {
      it(`should add an aria-hidden attribute with a value of 'true'`, () => {
        cy.mount(`<matx-avatar />`, {
          imports: [MatxAvatarComponent],
        });

        cy.get('matx-avatar').should('have.attr', 'aria-hidden', 'true');
      });
    });
    context('given an aria-hidden attribute is defined', () => {
      it('should not override the existing value', () => {
        cy.mount(`<matx-avatar aria-hidden="false"/>`, {
          imports: [MatxAvatarComponent],
        });

        cy.get('matx-avatar').should('have.attr', 'aria-hidden', 'false');
      });
    });
  });
});
