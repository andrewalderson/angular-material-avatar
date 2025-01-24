/* eslint-disable @angular-eslint/no-inputs-metadata-property */
import {
  ChangeDetectionStrategy,
  Component,
  Directive,
  ElementRef,
  HostAttributeToken,
  InjectionToken,
  ViewEncapsulation,
  inject,
  signal,
} from '@angular/core';

export interface MatxAvatar {
  _elementRef: ElementRef<HTMLElement>;
  _setUseImage: (value: boolean) => void;
}

export const MATX_AVATAR = new InjectionToken<MatxAvatar>('matxAvatar');

@Directive({
  selector: '[matxAvatarFallback]',
  standalone: true,
  host: {
    '[attr.aria-hidden]': 'true',
  },
})
export class MatxAvatarFallbackDirective {}

@Component({
  selector: 'matx-avatar',
  standalone: true,
  imports: [],
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  host: {
    role: 'img',
  },
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None,
  providers: [{ provide: MATX_AVATAR, useExisting: MatxAvatarComponent }],
})
export class MatxAvatarComponent implements MatxAvatar {
  public _elementRef: ElementRef<HTMLElement> = inject(ElementRef);

  protected readonly useImage = signal(false);

  constructor() {
    const ariaHidden = inject(new HostAttributeToken('aria-hidden'), {
      optional: true,
    });

    /**
     * By default we will set the aria-hidden to true if it is not explicitly set
     * For most use cases an avatar is a decorative element
     * and if a label or description is needed, it's containing element should supply it
     * eg. If it is used as a menu trigger for a profile menu that it should be wrapped in a button
     * and an appropriate label or aria-label should be added to the button
     * If it is used as a decoration in a list of users, contacts, etc... then the list element
     * should supply the associated label and the avatar is simply a design element
     * and has no sematics ike a css background image
     *
     */
    if (!ariaHidden) {
      this._elementRef.nativeElement.setAttribute('aria-hidden', 'true');
    }
  }

  _setUseImage(value: boolean) {
    this.useImage.set(value);
  }
}
