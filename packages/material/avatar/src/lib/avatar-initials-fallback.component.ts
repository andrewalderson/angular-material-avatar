import {
  ChangeDetectionStrategy,
  Component,
  InjectionToken,
  OnChanges,
  SimpleChanges,
  inject,
  input,
  isDevMode,
  signal,
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
export class MatxAvatarInitialsFallbackComponent implements OnChanges {
  #initialsFn = inject(MATX_AVATAR_INITIALS_INITIALS_FUNCTION);

  protected readonly initials = signal<string>('');

  /**
   * Name (usually persons first and last name) used to render the initials
   */
  initialsName = input.required<string>();

  ngOnChanges(changes: SimpleChanges): void {
    const initialsName = changes['initialsName'];
    if (initialsName) {
      this.#setInitials(this.initialsName());
    }
  }

  #setInitials(name?: string) {
    if (isDevMode() && !this.#initialsFn) {
      throw new Error('An initials function must be provided');
    }
    this.initials.set(this.#initialsFn(name));
  }
}
