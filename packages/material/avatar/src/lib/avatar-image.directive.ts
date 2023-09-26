import {
  Directive,
  HostListener,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { BehaviorSubject, distinctUntilChanged } from 'rxjs';
import { MatxAvatarComponent } from './avatar.component';

@Directive({
  selector: 'img[matxAvatarImage]',
  standalone: true,
})
export class MatxAvatarImageDirective implements OnInit, OnDestroy {
  #avatar = inject(MatxAvatarComponent);

  #ready = new BehaviorSubject<boolean>(false);
  readonly ready = this.#ready.asObservable().pipe(distinctUntilChanged());

  @HostListener('load') loadHandler() {
    this.#ready.next(true);
  }

  @HostListener('error') errorHandler() {
    this.#ready.next(false);
  }

  ngOnInit(): void {
    this.#avatar._registerImage(this);
  }

  ngOnDestroy(): void {
    this.#ready.next(false);
    this.#ready.complete();
  }
}
