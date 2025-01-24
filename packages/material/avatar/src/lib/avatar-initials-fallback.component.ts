import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  ViewEncapsulation,
  computed,
  inject,
  input,
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
    imports: [],
    template: `<div>{{ initials() }}</div>`,
    styles: [
        `
      matx-avatar-initials-fallback {
        display: block;
        align-content: center;
        container-type: inline-size;

        > div {
          font-family: var(--matx-avatar-font-family, inherit);
          font-size: var(--matx-avatar-font-size, 45cqi);
          font-weight: var(--matx-avatar-font-weight, 300);
          letter-spacing: var(--matx-avatar-letter-spacing, normal);
          line-height: 1;
          overflow-wrap: normal;
          white-space: nowrap;
          text-align: center;
          text-transform: none;
          user-select: none;
        }
      }
    `,
    ],
    host: {
        '[attr.aria-hidden]': 'true',
    },
    changeDetection: ChangeDetectionStrategy.OnPush,
    encapsulation: ViewEncapsulation.None
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
}
