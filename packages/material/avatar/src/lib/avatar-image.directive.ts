import { Directive, HostBinding, OnInit, inject } from '@angular/core';
import { CdkImageLoadedDirective } from 'cdk/image';
import { AvatarComponent } from './avatar.component';

@Directive({
  selector: 'img[matxAvatarImage]',
  standalone: true,
  hostDirectives: [CdkImageLoadedDirective],
})
export class MatxAvatarImageDirective implements OnInit {
  @HostBinding('class') readonly _hostClasses = 'matx-avatar__image';

  readonly loaded = inject(CdkImageLoadedDirective, { self: true }).loaded;

  #avatar = inject(AvatarComponent);

  ngOnInit(): void {
    this.#avatar._registerImage(this);
  }
}
