import { Component } from '@angular/core';
import { Property } from '../properties';
import { PropertyService } from '../properties.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-show-details',
  templateUrl: './show-details.component.html',
  styleUrls: ['./show-details.component.css']
})
export class ShowDetailsComponent {
  
  id: number
  property!: Property
  constructor(private route: ActivatedRoute, private propertyService: PropertyService) { 

    this.id=0
  }

  ngOnInit(): void {
    this.id = this.route.snapshot.params['id'];

    this.property = new Property();
    this.propertyService.getPropertyById(this.id).subscribe( data => {
      this.property = data;
    });
  }
}