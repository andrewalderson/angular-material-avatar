import {
  Directive,
  ElementRef,
  InjectionToken,
  Input,
  OnChanges,
  OnDestroy,
  inject,
  isDevMode,
} from '@angular/core';
import { MatxAvatarComponent } from './avatar.component';

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
export class MatxAvatarDynamicColorsDirective implements OnChanges, OnDestroy {
  // the css properties need to be set on the avatar
  #elementRef: ElementRef<HTMLElement> =
    inject(MatxAvatarComponent)._elementRef;

  #colorsFn = inject(MATX_AVATAR_DYNAMIC_COLORS_FUNCTION);

  /**
   * Name (usually persons email address) used to render the colors
   * If not set the colors will be rendered from the initialsName
   */
  @Input() colorsName?: string;

  ngOnChanges(): void {
    this.clearColors();
    if (this.colorsName) {
      this.setColors(this.colorsName);
    }
  }

  ngOnDestroy(): void {
    this.clearColors();
  }

  setColors(name: string) {
    const colors = this.#getAvatarColors(name);
    const style = this.#elementRef.nativeElement.style;
    style.setProperty('--matx-avatar-color', colors.foreground);
    style.setProperty('--matx-avatar-background-color', colors.background);
    style.setProperty(
      '--matx-avatar-border-color',
      colors.border ?? colors.foreground,
    );
  }

  clearColors() {
    const style = this.#elementRef.nativeElement.style;
    style.removeProperty('--matx-avatar-color');
    style.removeProperty('--matx-avatar-background-color');
    style.removeProperty('--matx-avatar-border-color');
  }

  #getAvatarColors(name?: string) {
    if (isDevMode() && !this.#colorsFn) {
      throw new Error('A colors function must be provided');
    }
    return this.#colorsFn(name);
  }
}
