import {
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
  isDevMode,
} from '@angular/core';
import { MATX_AVATAR } from './avatar.component';

type ImageEventTypeCallbackFn = (event: { type: 'load' | 'error' }) => void;

@Directive({
  selector: 'img[matxAvatarImage]',
  standalone: true,
})
export class MatxAvatarImageDirective {
  #avatar = inject(MATX_AVATAR);
  #element: HTMLImageElement = inject(ElementRef).nativeElement;
  #renderer = inject(Renderer2);

  src = input.required<string>();

  constructor() {
    if (isDevMode()) {
      assertImageWidthAndHeightNotSet(this.#element);
    }
    this.notifyAvatarOfImage();
  }

  notifyAvatarOfImage() {
    effect(() => {
      const src = this.src();
      const callback: ImageEventTypeCallbackFn = (event) => {
        removeLoadListenerFn();
        removeErrorListenerFn();
        this.#avatar._setUseImage(event.type === 'load');
      };
      const removeLoadListenerFn = this.#renderer.listen(
        this.#element,
        'load',
        callback,
      );
      const removeErrorListenerFn = this.#renderer.listen(
        this.#element,
        'error',
        callback,
      );
      this.#renderer.setAttribute(this.#element, 'src', src);

      this.#callOnLoadIfImageAvailable(callback);
    });
  }

  #callOnLoadIfImageAvailable(callback: ImageEventTypeCallbackFn) {
    // https://html.spec.whatwg.org/multipage/embedded-content.html#dom-img-complete
    // The spec defines that `complete` is truthy once its request state is fully available.
    // The image may already be available if it’s loaded from the browser cache.
    // In that case, the `load` event will not fire at all, meaning that all setup
    // callbacks listening for the `load` event will not be invoked.
    // In Safari, there is a known behavior where the `complete` property of an
    // `HTMLImageElement` may sometimes return `true` even when the image is not fully loaded.
    // Checking both `img.complete` and `img.naturalWidth` is the most reliable way to
    // determine if an image has been fully loaded, especially in browsers where the
    // `complete` property may return `true` prematurely.
    if (this.#element.complete && this.#element.naturalWidth) {
      callback({ type: 'load' });
    }
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
