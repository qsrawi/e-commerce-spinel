import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemdropcartComponent } from './itemdropcart.component';

describe('ItemdropcartComponent', () => {
  let component: ItemdropcartComponent;
  let fixture: ComponentFixture<ItemdropcartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [ItemdropcartComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItemdropcartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
