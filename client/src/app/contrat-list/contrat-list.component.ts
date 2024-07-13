import { Component } from '@angular/core';
import {contratService} from '../contrat.service';
import {PropertyService} from "../properties.service";
import {Router} from "@angular/router";
import {Contrat} from '../contrats'

@Component({
  selector: 'app-contrat-list',
  templateUrl: './contrat-list.component.html',
  styleUrls: ['./contrat-list.component.css']
})
export class ContratListComponent {
  contrats : Contrat[];
  EnteredID !: number;

  constructor(private contratService: contratService, private router: Router) {
    this.contrats = [];
  }

  ngOnInit(): void {
    this.getContrats();
  }

  goToContrat() {
    console.log(this.EnteredID);
    this.router.navigate(['details-of-contrat', this.EnteredID]);
  }

  getContrats() {
    this.contratService.getContratsList().subscribe(data => {this.contrats = data;});
  }

  updateContrat(id: number) {
    this.router.navigate(['updating-contrat-by-id', id]);
  }

  deleteContrat(id: number) {
    if(confirm("Are you sure to delete Contrat ID: "+id)) {
      this.contratService.deleteContrat(id).subscribe( data => {
        console.log(data);
        this.getContrats();
      })
    }
  }

  detailsOfContrat(id: number) {
    this.router.navigate(['details-of-contrat', id]);
  }
}
