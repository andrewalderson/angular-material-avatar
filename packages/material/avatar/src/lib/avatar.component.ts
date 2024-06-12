/* eslint-disable @angular-eslint/no-inputs-metadata-property */
import { coerceElement } from '@angular/cdk/coercion';
import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
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
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
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
