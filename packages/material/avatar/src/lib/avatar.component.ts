import { CommonModule } from '@angular/common';
import {
  ChangeDetectionStrategy,
  Component,
  ViewEncapsulation,
} from '@angular/core';

@Component({
  selector: 'matx-avatar',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  encapsulation: ViewEncapsulation.ShadowDom,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AvatarComponent {}
