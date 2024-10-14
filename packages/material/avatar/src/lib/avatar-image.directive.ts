import {
  AfterViewInit,
  Directive,
  ElementRef,
  OnChanges,
  OnInit,
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
export class MatxAvatarImageDirective
  implements AfterViewInit, OnChanges, OnInit
{
  #avatar = inject(MATX_AVATAR);
  #element: HTMLImageElement = inject(ElementRef).nativeElement;
  #renderer = inject(Renderer2);

  src = input.required<string>();

  width = input<string>();

  height = input<string>();

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

function assertEmptyWidthAndHeight(dir: MatxAvatarImageDirective) {
  if (dir.width() || dir.height()) {
    throw new Error(
      `the attributes \`height\` and/or \`width\` are present and should not be. The image directive will handle setting its dimensions`,
    );
  }
}
