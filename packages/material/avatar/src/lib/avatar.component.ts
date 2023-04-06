import { BooleanInput, coerceBooleanProperty } from '@angular/cdk/coercion';
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
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CanColor, mixinColor } from '@angular/material/core';
import { Observable } from 'rxjs';

type AvatarMode = 'icon' | 'image';

export interface AvatarImage {
  loaded: Observable<void>;
}

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
export class MatAvatarComponent extends _MatAvatarMixin implements CanColor {
  @HostBinding('class.mat-unthemed') get unthemedClass() {
    return !this.color;
  }

  #changeDetectorRef = inject(ChangeDetectorRef);

  protected _mode: AvatarMode = 'icon';

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
}
