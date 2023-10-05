/* eslint-disable @angular-eslint/no-inputs-metadata-property */
import { coerceElement } from '@angular/cdk/coercion';
import { CommonModule } from '@angular/common';
import {
  Attribute,
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  OnChanges,
  OnDestroy,
  SimpleChanges,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';
import { CanColor, mixinColor } from '@angular/material/core';
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

export const _MatxAvatarMixin = mixinColor(
  class {
    constructor(public _elementRef: ElementRef) {}
  }
);

@Component({
  selector: 'matx-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
  inputs: ['color'],
})
export class MatxAvatarComponent
  extends _MatxAvatarMixin
  implements CanColor, OnChanges, OnDestroy
{
  #elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  @HostBinding('class.mat-unthemed') get unthemedClass() {
    return !this.color;
  }

  @ContentChild(MatxAvatarFallbackDirective)
  _customFallback?: MatxAvatarFallbackDirective;

  protected readonly useFallback = signal<boolean>(true);

  #customColors: AvatarColors | null = null;

  #imageSubscription?: Subscription;

  constructor(
    elementRef: ElementRef<HTMLElement>,
    @Attribute('aria-hidden') ariaHidden: string
  ) {
    super(elementRef);

    if (!ariaHidden) {
      coerceElement(this.#elementRef).setAttribute('aria-hidden', 'true');
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
      const style = coerceElement(this.#elementRef).style;
      style.setProperty('--matx-avatar-color', colors.foreground);
      style.setProperty('--matx-avatar-background-color', colors.background);
      style.setProperty(
        '--matx-avatar-border-color',
        colors.border ?? colors.foreground
      );
    }
  }

  _removeCustomColors(reset = false) {
    const style = coerceElement(this.#elementRef).style;
    style.removeProperty('--matx-avatar-color');
    style.removeProperty('--matx-avatar-background-color');
    style.removeProperty('--matx-avatar-border-color');
    if (reset) {
      this.#customColors = null;
    }
  }
}
