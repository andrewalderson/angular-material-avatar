import { Component } from '@angular/core';
import { faker } from '@faker-js/faker';
import {
  MATX_AVATAR_DYNAMIC_COLORS_FUNCTION,
  MatxAvatarDynamicColorsDirective,
} from './avatar-dynamic-colors.directive';
import {
  MATX_AVATAR_INITIALS_INITIALS_FUNCTION,
  MatxAvatarInitialsFallbackComponent,
} from './avatar-initials-fallback.component';
import { MatxAvatarComponent } from './avatar.component';

const expectedInitials = 'AD';
const expectedColors = {
  foreground: faker.color.rgb({ format: 'css' }),
  background: faker.color.rgb({ format: 'css' }),
  border: faker.color.rgb({ format: 'css' }),
};

@Component({
  selector: 'matx-basic',
  template: `<matx-avatar>
    <matx-avatar-initials-fallback [initialsName]="initialsName" />
  </matx-avatar>`,
  imports: [MatxAvatarComponent, MatxAvatarInitialsFallbackComponent],
})
class BasicComponent {
  initialsName = faker.person.fullName();
}

@Component({
  selector: 'matx-with-dynamic-colors',
  template: `<matx-avatar>
    <matx-avatar-initials-fallback
      matxAvatarDynamicColors
      [initialsName]="initialsName"
      [colorsName]="colorsName"
    />
  </matx-avatar>`,
  imports: [
    MatxAvatarComponent,
    MatxAvatarInitialsFallbackComponent,
    MatxAvatarDynamicColorsDirective,
  ],
})
class WithDynamicColorsComponent {
  initialsName = faker.person.fullName();
  colorsName = faker.internet.email();
}

describe(MatxAvatarInitialsFallbackComponent.name, () => {
  describe('rendering', () => {
    beforeEach(() => {
      cy.mount(BasicComponent, {
        providers: [
          {
            provide: MATX_AVATAR_INITIALS_INITIALS_FUNCTION,
            useValue: () => expectedInitials,
          },
        ],
      });
    });
    it('should render the expected initials', () => {
      cy.get('matx-avatar').contains(expectedInitials).should('exist');
    });
  });
  describe('styling', () => {
    describe('given the dynamic colors directive is added', () => {
      beforeEach(() => {
        cy.mount(WithDynamicColorsComponent, {
          providers: [
            {
              provide: MATX_AVATAR_DYNAMIC_COLORS_FUNCTION,
              useValue: () => expectedColors,
            },
          ],
        });
      });
      it('should set the expected colors on the avatar', () => {
        cy.get('matx-avatar')
          .should('have.css', 'color', expectedColors.foreground)
          .and('have.css', 'background-color', expectedColors.background)
          .and('have.css', 'border-color', expectedColors.border);
      });
    });
  });
});
