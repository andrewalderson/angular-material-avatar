import { Component, ViewEncapsulation } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { faker } from '@faker-js/faker';
import { MountResponse } from 'cypress/angular';
import { MatxAvatarImageDirective } from './avatar-image.directive';
import {
  MATX_AVATAR_INITIALS_COLORS_FUNCTION,
  MATX_AVATAR_INITIALS_INITIALS_FUNCTION,
  MatxAvatarInitialsFallbackComponent,
} from './avatar-initials-fallback.component';
import {
  MatxAvatarComponent,
  MatxAvatarFallbackDirective,
} from './avatar.component';

describe(MatxAvatarComponent.name, () => {
  beforeEach(() => {
    TestBed.overrideComponent(MatxAvatarComponent, {
      add: {
        imports: [],
        providers: [],
      },
    });
  });

  it('should render the default fallback by default', () => {
    cy.mount(MatxAvatarComponent);

    cy.get('[data-testid="default-fallback"]', {
      includeShadowDom: true,
    }).should('exist');
  });

  it('should display a custom fallback instead of default fallback when added', () => {
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

    cy.get('matx-avatar')
      .find('[data-testid="custom-fallback"]', {
        includeShadowDom: true,
      })
      .should('exist');

    cy.get('matx-avatar')
      .find('[data-testid="default-fallback"]', {
        includeShadowDom: true,
      })
      .should('not.exist');
  });

  it("should have the class 'mat-unthemed' when no color is set", () => {
    cy.mount(`<matx-avatar />`, {
      imports: [MatxAvatarComponent],
    });

    cy.get('matx-avatar').should('have.class', `mat-unthemed`);
  });

  ['primary', 'accent', 'warn'].forEach((color) => {
    it(`should have the class 'mat-${color}' when the color imput is set to '${color}'`, () => {
      cy.mount(`<matx-avatar [color]="color"/>`, {
        imports: [MatxAvatarComponent],
        componentProperties: {
          color,
        },
      });

      cy.get('matx-avatar').should('have.class', `mat-${color}`);
    });
  });

  context('given an image is added', () => {
    context('when the image loads successfully', () => {
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
          .find('[data-testid="default-fallback"]', { includeShadowDom: true })
          .should('not.exist');
      });
    });
    context('when the image fails to load', () => {
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
          .find('[data-testid="default-fallback"]', { includeShadowDom: true })
          .should('exist');
      });
    });

    it('should be able to update the image src even after error', () => {
      cy.intercept(
        { method: 'GET', url: /^https?:\/\/(.+)$/, times: 1 },
        {
          fixture: 'avatar.jpg',
          headers: { 'cache-control': 'no-store' },
        }
      ).as('firstImageRequest');

      cy.mount(MatxAvatarImageHostComponent).then((wrapper) => {
        return cy.wrap(wrapper).as('wrapper');
      });

      cy.get('@wrapper').then((w) => {
        const wrapper =
          w as unknown as MountResponse<MatxAvatarImageHostComponent>;
        wrapper.component.src = faker.image.url();
        wrapper.fixture.detectChanges();
      });

      cy.wait('@firstImageRequest');

      cy.get('matx-avatar')
        .find('img[matxAvatarImage]', { includeShadowDom: true })
        .should('exist');

      cy.intercept(
        { method: 'GET', url: /^https?:\/\/(.+)$/, times: 1 },
        {
          statusCode: 404,
        }
      ).as('secondImageRequest');

      cy.get('@wrapper').then((w) => {
        const wrapper =
          w as unknown as MountResponse<MatxAvatarImageHostComponent>;
        wrapper.component.src = faker.image.url();
        wrapper.fixture.detectChanges();
      });

      cy.wait('@secondImageRequest');

      cy.get('matx-avatar')
        .find('img[matxAvatarImage]', { includeShadowDom: true })
        .should('not.exist');

      cy.intercept(
        { method: 'GET', url: /^https?:\/\/(.+)$/, times: 1 },
        {
          fixture: 'avatar.jpg',
          headers: { 'cache-control': 'no-store' },
        }
      ).as('thirdImageRequest');

      cy.get('@wrapper').then((w) => {
        const wrapper =
          w as unknown as MountResponse<MatxAvatarImageHostComponent>;
        wrapper.component.src = faker.image.url();
        wrapper.fixture.detectChanges();
      });

      cy.wait('@thirdImageRequest');

      cy.get('matx-avatar')
        .find('img[matxAvatarImage]', { includeShadowDom: true })
        .should('exist');

      cy.intercept(
        { method: 'GET', url: /^https?:\/\/(.+)$/, times: 1 },
        {
          fixture: 'avatar.jpg',
          headers: { 'cache-control': 'no-store' },
        }
      ).as('fourthImageRequest');

      cy.get('@wrapper').then((w) => {
        const wrapper =
          w as unknown as MountResponse<MatxAvatarImageHostComponent>;
        wrapper.component.src = faker.image.url();
        wrapper.fixture.detectChanges();
      });

      cy.wait('@fourthImageRequest');

      cy.get('matx-avatar')
        .find('img[matxAvatarImage]', { includeShadowDom: true })
        .should('exist');
    });
  });

  context('given initials fallback is used', () => {
    it('should render the initials fallback', () => {
      cy.mount(
        `<matx-avatar><matx-avatar-initials-fallback matxAvatarFallback data-testid="initials-fallback"/></matx-avatar>`,
        {
          imports: [
            MatxAvatarComponent,
            MatxAvatarFallbackDirective,
            MatxAvatarInitialsFallbackComponent,
          ],
        }
      );

      cy.get('matx-avatar')
        .find('[data-testid="initials-fallback"]', { includeShadowDom: true })
        .should('exist');
    });
    it('should not render the default fallback', () => {
      cy.mount(
        `<matx-avatar><matx-avatar-initials-fallback matxAvatarFallback data-testid="initials-fallback"/></matx-avatar>`,
        {
          imports: [
            MatxAvatarComponent,
            MatxAvatarFallbackDirective,
            MatxAvatarInitialsFallbackComponent,
          ],
        }
      );

      cy.get('matx-avatar')
        .find('[data-testid="default-fallback"]', { includeShadowDom: true })
        .should('not.exist');
    });
    it('should render the initials from the initialsName', () => {
      const expectedInitials = 'AD';
      cy.mount(
        `<matx-avatar><matx-avatar-initials-fallback matxAvatarFallback data-testid="initials-fallback" [initialsName]="initialsName"/></matx-avatar>`,
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
        .find('[data-testid="initials-text"]', { includeShadowDom: true })
        .should('have.text', expectedInitials);
    });

    it('should set the custom colors on the avatar when color is not set', () => {
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

    it('should not set the custom colors on the avatar when color is set', () => {
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