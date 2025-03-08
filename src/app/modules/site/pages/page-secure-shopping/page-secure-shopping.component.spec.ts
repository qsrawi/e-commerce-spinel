import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageSecureShoppingComponent } from './page-secure-shopping.component';

describe('PageSecureShoppingComponent', () => {
  let component: PageSecureShoppingComponent;
  let fixture: ComponentFixture<PageSecureShoppingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PageSecureShoppingComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageSecureShoppingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
