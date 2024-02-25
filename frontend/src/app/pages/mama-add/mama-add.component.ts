import { Component, OnInit } from '@angular/core';
import { RestService, PostMom, PostCourse, Course } from '../../services/rest.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mama-add',
  templateUrl: './mama-add.component.html',
  styleUrls: ['./mama-add.component.scss']
})
export class MamaAddComponent implements OnInit {
  constructor(
    private restService: RestService,
    private dataService: DataService,
    private router: Router,
    private snackBar: MatSnackBar
  ) {}

  firstName: string | undefined;
  lastName: string | undefined;
  billsPayed: boolean = false;
  courses: Course[] = [];
  mom: PostMom | undefined;
  selectedCourses: string[] = [];
  createdMom: string | undefined;

  ngOnInit(): void {
    this.dataService.getCourses().subscribe((res) => {this.courses = res})
  }
  
  onSave(): void {
    if (this.firstName && this.lastName) {
      let postMom: PostMom = {
        firstName: this.firstName,
        lastName: this.lastName,
        billsPayed: this.billsPayed,
        courses: this.selectedCourses,
        attendance: 0
      }
      this.restService.postMom(postMom).subscribe({
        next: (res) => {
          this.createdMom = res.data.id;
        },
        complete: () => {
          this.router.navigate(['/mamas/'], { skipLocationChange: true });
          this.snackBar.open('Mama hinzugefügt!', 'Ausblenden', {
            duration: 3 * 1000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
          this.selectedCourses.forEach((courseId) => {
            let course = this.courses.find(course => course.id === courseId)
            let updateCourse: PostCourse = {
              name: course!.name,
              moms: [...course!.moms, this.createdMom!]
            };
            this.restService.putCourse(courseId, updateCourse).subscribe()
          })
        }
      });     
    }
  }

  onBack(): void {
    this.router.navigate(['/mamas/'], { skipLocationChange: true });
  }
}
