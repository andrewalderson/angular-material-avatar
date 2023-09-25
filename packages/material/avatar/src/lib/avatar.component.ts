/* eslint-disable @angular-eslint/no-inputs-metadata-property */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CanColor, mixinColor } from '@angular/material/core';

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
export class MatxAvatarComponent extends _MatxAvatarMixin implements CanColor {
  @HostBinding('class.mat-unthemed') get unthemedClass() {
    return !this.color;
  }

  @ContentChild(MatxAvatarFallbackDirective)
  _customFallback?: MatxAvatarFallbackDirective;

  constructor(elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }
}
