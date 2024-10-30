import {
  Directive,
  ElementRef,
  Renderer2,
  effect,
  inject,
  input,
  isDevMode,
  untracked,
} from '@angular/core';
import { MATX_AVATAR } from './avatar.component';

@Directive({
  selector: 'img[matxAvatarImage]',
  standalone: true,
  host: {
    '[attr.aria-hidden]': 'true',
  },
})
export class MatxAvatarImageDirective {
  #avatar = inject(MATX_AVATAR);
  #element: HTMLImageElement = inject(ElementRef).nativeElement;
  #renderer = inject(Renderer2);

  /**
   * https://html.spec.whatwg.org/multipage/images.html#device-pixel-ratio
   * The expection for an avatar is that it is not responsive (is not dependent on viewport size)
   * and that it isn't used for art direction (doesn't have different versions for different viewport sizes)
   * It can have different versions for different pixel density screens though.
   * Because of this it is expected that only the 'src' attribute is set with the 'srcset' attribute optionally set.
   * If the srcset attribute is set it should use pixel density syntax (with a 1.5x, 2x, etc... suffix on the url)
   * When the srcset attribute is set the src attribute participates in the selection of the appropriate image
   * with the src attribute acting as the 1x version of the image.
   */
  src = input.required<string>();

  constructor() {
    if (isDevMode()) {
      assertImageWidthAndHeightNotSet(this.#element);
    }
    this.#notifyAvatarOfImage();
  }

  #notifyAvatarOfImage() {
    effect(() => {
      const src = this.src();

      const callback = () => {
        removeLoadListenerFn();
        removeErrorListenerFn();
        const useImage = isImageAvailable(this.#element);
        untracked(() => this.#avatar._setUseImage(useImage));
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

      callOnLoadIfImageAvailable(this.#element, callback);
    });
  }
}

/*** Helpers ***/

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

function isImageAvailable(img: HTMLImageElement) {
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
  return img.complete && img.naturalWidth > 0;
}

function callOnLoadIfImageAvailable(
  img: HTMLImageElement,
  callback: VoidFunction,
) {
  if (isImageAvailable(img)) {
    callback();
  }
}
