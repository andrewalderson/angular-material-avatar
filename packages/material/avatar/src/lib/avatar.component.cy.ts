import { TestBed } from '@angular/core/testing';
import { MatxAvatarComponent } from './avatar.component';

describe(MatxAvatarComponent.name, () => {

  beforeEach(() => {
    TestBed.overrideComponent(MatxAvatarComponent, {
      add: { 
        imports: [],
        providers: []
      }
    }) 
  })

  it('renders', () => {
     cy.mount(MatxAvatarComponent,);
  })

})
