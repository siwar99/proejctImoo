import { Component, OnInit } from '@angular/core';
import {KeycloakService} from "./services/keycloak/keycloak.service";
import { UserClientService } from './user-client/services/user-client.service';
import { ToastrService } from 'ngx-toastr';
import { RDV } from './user-client/model/RDV';
import { Router } from '@angular/router';
import { FilterDTO } from './user-client/model/FilterDTO';
import { format, startOfToday } from 'date-fns';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements  OnInit{
  title = 'ImmoLuxe';
  rdvCount: number = 0;
  RDVS:RDV[]=[];
  constructor(private router: Router,private keycloakService: KeycloakService,private clientService: UserClientService,private toastr: ToastrService) {}
  ngOnInit(): void {
    this.getRDVCount();
    //this.getRDVDateNow();
  }
  isUserRole() {
    return this.keycloakService.keycloak?.realmAccess?.roles.includes('ROLE_USER');
  }
  onLogout() {
    this.keycloakService.logout();
  }

  getRDVCount(): void {
    const filterDto= new FilterDTO();
    filterDto.statusRDV="PENDING";
    const today = startOfToday();
    const dateStr = format(today, 'yyyy-MM-dd');
    filterDto.dateHeure=dateStr;
    filterDto.type="";
    this.clientService.fliterRDVForHost(filterDto).subscribe(
      (data:RDV[]) => {
        console.log(">>>",data)
       this.RDVS=data;
       this.rdvCount=this.RDVS.length;
       console.log("count",data)
      },
      (error) => {
        console.error('Error fetching RDV count:', error);
        this.toastr.error('Error fetching RDV count');
      }
    );
  }

  // getRDVDateNow(): void{
  //   this.clientService.getRDVDateNow().subscribe(
  //     (data)=>{
  //       this.RDVS=data
  //     },(error) => {
  //       console.error('Error fetching RDV :', error);
  //       this.toastr.error('Error fetching RDV');
  //     }
  //   )
  // }
  goToAllRdv(){
    this.router.navigate(['/Host-RDVs'])
  }
}
