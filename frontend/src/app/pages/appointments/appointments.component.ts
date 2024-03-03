import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd, ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { first } from 'rxjs/operators';

import {
  RestService,
  Appointment,
  Mom,
  Course,
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
  public isSelected: boolean[] = [];
  public selectedCardIndex: number | undefined;
  public selectedMoms: Mom[] = [];

  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.selectedDate = params['date'];

      this.dataService
        .getAppointmentsByDate(params['date'])
        .pipe(first())
        .subscribe((appointments) => {
          this.appointments = appointments;

          const observables = appointments.map((appointment) => {
            return this.dataService
              .getCourse(appointment.courseId)
              .pipe(first());
          });

          forkJoin(observables).subscribe((courses) => {
            this.courses = courses;
            this.momIds = courses.map((course) => course.moms);
          });
        });
    });
  }

  onExpand(i: number): void {
    this.selectedCardIndex = i;
    this.selectedMoms = [];
    const observables = this.momIds[i].map((momId) => {
      return this.dataService
        .getMom(momId)
        .pipe(first());
    });

    forkJoin(observables).subscribe((moms) => {
      this.selectedMoms = moms;
    });
  }

  onCollapse(i: number): void {
    this.selectedCardIndex = undefined;
    this.selectedMoms = [];
  }

  onCheckChange($event: any, i: number, j: number): void {
    if ($event.checked) {
      this.selectedMoms[j].attendance += 1;
      let { id: momId, ...updatedMom } = this.selectedMoms[j];
      this.dataService.putMom(this.selectedMoms[j].id, updatedMom);
      this.appointments[i].momsAttended.push(momId);
      let { id: appointmentId, ...updatedAppointment } = this.appointments[i];
      this.dataService.putAppointment(appointmentId, updatedAppointment);
    } else {
      this.selectedMoms[j].attendance -= 1;
      let { id: momId, ...updatedMom } = this.selectedMoms[j];
      this.dataService.putMom(this.selectedMoms[j].id, updatedMom);
      this.appointments[i].momsAttended = this.appointments[
        i
      ].momsAttended.filter((elem) => elem !== momId);
      let { id: appointmentId, ...updatedAppointment } = this.appointments[i];
      this.dataService.putAppointment(appointmentId, updatedAppointment);
    }
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
