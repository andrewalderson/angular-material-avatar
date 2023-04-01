import { Directive, HostBinding, OnInit, inject } from '@angular/core';
import { CdkImageLoadedDirective } from 'cdk/image';
import { MatAvatarComponent } from './avatar.component';

@Directive({
  selector: 'img[matAvatarImage]',
  standalone: true,
  hostDirectives: [CdkImageLoadedDirective],
})
export class MatAvatarImageDirective implements OnInit {
  @HostBinding('class') readonly _hostClasses = 'mat-avatar__image';

  readonly loaded = inject(CdkImageLoadedDirective, { self: true }).loaded;

  #avatar = inject(MatAvatarComponent);

  ngOnInit(): void {
    this.#avatar._registerImage(this);
  }
}
