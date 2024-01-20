import {
  AfterViewInit,
  Directive,
  ElementRef,
  HostBinding,
  Input,
  OnChanges,
  Renderer2,
  SimpleChanges,
  inject,
  ɵunwrapSafeValue as unwrapSafeUrl,
} from '@angular/core';
import { MatxAvatarComponent } from './avatar.component';

@Directive({
  selector: 'img[matxAvatarImage]',
  standalone: true,
})
export class MatxAvatarImageDirective implements AfterViewInit, OnChanges {
  #avatar = inject(MatxAvatarComponent);
  #element: HTMLImageElement = inject(ElementRef).nativeElement;
  #renderer = inject(Renderer2);

  @HostBinding('style') style =
    `position: absolute; inset: 0; width: 100%; height: 100%; object-fit: cover;`;

  @Input({ required: true, transform: unwrapSafeUrl }) src!: string;

  @Input() srcset?: string;

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
