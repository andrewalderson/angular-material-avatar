import { MatxAvatar, MatxAvatarFallbackDirective } from './avatar';

import {
  ChangeDetectionStrategy,
  Component,
  input,
  signal,
  ViewEncapsulation,
} from '@angular/core';
import { faker } from '@faker-js/faker';
import { MatxAvatarIconFallback } from './avatar-icon-fallback';
import { MatxAvatarImage } from './avatar-image';
import { MatxAvatarInitialsFallback } from './avatar-initials-fallback';

function getAvatarElement() {
  return cy.get('matx-avatar');
}

function findAvatarChildElement(element: string) {
  return getAvatarElement().find(element);
}

@Component({
  selector: 'matx-avatar-custom-fallback[matxAvatarFallback]',
  standalone: true,
  template: ` <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 448 512"
    fill="currentColor"
  >
    <path
      d="M224 16c-6.7 0-10.8-2.8-15.5-6.1C201.9 5.4 194 0 176 0c-30.5 0-52 43.7-66 89.4C62.7 98.1 32 112.2 32 128c0 14.3 25 27.1 64.6 35.9c-.4 4-.6 8-.6 12.1c0 17 3.3 33.2 9.3 48H45.4C38 224 32 230 32 237.4c0 1.7 .3 3.4 1 5l38.8 96.9C28.2 371.8 0 423.8 0 482.3C0 498.7 13.3 512 29.7 512H418.3c16.4 0 29.7-13.3 29.7-29.7c0-58.5-28.2-110.4-71.7-143L415 242.4c.6-1.6 1-3.3 1-5c0-7.4-6-13.4-13.4-13.4H342.7c6-14.8 9.3-31 9.3-48c0-4.1-.2-8.1-.6-12.1C391 155.1 416 142.3 416 128c0-15.8-30.7-29.9-78-38.6C324 43.7 302.5 0 272 0c-18 0-25.9 5.4-32.5 9.9c-4.7 3.3-8.8 6.1-15.5 6.1zm56 208H267.6c-16.5 0-31.1-10.6-36.3-26.2c-2.3-7-12.2-7-14.5 0c-5.2 15.6-19.9 26.2-36.3 26.2H168c-22.1 0-40-17.9-40-40V169.6c28.2 4.1 61 6.4 96 6.4s67.8-2.3 96-6.4V184c0 22.1-17.9 40-40 40zm-88 96l16 32L176 480 128 288l64 32zm128-32L272 480 240 352l16-32 64-32z"
    />
  </svg>`,
  styles: [
    `
      matx-avatar-custom-fallback {
        display: flex;
        align-items: center;
        justify-content: center;

        > svg {
          width: 80%;
          height: 80%;
          border-width: 1px;
          border-style: solid;
          border-color: transparent;
          border-radius: 50%;
        }
      }
    `,
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
class MatxAvatarCustomIconComponent {}

@Component({
  selector: 'matx-avatar-with-icon-fallback',
  template: `<matx-avatar><matx-avatar-icon-fallback /></matx-avatar>`,
  imports: [MatxAvatar, MatxAvatarIconFallback],
})
class AvatarWithIconFallbackComponent {}

@Component({
  selector: 'matx-avatar-with-image',
  template: `<matx-avatar><img matxAvatarImage [src]="src()" /></matx-avatar>`,
  imports: [MatxAvatar, MatxAvatarImage],
})
class AvatarWithImageComponent {
  src = input<string>(faker.image.avatar());
}

@Component({
  selector: 'matx-avatar-with-image-and-icon-fallback',
  template: `<matx-avatar
    ><img matxAvatarImage [src]="src()" /><matx-avatar-icon-fallback
  /></matx-avatar>`,
  imports: [MatxAvatar, MatxAvatarImage, MatxAvatarIconFallback],
})
class AvatarWithImageAndIconFallbackComponent {
  src = input<string>(faker.image.avatar());
}

@Component({
  selector: 'matx-avatar-with-custom-fallback',
  template: `<matx-avatar
    ><matx-avatar-custom-fallback matxAvatarFallback
  /></matx-avatar>`,
  imports: [
    MatxAvatar,
    MatxAvatarCustomIconComponent,
    MatxAvatarFallbackDirective,
  ],
})
class AvatarWithCustomFallbackComponent {}

@Component({
  selector: 'matx-avatar-with-initials-fallback',
  template: `<matx-avatar>
    <matx-avatar-initials-fallback [initialsName]="initialsName()" />
  </matx-avatar>`,
  imports: [MatxAvatar, MatxAvatarInitialsFallback],
})
class AvatarWithInitialsComponent {
  initialsName = input<string>(faker.person.fullName());
}

// should be able to just use template syntax in the cy.mount function
// but there seems to be a bug and an error is thrown in the browser
@Component({
  selector: 'matx-avatar-without-aria-hidden',
  template: `<matx-avatar />`,
  imports: [MatxAvatar],
})
class AvatarWithoutAriaHiddenComponent {}

@Component({
  selector: 'matx-basic-avatar',
  template: `<matx-avatar aria-hidden="false" />`,
  imports: [MatxAvatar],
})
class AvatarWithAriaHiddenFalseComponent {}

describe(MatxAvatar.name, () => {
  describe('rendering', () => {
    context('given an image is not added', () => {
      context('and an icon fallback is defined', () => {
        it('should render the icon fallback', () => {
          cy.mount(AvatarWithIconFallbackComponent);

          findAvatarChildElement('matx-avatar-icon-fallback').should('exist');
        });
      });
      context('and an initials fallback is defined', () => {
        beforeEach(() => {
          cy.mount(AvatarWithInitialsComponent);
        });
        it('should render the initials fallback', () => {
          findAvatarChildElement('matx-avatar-initials-fallback').should(
            'exist',
          );
        });
      });
      context('and a custom fallback is defined', () => {
        beforeEach(() => {
          cy.mount(AvatarWithCustomFallbackComponent);
        });
        it('should render the custom fallback', () => {
          findAvatarChildElement('[matxAvatarFallback]').should('exist');
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

          cy.mount(AvatarWithImageAndIconFallbackComponent, {
            componentProperties: { src: signal(src) as any },
          });

          cy.wait('@imageRequest');
        });
        it('should render the image', () => {
          findAvatarChildElement('img[matxAvatarImage]')
            .should('exist')
            .and('have.attr', 'src', src);
        });

        it('should not render the fallback', () => {
          findAvatarChildElement('matx-avatar-icon-fallback').should(
            'not.exist',
          );
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

          cy.mount(AvatarWithImageAndIconFallbackComponent, {
            componentProperties: { src: signal(src) as any },
          });

          cy.wait('@imageRequest');
        });
        it('should not render the image', () => {
          findAvatarChildElement('img[matxAvatarImage]').should('not.exist');
        });

        it('should render the fallback', () => {
          findAvatarChildElement('matx-avatar-icon-fallback').should('exist');
        });
      });
    });
  });
  describe('accessibility', () => {
    context('given an aria-hidden attribute is not defined', () => {
      it(`should add an aria-hidden attribute with a value of 'true'`, () => {
        cy.mount(AvatarWithoutAriaHiddenComponent);

        getAvatarElement().should('have.attr', 'aria-hidden', 'true');
      });
    });
    context('given an aria-hidden attribute is defined', () => {
      it('should not override the existing value', () => {
        cy.mount(AvatarWithAriaHiddenFalseComponent);

        getAvatarElement().should('have.attr', 'aria-hidden', 'false');
      });
    });
  });
});
