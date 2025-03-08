import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageTypeComponent } from './page-type.component';

describe('PageTypeComponent', () => {
  let component: PageTypeComponent;
  let fixture: ComponentFixture<PageTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PageTypeComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
