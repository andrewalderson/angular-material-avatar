import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
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
        height: 100%;
        width: 100%;
        font-size: var(--matx-avatar-font-size);
        font-weight: var(--matx-avatar-font-weight);
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
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
      this.#validateInitialsFunction();
    }
  }

  #validateInitialsFunction() {
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
