import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewEncapsulation,
  inject,
  isDevMode,
} from '@angular/core';
import { AvatarColors, MatxAvatarComponent } from './avatar.component';

// these colors are the 700 values from the material color spec
// the default contrast for all is white
const COLOR_TABLE = [
  '#D32F2F',
  '#C2185B',
  '#7B1FA2',
  '#512DA8',
  '#303F9F',
  '#1976D2',
  '#0288D1',
  '#0097A7',
  '#00796B',
  '#388E3C',
  '#689F38',
  '#AFB42B',
  '#FBC02D',
  '#FFA000',
  '#F57C00',
  '#E64A19',
  '#5D4037',
  '#616161',
  '#455A64',
];

export type MatxAvatarInitialsInitialsFn = (name?: string) => string;

export type MatxAvatarInitialsColorFn = (name?: string) => AvatarColors;

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

function MATX_AVATAR_INITIALS_COLORS_FUNCTION_FACTORY(): MatxAvatarInitialsColorFn {
  return (name?: string) => {
    if (!name) {
      return { background: 'transparent', foreground: '#ffffff' };
    }
    let hashCode = 0;
    for (let i = name.length - 1; i >= 0; i--) {
      const ch = name.charCodeAt(i);
      const shift = i % 8;
      // eslint-disable-next-line no-bitwise
      hashCode ^= (ch << shift) + (ch >> (8 - shift));
    }
    return {
      background: COLOR_TABLE[hashCode % COLOR_TABLE.length],
      foreground: '#ffffff',
    };
  };
}

export const MATX_AVATAR_INITIALS_INITIALS_FUNCTION =
  new InjectionToken<MatxAvatarInitialsInitialsFn>(
    'matxAvatarInitialsInitialsFunction',
    {
      providedIn: 'root',
      factory: MATX_AVATAR_INITIALS_INITIALS_FUNCTION_FACTORY,
    }
  );

export const MATX_AVATAR_INITIALS_COLORS_FUNCTION =
  new InjectionToken<MatxAvatarInitialsColorFn>(
    'matxAvatarInitialsColorsFunction',
    {
      providedIn: 'root',
      factory: MATX_AVATAR_INITIALS_COLORS_FUNCTION_FACTORY,
    }
  );

@Component({
  selector: 'matx-avatar-initials-fallback[matxAvatarFallback]',
  standalone: true,
  imports: [CommonModule],
  template: `<span data-testid="initials-text">{{ initials }}</span> `,
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
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatxAvatarInitialsFallbackComponent
  implements OnChanges, OnDestroy
{
  #avatar = inject(MatxAvatarComponent);
  #changeDetectorRef = inject(ChangeDetectorRef);
  #initialsFn = inject(MATX_AVATAR_INITIALS_INITIALS_FUNCTION);
  #colorsFn = inject(MATX_AVATAR_INITIALS_COLORS_FUNCTION);

  get initials() {
    return this.#initials;
  }
  #initials?: string;
  /**
   * Name (usually persons email address) used to render the colors
   * If not set the colors will be rendered from the initialsName
   */
  @Input() colorsName?: string;

  /**
   * Name (usually persons first and last name) used to render the initials
   */
  @Input() initialsName?: string;

  ngOnChanges(changes: SimpleChanges): void {
    const initialsName = changes['initialsName'];
    const colorsName = changes['colorsName'];
    if (initialsName) {
      this.#setInitials(this.initialsName);
    }
    if (colorsName || initialsName) {
      this.#setAvatarColors(this.colorsName || this.initialsName);
    }
  }

  ngOnDestroy(): void {
    this.#avatar._removeCustomColors(true);
  }

  #setInitials(name?: string) {
    if (isDevMode() && !this.#initialsFn) {
      throw new Error('An initials function must be provided');
    }
    this.#initials = this.#initialsFn(name);
    this.#changeDetectorRef.markForCheck();
  }

  #setAvatarColors(name?: string) {
    if (isDevMode() && !this.#colorsFn) {
      throw new Error('A colors function must be provided');
    }
    this.#avatar._setCustomAvatarColors(this.#colorsFn(name));
  }
}
