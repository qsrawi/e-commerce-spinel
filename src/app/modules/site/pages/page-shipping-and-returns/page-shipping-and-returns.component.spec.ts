import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageShippingAndReturnsComponent } from './page-shipping-and-returns.component';

describe('PageShippingAndReturnsComponent', () => {
  let component: PageShippingAndReturnsComponent;
  let fixture: ComponentFixture<PageShippingAndReturnsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PageShippingAndReturnsComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageShippingAndReturnsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
