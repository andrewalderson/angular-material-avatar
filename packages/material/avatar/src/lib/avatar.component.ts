/* eslint-disable @angular-eslint/no-inputs-metadata-property */
import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  InjectionToken,
  computed,
  signal,
} from '@angular/core';

export interface MatxAvatar {
  _elementRef: ElementRef<HTMLElement>;
  _setUseImage: (value: boolean) => void;
}

export const MATX_AVATAR = new InjectionToken<MatxAvatar>('matxAvatar');

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
  providers: [{ provide: MATX_AVATAR, useExisting: MatxAvatarComponent }],
})
export class MatxAvatarComponent implements MatxAvatar {
  protected readonly useImage = computed(() => this.#useImage() === true);

  #useImage = signal(false);

  constructor(
    public _elementRef: ElementRef<HTMLElement>,
    @Attribute('aria-hidden') ariaHidden: string,
  ) {
    if (!ariaHidden) {
      this._elementRef.nativeElement.setAttribute('aria-hidden', 'true');
    }
  }

  _setUseImage(value: boolean) {
    this.#useImage.set(value);
  }
}
