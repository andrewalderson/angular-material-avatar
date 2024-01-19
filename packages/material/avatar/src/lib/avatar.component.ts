/* eslint-disable @angular-eslint/no-inputs-metadata-property */
import { coerceElement } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewEncapsulation,
  signal,
} from '@angular/core';
import { ThemePalette } from '@angular/material/core';
import { Observable, Subscription } from 'rxjs';

export interface AvatarImage {
  ready: Observable<boolean>;
}

export type AvatarColors = {
  foreground: string;
  background: string;
  border?: string; // uses foreground if not set
};

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
export class MatxAvatarComponent implements OnChanges, OnDestroy {
  @HostBinding('class') get themeClass() {
    return this.color ? `mat-${this.color}` : 'mat-unthemed';
  }

  @Input() color?: ThemePalette;

  protected readonly useFallback = signal<boolean>(true);

  #customColors: AvatarColors | null = null;

  #imageSubscription?: Subscription;

  constructor(
    public _elementRef: ElementRef<HTMLElement>,
    @Attribute('aria-hidden') ariaHidden: string,
  ) {
    if (!ariaHidden) {
      coerceElement(this._elementRef).setAttribute('aria-hidden', 'true');
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    const color = changes['color'];
    if (color) {
      if (color.currentValue) {
        this._removeCustomColors();
      } else if (this.#customColors) {
        this._setCustomAvatarColors(this.#customColors);
      }
    }
  }

  ngOnDestroy(): void {
    this.#imageSubscription?.unsubscribe();
  }

  _registerImage(image: AvatarImage) {
    this.#imageSubscription?.unsubscribe();

    this.#imageSubscription = image.ready.subscribe((ready) => {
      this.useFallback.set(!ready);
    });
  }

  _setCustomAvatarColors(colors: AvatarColors) {
    this.#customColors = colors;
    // only do this if the avatar is unthemed
    if (!this.color) {
      const style = coerceElement(this._elementRef).style;
      style.setProperty('--matx-avatar-color', colors.foreground);
      style.setProperty('--matx-avatar-background-color', colors.background);
      style.setProperty(
        '--matx-avatar-border-color',
        colors.border ?? colors.foreground,
      );
    }
  }

  _removeCustomColors(reset = false) {
    const style = coerceElement(this._elementRef).style;
    style.removeProperty('--matx-avatar-color');
    style.removeProperty('--matx-avatar-background-color');
    style.removeProperty('--matx-avatar-border-color');
    if (reset) {
      this.#customColors = null;
    }
  }
}
