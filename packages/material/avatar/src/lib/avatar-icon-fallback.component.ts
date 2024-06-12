import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'matx-avatar-icon-fallback',
  standalone: true,
  imports: [],
  template: `<ng-content />`,
  styles: [
    `
      :host {
        display: block;
        width: 100%;
        height: 100%;
        overflow: hidden;
      }
    `,
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MatxAvatarIconFallbackComponent {}
