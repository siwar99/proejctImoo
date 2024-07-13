import { Component, OnInit } from '@angular/core';
import { RDV } from '../user-client/model/RDV';
import { UserClientService } from '../user-client/services/user-client.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FilterDTO } from '../user-client/model/FilterDTO';
import { format } from 'date-fns';

@Component({
  selector: 'app-all-rdv',
  templateUrl: './all-rdv.component.html',
  styleUrls: ['./all-rdv.component.css']
})
export class AllRDVComponent implements OnInit {

  
  statusFilter: string = '';
  propertyType:string ='';
  selectedDate: Date | null = null;
 RDVS!:RDV[];
 filteredRDVS :RDV[]= [];
 displayedColumns: string[] = ['description', 'dateHeure', 'statusRDV', 'propertyType', 'actions'];
 constructor(private clientService:UserClientService,
  private toastr: ToastrService,
  private router: Router
){}
 
 ngOnInit(): void {
  const filterDto = new  FilterDTO() ;
  filterDto.statusRDV="";
  filterDto.type="";
  this.clientService.fliterRDVForHost(filterDto).subscribe((data: RDV[])=>{
    this.RDVS = data;
 })


  
  }

  updateRDV(rdvId: number, status: string) {
    this.clientService.changeStatus(rdvId,status).subscribe((data:any)=>{
      
      const rdv = this.RDVS.find(r => r.id === rdvId);
    if (rdv) {
      rdv.statusRDV = status;
    }
  })
      
    }
  
  onDateChange(event: any) {
    this.selectedDate = event.value ? new Date(event.value) : null;
  }
  
  
  filterRDVs() {
    const filterDto = new  FilterDTO() ;
      if(this.selectedDate != null  ){
        const dateFilter=format(this.selectedDate, "yyyy-MM-dd");
        filterDto.dateHeure=dateFilter;

      }
      filterDto.statusRDV=this.statusFilter;
      filterDto.type = this.propertyType
      

     this.clientService.fliterRDVForHost(filterDto).subscribe((data: RDV[])=>{
        this.RDVS = data;
     })
  }

}
