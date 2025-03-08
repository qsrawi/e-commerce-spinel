import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PageImportantAdvicesComponent } from './page-important-advices.component';

describe('PageImportantAdvicesComponent', () => {
  let component: PageImportantAdvicesComponent;
  let fixture: ComponentFixture<PageImportantAdvicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
    imports: [PageImportantAdvicesComponent]
})
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PageImportantAdvicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
