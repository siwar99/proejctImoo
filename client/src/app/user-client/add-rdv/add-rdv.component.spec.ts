import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRDVComponent } from './add-rdv.component';

describe('AddRDVComponent', () => {
  let component: AddRDVComponent;
  let fixture: ComponentFixture<AddRDVComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AddRDVComponent]
    });
    fixture = TestBed.createComponent(AddRDVComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
