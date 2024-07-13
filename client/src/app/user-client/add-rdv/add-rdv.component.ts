import { Component, OnInit } from '@angular/core';
import { UserClientService } from '../services/user-client.service';
import { ActivatedRoute, Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { RDV } from '../model/RDV';
import { format, isBefore, parseISO, startOfToday } from 'date-fns';
import { MatCalendarCellClassFunction } from '@angular/material/datepicker';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-add-rdv',
  templateUrl: './add-rdv.component.html',
  styleUrls: ['./add-rdv.component.css']
})
export class AddRDVComponent implements OnInit{
  dateNonDispo : string[] = [];
  propertyId!:number;
  addRdvForm!: FormGroup;
  constructor(private clientService:UserClientService,
    private route: ActivatedRoute,
    private router: Router,
    private fb:FormBuilder,
    private toastr: ToastrService
  ){}

  ngOnInit(): void {
    this.propertyId = +this.route.snapshot.paramMap.get('propertyId')!;
    console.log("ad rdv property  ID",this.propertyId)
    
    this.initForm();
    this.AllDateNonDisp();
  }
  initForm() {
    this.addRdvForm = this.fb.group({
      description: ['', Validators.required],
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
    if (this.addRdvForm.valid) {
      const formValues = this.addRdvForm.value;
      const date = new Date(formValues.date);
      const time = formValues.time.split(':');
      date.setHours(time[0], time[1]);
      const formattedDateHeure = format(date, "yyyy-MM-dd'T'HH:mm:ss");
      const newRdv =new RDV ();
      newRdv.description=formValues.description;
      newRdv.dateHeure=formattedDateHeure;
        
    
    console.log("dddddd",newRdv)
    this.clientService.AddRDV(newRdv,this.propertyId).subscribe((data)=>{
      console.log('Rendezvous added successfully', data);
      this.toastr.success('RDV added successfully');
      this.router.navigate(['/user-client']);

    },
    (error) => {
      console.error('Error saveing RDV:', error);
      this.toastr.error('Error saving RDV. Please choose another time ');
    }
  
  )
  }
  }
  isDateNonDispo(date: string): boolean {
    return  this.dateNonDispo && this.dateNonDispo.includes(date);
  }

}
