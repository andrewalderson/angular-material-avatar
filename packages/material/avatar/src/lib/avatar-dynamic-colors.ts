import {
  Directive,
  InjectionToken,
  OnDestroy,
  effect,
  inject,
  input,
} from '@angular/core';
import { MATX_AVATAR } from './avatar';

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

export type MatxAvatarColors = {
  foreground: string;
  background: string;
  border?: string; // uses foreground if not set
};

export type MatxAvatarDynamicColorFn = (name?: string) => MatxAvatarColors;

function MATX_AVATAR_DYNAMIC_COLORS_FUNCTION_FACTORY(): MatxAvatarDynamicColorFn {
  return (name?: string) => {
    if (!name) {
      return { background: 'transparent', foreground: '#ffffff' };
    }
    let hashCode = 0;
    for (let i = name.length - 1; i >= 0; i--) {
      const ch = name.charCodeAt(i);
      const shift = i % 8;
      hashCode ^= (ch << shift) + (ch >> (8 - shift));
    }
    return {
      background: COLOR_TABLE[hashCode % COLOR_TABLE.length],
      foreground: '#ffffff',
    };
  };
}

export const MATX_AVATAR_DYNAMIC_COLORS_FUNCTION =
  new InjectionToken<MatxAvatarDynamicColorFn>(
    'matxAvatarDynamicColorsFunction',
    {
      providedIn: 'root',
      factory: MATX_AVATAR_DYNAMIC_COLORS_FUNCTION_FACTORY,
    },
  );

@Directive({
  selector: '[matxAvatarDynamicColors]',
  standalone: true,
})
export class MatxAvatarDynamicColors implements OnDestroy {
  // the css properties need to be set on the avatar
  private readonly _avatarElement =
    inject(MATX_AVATAR)._elementRef.nativeElement;

  private readonly _colorsFn = inject(MATX_AVATAR_DYNAMIC_COLORS_FUNCTION);

  /**
   * Name (usually persons email address) used to render the colors
   */
  readonly colorsName = input.required<string>();

  constructor() {
    effect((onCleanup) => {
      const name = this.colorsName();
      if (name) {
        const colors = this._colorsFn(name);
        this._setAvatarColorProperties(colors);
      }

      onCleanup(() => this._clearAvatarColorProperties());
    });
  }

  ngOnDestroy(): void {
    this._clearAvatarColorProperties();
  }

  private _setAvatarColorProperties(colors: MatxAvatarColors) {
    const style = this._avatarElement.style;
    style.setProperty('--matx-avatar-color', colors.foreground);
    style.setProperty('--matx-avatar-background-color', colors.background);
    style.setProperty(
      '--matx-avatar-border-color',
      colors.border ?? colors.foreground,
    );
  }

  private _clearAvatarColorProperties() {
    const style = this._avatarElement.style;
    style.removeProperty('--matx-avatar-color');
    style.removeProperty('--matx-avatar-background-color');
    style.removeProperty('--matx-avatar-border-color');
  }
}
