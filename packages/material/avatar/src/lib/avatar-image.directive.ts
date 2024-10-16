import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnChanges,
  Renderer2,
  SimpleChanges,
  inject,
  input,
  isDevMode,
} from '@angular/core';
import { MATX_AVATAR } from './avatar.component';

@Directive({
  selector: 'img[matxAvatarImage]',
  standalone: true,
})
export class MatxAvatarImageDirective implements AfterViewInit, OnChanges {
  #avatar = inject(MATX_AVATAR);
  #element: HTMLImageElement = inject(ElementRef).nativeElement;
  #renderer = inject(Renderer2);

  src = input.required<string>();

  constructor() {
    if (isDevMode()) {
      assertImageWidthAndHeightNotSet(this.#element);
    }
  }

  ngAfterViewInit(): void {
    this.#avatar._setUseImage(true);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['src']) {
      this.#listenForImageEvents();
      this.#updateSrc();
    }
  }

  #setHostAttribute(name: string, value: string): void {
    this.#renderer.setAttribute(this.#element, name, value);
  }

  #updateSrc() {
    this.#setHostAttribute('src', this.src());
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

function assertImageWidthAndHeightNotSet(img: HTMLImageElement) {
  if (
    !(
      assertElementAttributeIsNull(img, 'width') &&
      assertElementAttributeIsNull(img, 'height')
    )
  ) {
    throw new Error(
      "the attributes `height` and/or `width` are present and should not be. The image directive will fill it's parent container so these attributes have no effect and should be removed.",
    );
  }
}

function assertElementAttributeIsNull(element: HTMLElement, attr: string) {
  return element.getAttribute(attr) === null;
}
