import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  ViewEncapsulation,
  computed,
  inject,
  input,
  isDevMode,
} from '@angular/core';

export type MatxAvatarInitialsInitialsFn = (name?: string) => string;

function MATX_AVATAR_INITIALS_INITIALS_FUNCTION_FACTORY(): MatxAvatarInitialsInitialsFn {
  return (name?: string) => {
    if (!name) {
      return '';
    }
    const parts = name.split(' ');
    let initials = parts[0].charAt(0);
    if (parts.length > 1) {
      initials += parts[parts.length - 1].charAt(0);
    }
    return initials;
  };
}

export const MATX_AVATAR_INITIALS_INITIALS_FUNCTION =
  new InjectionToken<MatxAvatarInitialsInitialsFn>(
    'matxAvatarInitialsInitialsFunction',
    {
      providedIn: 'root',
      factory: MATX_AVATAR_INITIALS_INITIALS_FUNCTION_FACTORY,
    },
  );

@Component({
  selector: 'matx-avatar-initials-fallback',
  standalone: true,
  imports: [],
  template: `<span>{{ initials() }}</span> `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        justify-content: center;
        container-type: inline-size;
      }

      span {
        font-family: var(--matx-avatar-font-family, inherit);
        font-size: var(--matx-avatar-font-size, 45cqw);
        font-weight: var(--matx-avatar-font-weight, 300);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.ShadowDom,
})
export class MatxAvatarInitialsFallbackComponent {
  #initialsFn = inject(MATX_AVATAR_INITIALS_INITIALS_FUNCTION);

  protected readonly initials = computed(() =>
    this.#initialsFn(this.initialsName()),
  );

  /**
   * Name (usually persons first and last name) used to render the initials
   */
  initialsName = input.required<string>();

  /**
   *
   */
  constructor() {
    if (isDevMode()) {
      this.#assertInitialsFunction();
    }
  }

  #assertInitialsFunction() {
    if (!this.#initialsFn) {
      throw new Error(
        "The 'MATX_AVATAR_INITIALS_INITIALS_FUNCTION' must be provided",
      );
    }
    if (!(this.#initialsFn instanceof Function)) {
      throw new Error(
        "The 'MATX_AVATAR_INITIALS_INITIALS_FUNCTION' must be a function",
      );
    }
  }
}
