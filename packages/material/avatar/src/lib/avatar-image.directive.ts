import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  OnInit,
  Renderer2,
  SimpleChanges,
  inject,
  isDevMode,
  ɵunwrapSafeValue as unwrapSafeUrl,
} from '@angular/core';
import { MatxAvatarComponent } from './avatar.component';

@Directive({
  selector: 'img[matxAvatarImage]',
  standalone: true,
})
export class MatxAvatarImageDirective
  implements AfterViewInit, OnChanges, OnInit
{
  #avatar = inject(MatxAvatarComponent);
  #element: HTMLImageElement = inject(ElementRef).nativeElement;
  #renderer = inject(Renderer2);

  @HostBinding('style') style =
    `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;`;

  @Input({ required: true, transform: unwrapSafeUrl }) src!: string;

  @Input() srcset?: string;

  @Input() width?: string;

  @Input() height?: string;

  ngOnInit(): void {
    if (isDevMode()) {
      assertEmptyWidthAndHeight(this);
    }
  }

  ngAfterViewInit(): void {
    this.#avatar._setUseImage(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this.#listenForImageEvents();
      this.#updateSrcAndSrcSet();
    }
  }

  #setHostAttribute(name: string, value: string): void {
    this.#renderer.setAttribute(this.#element, name, value);
  }

  #updateSrcAndSrcSet() {
    this.#setHostAttribute('src', this.src);
    if (this.srcset) {
      this.#setHostAttribute('srcset', this.srcset);
    }
  }

  #listenForImageEvents() {
    const unlistenLoadFn = this.#renderer.listen(this.#element, 'load', () => {
      this.#avatar._setUseImage(true);
      unlistenLoadFn();
      unlistenErrorFn();
    });
    const unlistenErrorFn = this.#renderer.listen(
      this.#element,
      'error',
      () => {
        this.#avatar._setUseImage(false);
        unlistenLoadFn();
        unlistenErrorFn();
      },
    );
  }
}

function assertEmptyWidthAndHeight(dir: MatxAvatarImageDirective) {
  if (dir.width || dir.height) {
    throw new Error(
      `the attributes \`height\` and/or \`width\` are present and should not be. The image directive will handle setting its dimensions`,
    );
  }
}
