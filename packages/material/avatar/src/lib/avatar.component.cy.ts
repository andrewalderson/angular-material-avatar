import { TestBed } from '@angular/core/testing';
import { MatxAvatarComponent } from './avatar.component';

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
});
