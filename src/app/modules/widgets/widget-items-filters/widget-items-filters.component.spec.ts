import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WidgetItemsFiltersComponent } from './widget-items-filters.component';

describe('WidgetItemsFiltersComponent', () => {
  let component: WidgetItemsFiltersComponent;
  let fixture: ComponentFixture<WidgetItemsFiltersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [WidgetItemsFiltersComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WidgetItemsFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
