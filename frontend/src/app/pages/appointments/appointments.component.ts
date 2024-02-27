import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { filter } from 'rxjs/operators';
import { first } from 'rxjs/operators';

import {
  RestService,
  Appointment,
  Mom,
  Course
} from '../../services/rest.service';
import { DataService } from '../../services/data.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent implements OnInit {

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restService: RestService,
    private dataService: DataService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  public selectedDate: string | undefined;
  public appointments: Appointment[] = [];
  public courses: Course[] = [];
  public momIds: string[][] = [];
  private dialogRef: any;
  public test: any;
  public selectedMoms: Mom[] = [];
  public isSelected: boolean[] = [];


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedDate = params["date"]

      this.dataService.getAppointmentsByDate(params["date"]).pipe(first()).subscribe((appointments) => {
        this.appointments = appointments
        appointments.forEach((appointment) => {
          this.dataService.getCourse(appointment.courseId).pipe(first()).subscribe((course) => {
            this.courses.push(course);
            this.momIds.push(course.momIds);
          })
        })
      })
    })



    // let data = this.dataService.getData();
    // this.selectedDate = data.date;
    // this.dataService.getAppointments().subscribe((res) => {this.appointments = res});
    // // this.appointments = data.appointments;
    // this.isSelected = new Array(data.appointments.length).fill(false);
    // this.appointments.forEach((appointment) => {
    //   this.restService.getCourse(appointment.courseId).subscribe({
    //     next: (course) => {
    //       this.courses.push(course.data)
    //       this.momIds.push(course.data.moms)
    //     }
    //   })
    // })
  }

  // onCardClick(i: number): void {
  //   if (this.isSelected[i]) {
  //     this.isSelected[i] = false;
  //     this.selectedMoms = [];
  //   } else {
  //     this.selectedMoms = [];
  //     this.momIds[i].forEach((momId) => {
  //       this.restService.getMom(momId).subscribe({
  //         next: (res) => {
  //           this.selectedMoms.push(res.data)
  //         }
  //       })
  //     })
  //   this.isSelected = new Array(this.isSelected.length).fill(false)
  //   this.isSelected[i] = true;      
  //   }
  // }

  // onAdd(appointmentId: number): void {
  //   if (this.selectedMom) {
  //     this.registration.mom_id = this.selectedMom;
  //     this.registration.appointment_id = appointmentId;
  //     this.restService.postRegistration(this.registration).subscribe({
  //       next(res) {},
  //       error(msg) {
  //         console.log('Error Getting Location: ', msg);
  //       },
  //       complete: () => {
  //         this.fetchAppointments();
  //         this.selectedMom = undefined;
  //       },
  //     });
  //   }
  // }

  onBack(): void {
    this.router.navigate(['/calendar/'], { skipLocationChange: true });
  }

  // onDeleteRegistration(id: number): void {
  //   this.restService.deleteRegistration(id).subscribe({
  //     next(res) {},
  //     error(msg) {
  //       console.log('Error Getting Location: ', msg);
  //     },
  //     complete: () => {
  //       this.fetchAppointments();
  //     },
  //   });
  // }

  // onCancel() {
  //   this.dialogRef.close();
  // }

  // onDeleteAppointment(): void {
  //   if (this.selectedAppointment) {
  //     this.restService.deleteAppointment(this.selectedAppointment).subscribe({
  //       complete: () => {
  //         this.dialogRef.close();
  //         this.snackBar.open('Termin gelöscht!', 'Ausblenden', {
  //           duration: 3 * 1000,
  //           horizontalPosition: 'center',
  //           verticalPosition: 'top',
  //         });
  //         this.appointments = [];
  //         this.courses = [];
  //         this.fetchAppointments();
  //       }
  //     })
  //   }
  // }

  // openDialog(templateRef: any, id: string) {
  //   this.selectedAppointment = id;
  //   this.dialogRef = this.dialog.open(templateRef, {
  //     width: '300px',
  //   });
  // }

  // setAll(id: number, checked: boolean): void {
  //   this.restService.putRegistration(id, checked).subscribe({
  //     next(res) {},
  //     error(msg) {
  //       console.log('Error Getting Location: ', msg);
  //     },
  //     complete() {

  //     },
  //   });
  // }
}
