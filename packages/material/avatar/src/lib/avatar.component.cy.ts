import { composeStories, createMountable } from '@storybook/testing-angular';
import { MatxAvatarComponent } from './avatar.component';
import * as stories from './avatar.component.stories';
import { StoryArgTypes } from './avatar.component.stories';

const {
  WithIconFallback,
  WithCustomFallback,
  WithImage,
  WithInitialsFallback,
} = composeStories<StoryArgTypes, typeof stories>(stories);

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
            .find('matx-avatar-initials-fallback')
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
          cy.get('matx-avatar').find('[matxAvatarFallback]').should('exist');
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
              <matx-avatar-icon-fallback>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 128 128"
                  fill="currentColor"
                  width="100%"
                  height="100%"
                >
                  <path
                    d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
                  />
                  <path
                    d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
                  />
                </svg>
              </matx-avatar-icon-fallback>`,
            }),
          );
          cy.mount(component, applicationConfig);

          cy.wait('@imageRequest');
        });
        it('should render the image', () => {
          cy.get('matx-avatar')
            .find('img[matxAvatarImage]')
            .should('exist')
            .and('have.attr', 'src', src);
        });

        it('should not render the fallback', () => {
          cy.get('matx-avatar')
            .find('matx-avatar-icon-fallback')
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
              <matx-avatar-icon-fallback>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  role="img"
                  viewBox="0 0 128 128"
                  fill="currentColor"
                  width="100%"
                  height="100%"
                >
                  <path
                    d="M103,102.1388 C93.094,111.92 79.3504,118 64.1638,118 C48.8056,118 34.9294,111.768 25,101.7892 L25,95.2 C25,86.8096 31.981,80 40.6,80 L87.4,80 C96.019,80 103,86.8096 103,95.2 L103,102.1388 Z"
                  />
                  <path
                    d="M63.9961647,24 C51.2938136,24 41,34.2938136 41,46.9961647 C41,59.7061864 51.2938136,70 63.9961647,70 C76.6985159,70 87,59.7061864 87,46.9961647 C87,34.2938136 76.6985159,24 63.9961647,24"
                  />
                </svg>
              </matx-avatar-icon-fallback>`,
            }),
          );
          cy.mount(component, applicationConfig);

          cy.wait('@imageRequest');
        });
        it('should not render the image', () => {
          cy.get('matx-avatar')
            .find('img[matxAvatarImage]')
            .should('not.exist');
        });

        it('should render the fallback', () => {
          cy.get('matx-avatar')
            .find('matx-avatar-icon-fallback')
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
