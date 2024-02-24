import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {
  RestService,
  Appointment,
  Mom,
  Registration,
  CreateRegistration,
  Course,
  CourseRegistrations
} from '../../services/rest.service';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-appointments',
  templateUrl: './appointments.component.html',
  styleUrls: ['./appointments.component.scss'],
})
export class AppointmentsComponent {
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restService: RestService,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}
  public selectedDate?: string;
  public appointments: Appointment[] = [];
  public courses: Course[] = [];
  public moms: Mom[] = [];
  private selectedAppointment?: string;
  public selectedMom?: number;
  private dialogRef: any;
  public courseRegistrations: CourseRegistrations[] = []
  private registration = <CreateRegistration>{};

  fetchAppointments(): any {
    this.restService.getAppointmentsByDate(this.selectedDate!).subscribe({
      next: (res) => {
        this.appointments = res;
      },
      complete: () => {
        this.appointments.forEach((appointment) => {
          this.restService.getCourse(appointment.courseId).subscribe({
            next: (res) => {
              this.courses.push(res)
              return this.courses
            }
          })
        })
      }
    })
  }

  fetchRegistrations(courses: any): void {
    courses.forEach((course: any) => {
      this.restService.getRegistrationsByCourse(course.id).subscribe({
        next: (res) => {
          this.courseRegistrations.push(res);
        }
      })
    })
  }

  ngOnInit(): void {
    this.route.params.subscribe({
      next: (res) => {
        this.selectedDate = res["date"]
      }
    })
    this.fetchAppointments().then((courses: any) => {
      this.fetchRegistrations(courses);
    });
  }

  // fetchMoms() {
  //   this.moms.length = 0;
  //   this.restService.getMamas().subscribe((res) => {
  //     res.forEach((mom) => this.moms.push(mom));
  //   });
  // }

  // fetchAppointments() {
  //   this.appointments.length = 0;
  //   this.route.params.subscribe((params) => {
  //     this.selectedDate = params['date'];
  //     this.restService
  //       .getAppointmentsByDate(params['date'])
  //       .subscribe((res) => {
  //         res.forEach((appointment) => this.appointments.push(appointment));
  //       });
  //   });
  // }

  // ngOnInit() {
  //   this.fetchAppointments();
  //   this.fetchMoms();
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

  onCancel() {
    this.dialogRef.close();
  }

  onDeleteAppointment(): void {
    if (this.selectedAppointment) {
      this.restService.deleteAppointment(this.selectedAppointment).subscribe({
        complete: () => {
          this.dialogRef.close();
          this.snackBar.open('Termin gelöscht!', 'Ausblenden', {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.appointments = [];
          this.courses = [];
          this.fetchAppointments();
        }
      })
    }
  }

  openDialog(templateRef: any, id: string) {
    this.selectedAppointment = id;
    this.dialogRef = this.dialog.open(templateRef, {
      width: '300px',
    });
  }

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
