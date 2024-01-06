import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PatientMService } from '../service/patient-m.service';

@Component({
  selector: 'app-patient-m-profile',
  templateUrl: './patient-m-profile.component.html',
  styleUrls: ['./patient-m-profile.component.scss']
})
export class PatientMProfileComponent {
  patientProfile:any = [];
  option_selected:number = 1;

  patient_id:string = '';
  num_appointment:number = 0;
  money_of_appointments:number = 0;
  num_appointment_pendings:number = 0;
  patient_selected:any;
  appointment_pendings:any = [];
  appointments:any = [];

  constructor(
    public patientService: PatientMService,
    public activedRoute: ActivatedRoute,
  ) {
    this.patientProfile = [];
    this.option_selected = 1;
    this.patient_id = '';
    this.num_appointment = 0;
    this.money_of_appointments = 0;
    this.num_appointment_pendings = 0;
    this.patient_selected = null; // Inicializado a null o un objeto vacío según tus necesidades
    this.appointment_pendings = [];
    this.appointments = [];
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.activedRoute.params.subscribe((resp:any) => {
      console.log(resp);
      this.patient_id = resp.id;
    })
    this.patientService.showPatient(this.patient_id).subscribe((resp:any) => {
      console.log(resp);
      this.num_appointment = resp.num_appointment;
      this.money_of_appointments = resp.money_of_appointments;
      this.num_appointment_pendings = resp.num_appointment_pendings;
      this.patient_selected = resp.patient;
      this.appointment_pendings = resp.appointment_pendings.data;
      this.appointments = resp.appointments;
    })
  }

  optionSelected(value:number){
    this.option_selected = value;
  }
}
