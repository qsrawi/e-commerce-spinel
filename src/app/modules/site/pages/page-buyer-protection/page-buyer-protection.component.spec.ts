import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageBuyerProtectionComponent } from './page-buyer-protection.component';

describe('PageBuyerProtectionComponent', () => {
  let component: PageBuyerProtectionComponent;
  let fixture: ComponentFixture<PageBuyerProtectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PageBuyerProtectionComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageBuyerProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
