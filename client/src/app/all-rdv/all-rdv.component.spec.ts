import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRDVComponent } from './all-rdv.component';

describe('AllRDVComponent', () => {
  let component: AllRDVComponent;
  let fixture: ComponentFixture<AllRDVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllRDVComponent]
    });
    fixture = TestBed.createComponent(AllRDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
