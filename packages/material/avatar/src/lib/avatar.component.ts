import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  HostBinding,
  ViewEncapsulation,
} from '@angular/core';
import { CanColor, mixinColor } from '@angular/material/core';

type AvatarMode = 'icon' | 'image';

export const _AvatarMixin = mixinColor(
  class {
    constructor(public _elementRef: ElementRef) {}
  }
);

@Component({
  selector: 'matx-avatar',
  standalone: true,
  imports: [CommonModule],
  // eslint-disable-next-line @angular-eslint/no-inputs-metadata-property
  inputs: ['color'],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent extends _AvatarMixin implements CanColor {
  @HostBinding('class') readonly _hostClasses = 'matx-avatar';

  @HostBinding('class.mat-unthemed') get unthemedClass() {
    return !this.color;
  }

  protected _mode: AvatarMode = 'icon';

  constructor(elementRef: ElementRef<HTMLElement>) {
    super(elementRef);
  }
}
