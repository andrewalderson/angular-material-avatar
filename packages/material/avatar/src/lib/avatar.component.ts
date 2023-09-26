/* eslint-disable @angular-eslint/no-inputs-metadata-property */
import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ContentChild,
  Directive,
  ElementRef,
  HostBinding,
  OnDestroy,
  ViewEncapsulation,
  inject,
} from '@angular/core';
import { CanColor, mixinColor } from '@angular/material/core';
import { Observable, Subject, takeUntil } from 'rxjs';

export interface AvatarImage {
  ready: Observable<boolean>;
}

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
  implements CanColor, OnDestroy
{
  #changeDetectorRef = inject(ChangeDetectorRef);

  @HostBinding('class.mat-unthemed') get unthemedClass() {
    return !this.color;
  }

  @ContentChild(MatxAvatarFallbackDirective)
  _customFallback?: MatxAvatarFallbackDirective;

  get useFallback() {
    return this.#useFallback;
  }
  #useFallback = true;

  #destroyed = new Subject<void>();

  constructor(elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }

  _registerImage(image: AvatarImage) {
    image.ready.pipe(takeUntil(this.#destroyed)).subscribe((ready) => {
      this.#useFallback = !ready;
      this.#changeDetectorRef.markForCheck();
    });
  }

  ngOnDestroy(): void {
    this.#destroyed.next();
    this.#destroyed.complete();
  }
}
