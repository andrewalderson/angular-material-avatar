/* eslint-disable @angular-eslint/no-inputs-metadata-property */
import { coerceElement } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  ViewEncapsulation,
  computed,
  signal,
} from '@angular/core';

@Directive({
  selector: '[matxAvatarFallback]',
  standalone: true,
})
export class MatxAvatarFallbackDirective {}

@Component({
  selector: 'matx-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatxAvatarComponent {
  protected readonly useImage = computed(() => this.#useImage() === true);

  #useImage = signal(false);

  constructor(
    public _elementRef: ElementRef<HTMLElement>,
    @Attribute('aria-hidden') ariaHidden: string,
  ) {
    if (!ariaHidden) {
      coerceElement(this._elementRef).setAttribute('aria-hidden', 'true');
    }
  }

  _setUseImage(value: boolean) {
    this.#useImage.set(value);
  }
}
