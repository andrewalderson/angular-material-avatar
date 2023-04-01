import {
  coerceCssPixelValue,
  coerceElement,
  coerceNumberProperty,
  NumberInput,
} from '@angular/cdk/coercion';
import {
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  inject,
  Input,
  isDevMode,
  OnChanges,
  ViewEncapsulation,
} from '@angular/core';
import { MatAvatarComponent } from './avatar.component';
import {
  MAT_AVATAR_COLORS_FUNCTION,
  MAT_AVATAR_INITIALS_FUNCTION,
} from './tokens';
import { clampNumber, isNumber } from './utils';

/**
 * A component used as an avatar custom icon
 * to display a persons initials
 */
@Component({
  selector: 'mat-avatar-initials[matAvatarIcon]',
  standalone: true,
  template: `<span>{{ initials }}</span> `,
  styles: [
    `
      :host {
        display: flex;
        align-items: center;
        height: 100%;
      }
    `,
  ],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatAvatarInitialsComponent implements AfterViewInit, OnChanges {
  #elementRef = inject(ElementRef<HTMLElement>);
  #changeDetectorRef = inject(ChangeDetectorRef);
  #avatar = inject(MatAvatarComponent);
  #initialsFn = inject(MAT_AVATAR_INITIALS_FUNCTION);
  #colorsFn = inject(MAT_AVATAR_COLORS_FUNCTION);

  get initials() {
    return this.#initials;
  }
  #initials?: string;

  /**
   * A factor between 0 and 1 that is multipled by the height
   * of the avatar to determine the font size
   *
   * Values should be around 0.5
   *
   * Defaults to 0.45 because that seems to fit best for initials like 'WW' or 'MM'
   */
  @Input()
  get fontSizeRatio(): number {
    return this._fontSizeRatio;
  }
  set fontSizeRatio(value: NumberInput) {
    const ratio = coerceNumberProperty(value);
    if (isNumber(ratio)) {
      this._fontSizeRatio = clampNumber(ratio, 0, 1);

      this.#setFontSize();
    }
  }
  private _fontSizeRatio = 0.45;

  /**
   * The name used to get the initials from
   * This name is usually the persons display name
   */
  @Input() initialsName?: string;

  /**
   * The name used to calculate the color of the avatar
   * This name is usually the persons username
   */
  @Input() colorName?: string;

  ngOnChanges() {
    if (this.initialsName) {
      if (isDevMode() && !this.#initialsFn) {
        throw new Error('An initialsFn must be provided');
      }
      this.#initials = this.#initialsFn(this.initialsName);
    }
    this.#setAvatarColors(this.colorName ?? this.initialsName);
    this.#changeDetectorRef.markForCheck();
  }

  ngAfterViewInit() {
    // need to do this here also because on a first change in ngOnChanges
    // the elements classList will not be ready
    // The ngOnChanges will handle subsequent changes
    this.#setAvatarColors(this.colorName ?? this.initialsName);
    // need to do this here because this is the earliest the
    // dimensions of the avatar are ready
    this.#setFontSize();

    this.#changeDetectorRef.markForCheck();
  }

  #setFontSize() {
    const element = coerceElement(this.#elementRef) as HTMLElement;
    const { offsetHeight } = element;

    element.style.fontSize = coerceCssPixelValue(
      offsetHeight * this.fontSizeRatio
    );
  }

  #setAvatarColors(name?: string) {
    if (isDevMode() && !this.#colorsFn) {
      throw new Error('A colorFn must be provided');
    }
    if (!name) {
      return;
    }
    const element = coerceElement(this.#avatar._elementRef) as HTMLElement;
    // only do this if the avatar is unthemed
    // if it has a color theme set these properties won't do anything
    if (element.classList.contains('mat-unthemed')) {
      const colors = this.#colorsFn(name);
      element.style.setProperty(
        '--mat-avatar-background-color',
        colors.background
      );
      element.style.setProperty('--mat-avatar-border-color', colors.foreground);
      element.style.setProperty('--mat-avatar-color', colors.foreground);
    }
  }
}
