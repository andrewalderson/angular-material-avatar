import { Component, ViewEncapsulation } from '@angular/core';
import { faker } from '@faker-js/faker';
import { MountResponse } from 'cypress/angular';
import { MatxAvatarImageDirective } from './avatar-image.directive';
import {
  MatxAvatarComponent,
  MatxAvatarFallbackDirective,
} from './avatar.component';

describe(MatxAvatarComponent.name, () => {
  describe('rendering', () => {
    context('given an image is not added', () => {
      context('and a custom fallback is not defined', () => {
        it('should render the default fallback', () => {
          cy.mount(MatxAvatarComponent);

          cy.get('[data-testid="default-fallback"]', {
            includeShadowDom: true,
          }).should('exist');
        });
      });
      context('and a custom fallback is defined', () => {
        beforeEach(() => {
          cy.mount(
            `<matx-avatar><matx-avatar-custom-fallback matxAvatarFallback data-testid="custom-fallback"/></matx-avatar>`,
            {
              imports: [
                MatxAvatarComponent,
                MatxAvatarCustomFallbackComponent,
                MatxAvatarFallbackDirective,
              ],
            }
          );
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
            }
          ).as('imageRequest');

          cy.mount(MatxAvatarImageHostComponent, {
            componentProperties: {
              src: faker.image.url(),
            },
          }).then((wrapper) => {
            return cy.wrap(wrapper).as('wrapper');
          });

          cy.wait('@imageRequest');
        });
        it('should render the image', () => {
          cy.get('matx-avatar')
            .find('img[matxAvatarImage]', { includeShadowDom: true })
            .should('exist');
        });

        it('should not render the fallback', () => {
          cy.get('matx-avatar')
            .find('[data-testid="default-fallback"]', {
              includeShadowDom: true,
            })
            .should('not.exist');
        });
        it('should update the image when the src is changed', () => {
          cy.intercept(
            { method: 'GET', url: /^https?:\/\/(.+)$/, times: 1 },
            {
              fixture: 'avatar.jpg',
              headers: { 'cache-control': 'no-store' },
            }
          ).as('imageRequest');

          cy.get('@wrapper').then((w) => {
            const wrapper =
              w as unknown as MountResponse<MatxAvatarImageHostComponent>;
            wrapper.component.src = faker.image.url();
            wrapper.fixture.detectChanges();
          });

          cy.get('matx-avatar')
            .find('img[matxAvatarImage]', { includeShadowDom: true })
            .should('exist');
        });
      });
      context('and the image fails to load', () => {
        beforeEach(() => {
          cy.intercept(
            { method: 'GET', url: /^https?:\/\/(.+)$/, times: 1 },
            {
              statusCode: 404,
            }
          ).as('imageRequest');

          cy.mount(MatxAvatarImageHostComponent, {
            componentProperties: {
              src: faker.image.url(),
            },
          }).then((wrapper) => {
            return cy.wrap(wrapper).as('wrapper');
          });

          cy.wait('@imageRequest');
        });
        it('should not render the image', () => {
          cy.get('matx-avatar')
            .find('img[matxAvatarImage]', { includeShadowDom: true })
            .should('not.be.visible');
          /* IMPORTANT: This test should test for non-exisitence of the image but
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

        it('should update the image when the src is changed', () => {
          cy.intercept(
            { method: 'GET', url: /^https?:\/\/(.+)$/, times: 1 },
            {
              fixture: 'avatar.jpg',
              headers: { 'cache-control': 'no-store' },
            }
          ).as('imageRequest');

          cy.get('@wrapper').then((w) => {
            const wrapper =
              w as unknown as MountResponse<MatxAvatarImageHostComponent>;
            wrapper.component.src = faker.image.url();
            wrapper.fixture.detectChanges();
          });

          cy.get('matx-avatar')
            .find('img[matxAvatarImage]', { includeShadowDom: true })
            .should('exist');
        });
      });
    });
  });
  describe('styling', () => {
    context('given a theme color is not specified', () => {
      beforeEach(() => {
        cy.mount(`<matx-avatar />`, {
          imports: [MatxAvatarComponent],
        });
      });
      it("should add the class 'mat-unthemed'", () => {
        cy.get('matx-avatar').should('have.class', `mat-unthemed`);
      });
    });
    context('given a theme color is specified', () => {
      ['primary', 'accent', 'warn'].forEach((color) => {
        context(`and the theme color is ${color}`, () => {
          beforeEach(() => {
            cy.mount(`<matx-avatar [color]="color"/>`, {
              imports: [MatxAvatarComponent],
              componentProperties: {
                color,
              },
            });
          });
          it(`should have the class 'mat-${color}'`, () => {
            cy.get('matx-avatar').should('have.class', `mat-${color}`);
          });
        });
      });
      it(`should not add the class 'mat-unthemed'`, () => {
        it("should have the class 'mat-unthemed'", () => {
          cy.mount(`<matx-avatar />`, {
            imports: [MatxAvatarComponent],
          });

          cy.get('matx-avatar').should('not.have.class', `mat-unthemed`);
        });
      });
    });
  });
});

@Component({
  selector: 'matx-avatar-host',
  standalone: true,
  imports: [MatxAvatarComponent, MatxAvatarImageDirective],
  template: `<matx-avatar><img matxAvatarImage [src]="src" /></matx-avatar>`,
})
class MatxAvatarImageHostComponent {
  get src() {
    return this.#src;
  }
  set src(value: string | undefined) {
    this.#src = value;
  }
  #src?: string;
}

@Component({
  selector: 'matx-avatar-custom-fallback',
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
class MatxAvatarCustomFallbackComponent {}
