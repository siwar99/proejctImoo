import { Component, OnInit } from '@angular/core';
import { Property } from 'src/app/properties';
import { UserClientService } from '../services/user-client.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-all-property',
  templateUrl: './all-property.component.html',
  styleUrls: ['./all-property.component.css']
})
export class AllPropertyComponent implements OnInit{
  
  properties: Property[] = [];
  displayedColumns: string[] = ['adresse', 'type', 'price', 'bedrooms', 'bathrooms', 'area', 'description', 'propertyStatus', 'actions'];

  constructor(private clientService:UserClientService,private router: Router){}
  ngOnInit(): void {
   this.AllPropertyDispo();
  }


  private AllPropertyDispo(){
    this.clientService.AllPropertyDisponible().subscribe((data) =>{
      this.properties=data;
      console.log('All properties',this.properties)
    },
    (error) => {
      console.error('Error fetching properties:', error);
    }
  )
  }
 addrdv( propertyId : number){
  this.router.navigate([`user-client/AddRDV`, propertyId]);
 }

}
