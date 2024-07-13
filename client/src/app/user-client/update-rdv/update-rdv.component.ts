import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserClientService } from '../services/user-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { format, isBefore, parseISO, startOfToday } from 'date-fns';
import { RDV } from '../model/RDV';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';

@Component({
  selector: 'app-update-rdv',
  templateUrl: './update-rdv.component.html',
  styleUrls: ['./update-rdv.component.css']
})
export class UpdateRdvComponent implements OnInit {
  dateNonDispo : string[] = [];
  propertyId!:number;
  rdvId!:number;
  updateRdvForm!: FormGroup;
  constructor(private clientService:UserClientService,
    private route: ActivatedRoute,
    private router: Router,
    private fb:FormBuilder,
    private toastr: ToastrService){}

    
  ngOnInit(): void {
    this.rdvId = +this.route.snapshot.paramMap.get('rdvId')!;

    console.log("rdv Id",this.rdvId)
    
    this.initForm();
    this.AllDateNonDisp();
  }
  initForm() {
    this.updateRdvForm = this.fb.group({
      description: [''],
      date: ['', Validators.required],
      time: ['', Validators.required]
    });
  }
  AllDateNonDisp():void{
    this.clientService.AllDateNonDisponible(this.propertyId ).subscribe((data)=>{
        this.dateNonDispo=data
        console.log("list Of date ", this.dateNonDispo)
    },
    (error) => {
      console.error('Error fetching date Non disponible:', error);
    }
  )
  }

  
  dateFilter = (d: Date | null): boolean => {
    if (!d) return false;
    const today = startOfToday();
    const dateStr = format(d, 'yyyy-MM-dd');
    const isUnavailable = this.dateNonDispo.some(dateNonDispo => format(parseISO(dateNonDispo), 'yyyy-MM-dd') === dateStr);
    return !isUnavailable && !isBefore(d, today);
  };
  dateClass: MatCalendarCellClassFunction<Date> = (cellDate, view) => {
    if (view === 'month') {
      const today = startOfToday();
      const dateStr = format(cellDate, 'yyyy-MM-dd');
      const isUnavailable = this.dateNonDispo.some(dateNonDispo => format(parseISO(dateNonDispo), 'yyyy-MM-dd') === dateStr);
      return isUnavailable || isBefore(cellDate, today) ? 'unavailable-date' : '';
    }
    return '';
  };


  onSubmit(){
    if (this.updateRdvForm.valid) {
      const formValues = this.updateRdvForm.value;
      const date = new Date(formValues.date);
      const time = formValues.time.split(':');
      date.setHours(time[0], time[1]);
      const formattedDateHeure = format(date, "yyyy-MM-dd'T'HH:mm:ss");
      const newRdv =new RDV ();
      newRdv.description=formValues.description;
      newRdv.dateHeure=formattedDateHeure;
        
    
    console.log("dddddd",newRdv)
    this.clientService.updateRdv(newRdv,this.rdvId).subscribe((data)=>{
      console.log('Rendezvous updated successfully', data);
      this.toastr.success('RDV updated successfully');
      this.router.navigate(['/AllRDV']);

    },
    (error) => {
      console.error('Error updating RDV:', error);
      this.toastr.error('Error updating RDV. Please choose another time ');
    }
  
  )
  }
  }
  isDateNonDispo(date: string): boolean {
    return  this.dateNonDispo && this.dateNonDispo.includes(date);
  }

}
