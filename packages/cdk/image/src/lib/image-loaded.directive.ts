import { coerceElement } from '@angular/cdk/coercion';
import {
  Directive,
  ElementRef,
  NgZone,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { Observable, Subject, Subscriber, fromEvent, takeUntil } from 'rxjs';

type ImageState = 'loaded' | 'errored';

/**
 * A resuable directive that will listen for the load and error events on an image
 * and emit either a next or error event on the 'loaded' observable.
 * It will complete the Observable when the directive is destroyed
 */
@Directive({
  selector: 'img[cdkImageLoaded]',
  standalone: true,
})
export class CdkImageLoadedDirective implements OnInit, OnDestroy {
  #elementRef = inject(ElementRef<HTMLImageElement>);
  #ngZone = inject(NgZone);

  #state?: ImageState;

  #subscribers: Subscriber<void>[] | null = [];

  #destroyed = new Subject<void>();

  /**
   * An Observable that that emits to each subscriber either
   * 'next' when the image successfully loads or 'error' if the image
   * fails to load.
   *
   * This Observable has the same lifetime as the directive so that
   * if the image src changes the subscriber will receive the new loaded state.
   *
   * This Observable will be cleaned up when this directive is destroyed
   * by calling 'complete' on all subscribers.
   */
  readonly loaded = new Observable<void>((subscriber) => {
    if (!this.#subscribers) {
      this.#subscribers = [];
    }
    this.#subscribers.push(subscriber);

    // for late subscribers notify immediately if state has been set
    if (this.#state === 'loaded') {
      this.#notifySubscriberOfLoad(subscriber);
    }
    if (this.#state === 'errored') {
      this.#notifySubscriberOfError(subscriber);
    }
  });

  ngOnInit() {
    const element = coerceElement(this.#elementRef);
    // no need to trigger change detection for these events
    // so they are not HostListeners
    this.#ngZone.runOutsideAngular(() => {
      fromEvent(element, 'load')
        .pipe(takeUntil(this.#destroyed))
        .subscribe(this.#markAsLoaded);
      fromEvent(element, 'error')
        .pipe(takeUntil(this.#destroyed))
        .subscribe(this.#markAsErrored);
    });
  }

  ngOnDestroy(): void {
    this.#destroyed.next();
    this.#destroyed.complete();

    this.#subscribers?.forEach((subscriber) => subscriber.complete());
    this.#subscribers = null;
  }

  #markAsLoaded = () => {
    this.#state = 'loaded';

    this.#subscribers?.forEach(this.#notifySubscriberOfLoad);
  };

  #markAsErrored = () => {
    this.#state = 'errored';

    this.#subscribers?.forEach(this.#notifySubscriberOfError);
  };

  #notifySubscriberOfError = (subscriber: Subscriber<void>): void => {
    this.#ngZone.run(() => {
      subscriber.error();
    });
  };

  #notifySubscriberOfLoad = (subscriber: Subscriber<void>): void => {
    this.#ngZone.run(() => {
      subscriber.next();
    });
  };
}
