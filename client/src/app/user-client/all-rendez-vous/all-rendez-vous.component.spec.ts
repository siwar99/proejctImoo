import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllRendezVousComponent } from './all-rendez-vous.component';

describe('AllRendezVousComponent', () => {
  let component: AllRendezVousComponent;
  let fixture: ComponentFixture<AllRendezVousComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllRendezVousComponent]
    });
    fixture = TestBed.createComponent(AllRendezVousComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
