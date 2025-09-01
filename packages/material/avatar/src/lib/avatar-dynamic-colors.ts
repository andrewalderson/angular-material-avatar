import {
  Directive,
  InjectionToken,
  OnDestroy,
  effect,
  inject,
  input,
} from '@angular/core';
import { MATX_AVATAR } from './avatar';

export type MatxAvatarColors = {
  foreground: string;
  background: string;
  border?: string; // uses foreground if not set
};

export type MatxAvatarDynamicColorFn = (name?: string) => MatxAvatarColors;

function hashStringToHue(str: string): number {
  let hash = 5381;
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) + hash + str.charCodeAt(i);
  }
  return Math.abs(hash) % 360;
}

function MATX_AVATAR_DYNAMIC_COLORS_FUNCTION_FACTORY(): MatxAvatarDynamicColorFn {
  return (name?: string) => {
    if (!name) {
      return { background: 'transparent', foreground: '#ffffff' };
    }
    /**
     * This is a default implementation for generating a color with at least 4.5:1 (WCAG guidelines)
     * contrast with white (desired text color)
     * The colors produced may not match the style of the design system used by your app.
     * There are many different implementations that can be used to do this same task
     * and this one is choosen for simplicity and performance.
     * You are free to provide an different implementaion based on your apps needs
     * and characteristics.
     */
    const hue = hashStringToHue(name);
    const background = `hsl(${hue}, 70%, 30%)`;
    return { background, foreground: '#ffffff' };
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
