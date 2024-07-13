import { Component } from '@angular/core';
import { Property } from '../properties';
import { PropertyService } from '../properties.service';
import { FormsModule } from '@angular/forms'
import { Router } from '@angular/router';

@Component({
  selector: 'app-property-list',
  templateUrl: './properties-list.component.html',
  styleUrls: ['./properties-list.component.css']
})
export class PropertyListComponent {

  properties: Property[];
  EnteredID!: number;

  constructor(private propertyService: PropertyService, private router: Router) {
    this.properties = [];
  }

  ngOnInit(): void {
    this.getProperties();
  }

  goToProperty() {
    console.log(this.EnteredID); 
    this.router.navigate(['details-of-properties', this.EnteredID]);
  }

  getProperties() {
    this.propertyService.getPropertiesList().subscribe(
      (data) => {
        console.log("aaaa",data)
        this.properties = data;
      });
    
  }

  updateProperty(id: number) {
    this.router.navigate(['updating-by-id', id]);
  }

  deleteProperty(id: number) {
    if(confirm("Are you sure to delete Property ID: "+id)) {
      this.propertyService.deleteProperty(id).subscribe( data => {
        console.log(data);
        this.getProperties();
      })
    }
  }

  detailsOfProperty(id: number) {
    this.router.navigate(['details-of-properties', id]);
  }

  displayRDVList(id: number) {
    
  }
}