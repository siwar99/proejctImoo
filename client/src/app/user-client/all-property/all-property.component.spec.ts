import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPropertyComponent } from './all-property.component';

describe('AllPropertyComponent', () => {
  let component: AllPropertyComponent;
  let fixture: ComponentFixture<AllPropertyComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPropertyComponent]
    });
    fixture = TestBed.createComponent(AllPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
