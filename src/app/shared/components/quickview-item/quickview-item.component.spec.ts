import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuickviewItemComponent } from './quickview-item.component';

describe('QuickviewItemComponent', () => {
  let component: QuickviewItemComponent;
  let fixture: ComponentFixture<QuickviewItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [QuickviewItemComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(QuickviewItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
