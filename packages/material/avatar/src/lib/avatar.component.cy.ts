import { ThemePalette } from '@angular/material/core';
import { composeStories, createMountable } from '@storybook/testing-angular';
import { MatxAvatarComponent } from './avatar.component';
import * as stories from './avatar.component.stories';

const { WithDefaultFallback, WithCustomFallback, WithImage } =
  composeStories(stories);

describe(MatxAvatarComponent.name, () => {
  describe('rendering', () => {
    context('given an image is not added', () => {
      context('and a custom fallback is not defined', () => {
        it('should render the default fallback', () => {
          const { component, applicationConfig } = createMountable(
            WithDefaultFallback({}),
          );
          cy.mount(component, applicationConfig);

          cy.get('[data-testid="default-fallback"]', {
            includeShadowDom: true,
          }).should('exist');
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
            .find('[data-testid="custom-fallback"]', {
              includeShadowDom: true,
            })
            .should('exist');
        });
        it('should not render the default fallback', () => {
          cy.get('matx-avatar')
            .find('[data-testid="default-fallback"]', {
              includeShadowDom: true,
            })
            .should('not.exist');
        });
      });
    });

    context('given an image is added', () => {
      context('and the image loads successfully', () => {
        beforeEach(() => {
          cy.intercept(
            { method: 'GET', url: /^https?:\/\/(.+)$/, times: 1 },
            {
              fixture: 'avatar.jpg',
              headers: { 'cache-control': 'no-store' },
            },
          ).as('imageRequest');

          const { component, applicationConfig } = createMountable(
            WithImage({}),
          );
          cy.mount(component, applicationConfig);

          cy.wait('@imageRequest');
        });
        it('should render the image', () => {
          cy.get('matx-avatar')
            .find('img[matxAvatarImage]', { includeShadowDom: true })
            .should('exist')
            .and('have.attr', 'src', WithImage.args.src);
        });

        it('should not render the fallback', () => {
          cy.get('matx-avatar')
            .find('[data-testid="default-fallback"]', {
              includeShadowDom: true,
            })
            .should('not.exist');
        });
      });
      context('and the image fails to load', () => {
        beforeEach(() => {
          cy.intercept(
            { method: 'GET', url: /^https?:\/\/(.+)$/, times: 1 },
            {
              statusCode: 404,
            },
          ).as('imageRequest');

          const { component, applicationConfig } = createMountable(
            WithImage({}),
          );
          cy.mount(component, applicationConfig);

          cy.wait('@imageRequest');
        });
        it('should not render the image', () => {
          cy.get('matx-avatar')
            .find('img[matxAvatarImage]', { includeShadowDom: true })
            .should('not.be.visible');
          /*
            IMPORTANT: 
              This test should test for non-exisitence of the image but
              there is currently a bug in Angular @see https://github.com/angular/angular/issues/51882
              When that bug is fixed this test will fail and needs to be changed back to 'should('not.exist')'
          */
        });

        it('should render the fallback', () => {
          cy.get('matx-avatar')
            .find('[data-testid="default-fallback"]', {
              includeShadowDom: true,
            })
            .should('exist');
        });
      });
    });
  });
  describe('styling', () => {
    context('given a theme color is not specified', () => {
      beforeEach(() => {
        const { component, applicationConfig } = createMountable(
          WithDefaultFallback({}),
        );
        cy.mount(component, applicationConfig);
      });
      it("should add the class 'mat-unthemed'", () => {
        cy.get('matx-avatar').should('have.class', `mat-unthemed`);
      });
    });
    context('given a theme color is specified', () => {
      const colors: ThemePalette[] = ['primary', 'accent', 'warn'];
      colors.forEach((color) => {
        context(`and the theme color is ${color}`, () => {
          beforeEach(() => {
            const { component, applicationConfig } = createMountable(
              WithDefaultFallback({
                color,
              }),
            );
            cy.mount(component, applicationConfig);
          });
          it(`should have the class 'mat-${color}'`, () => {
            cy.get('matx-avatar').should('have.class', `mat-${color}`);
          });
          it(`should not add the class 'mat-unthemed'`, () => {
            cy.get('matx-avatar').should('not.have.class', `mat-unthemed`);
          });
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
