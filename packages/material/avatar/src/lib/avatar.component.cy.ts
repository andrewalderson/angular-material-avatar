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
});
