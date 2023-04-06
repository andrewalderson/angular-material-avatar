import {
  BooleanInput,
  coerceBooleanProperty,
  coerceElement,
} from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  SimpleChanges,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CanColor, mixinColor } from '@angular/material/core';
import { Observable } from 'rxjs';

type AvatarMode = 'icon' | 'image';

export interface AvatarImage {
  loaded: Observable<void>;
}

export type AvatarColors = {
  foreground: string;
  background: string;
  border?: string; // uses foreground if not set
};

export const _MatAvatarMixin = mixinColor(
  class {
    constructor(public _elementRef: ElementRef) {}
  }
);

@Directive({
  selector: '[matAvatarIcon]',
  standalone: true,
})
export class MatAvatarIconDirective {}

@Component({
  selector: 'mat-avatar',
  standalone: true,
  imports: [CommonModule],
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color'],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatAvatarComponent
  extends _MatAvatarMixin
  implements CanColor, OnChanges
{
  @HostBinding('class.mat-unthemed') get unthemedClass() {
    return !this.color;
  }

  #changeDetectorRef = inject(ChangeDetectorRef);

  protected _mode: AvatarMode = 'icon';

  #customColors?: AvatarColors;

  @ContentChild(MatAvatarIconDirective) _customIcon?: MatAvatarIconDirective;

  @Input()
  get showIconUntilImageLoads() {
    return this.#showIconUntilImageLoads;
  }
  set showIconUntilImageLoads(value: BooleanInput) {
    this.#showIconUntilImageLoads = coerceBooleanProperty(value);
  }
  #showIconUntilImageLoads = true;

  constructor(elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  ngOnChanges(simpleChanges: SimpleChanges) {
    const color = simpleChanges['color'];
    if (color) {
      if (color.currentValue) {
        this._clearAvatarColors();
      } else if (this.#customColors) {
        this._setAvatarColors(this.#customColors);
      }
    }
  }

  _registerImage(image: AvatarImage) {
    if (!this.showIconUntilImageLoads) {
      this._setMode('image');
    }
    // the image directive will 'complete' this when it is destroyed
    image.loaded.subscribe({
      next: () => this._setMode('image'),
      error: () => this._setMode('icon'),
    });
  }

  _setMode(mode: AvatarMode) {
    Promise.resolve().then(() => {
      this._mode = mode;
      this.#changeDetectorRef.markForCheck();
    });
  }

  /**
   * Used for custom theming when adding a custom icon. See the AvatarInitialsComponent.
   * @param colors
   */
  _setAvatarColors(colors: AvatarColors) {
    this.#customColors = colors;
    const element = coerceElement(this._elementRef) as HTMLElement;
    // only do this if the avatar is unthemed
    if (!this.color) {
      element.style.setProperty(
        '--mat-avatar-background-color',
        colors.background
      );
      element.style.setProperty(
        '--mat-avatar-border-color',
        colors.border ?? colors.foreground
      );
      element.style.setProperty('--mat-avatar-color', colors.foreground);
    }
  }

  _clearAvatarColors() {
    const element = coerceElement(this._elementRef) as HTMLElement;
    element.style.removeProperty('--mat-avatar-background-color');
    element.style.removeProperty('--mat-avatar-border-color');
    element.style.removeProperty('--mat-avatar-color');
  }
}
