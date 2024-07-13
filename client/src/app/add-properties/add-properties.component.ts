import { Component } from '@angular/core';
import { Property } from '../properties';
import { Observable } from 'rxjs';
import { PropertyService } from '../properties.service';
import { Router } from '@angular/router';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-add-properties',
  templateUrl: './add-properties.component.html',
  styleUrls: ['./add-properties.component.css']
})
export class AddPropertyComponent {

  constructor(
    private propertyService: PropertyService,
    private router: Router,
  ) { }

  submitform!: NgForm;
  private baseURL = "http://localhost:8080/api/v1/properties";
  property: Property = new Property();

  saveProperty() {
    console.log(this.property);
    this.propertyService.addProperty(this.property).subscribe(data => {
      console.log(data);
      this.goToPropertyList();
    },
      error => console.log(error));
  }

  goToPropertyList() {
    this.router.navigate(['/show-all-properties']);
  }

  ngOnInit(): void { }
  onSubmit() {
    console.log(this.property);
    this.saveProperty();
  }
}