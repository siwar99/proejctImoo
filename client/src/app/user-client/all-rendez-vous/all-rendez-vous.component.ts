import { Component, OnInit } from '@angular/core';
import { RDV } from '../model/RDV';
import { UserClientService } from '../services/user-client.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FilterDTO } from '../model/FilterDTO';
import { format } from 'date-fns';

@Component({
  selector: 'app-all-rendez-vous',
  templateUrl: './all-rendez-vous.component.html',
  styleUrls: ['./all-rendez-vous.component.css']
})
export class AllRendezVousComponent implements OnInit {
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
  this.AllRDV();
  }

  AllRDV():void{
   this.clientService.AllRDV().subscribe((data)=>{
      this.RDVS=data
      console.log("All RDV ", this.RDVS)
   },
   (error) => {
    console.error('Error fetching RDV:', error);
  }
  )
  }

  deleteRDV(id: number): void {
    this.clientService.deleteRDV(id).subscribe(
      () => {
        this.toastr.success('RDV deleted successfully');
        console.log('RDV deleted');
        this.AllRDV(); 
      
      },
      (error) => {
        console.error('Error deleting RDV:', error);
        this.toastr.error('Error deleting RDV');
      }
    );
  }
  
  updateRDV(rdvId: number) {
    this.router.navigate([`user-client/updateRDV`, rdvId]);
  }

  cancelRDV(id: number) {
    this.clientService.canceledRdv(id).subscribe(
      (data)=>{
        this.toastr.success('RDV updated successfully');
        console.log('RDV updated');
        this.AllRDV(); 
      }
    )
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
      

     this.clientService.fliterRDVForClient(filterDto).subscribe((data: RDV[])=>{
        this.RDVS = data;
     })
  }
}
