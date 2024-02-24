import { Component, OnInit } from '@angular/core';
import { RestService, PostMom, Course, PostCourse } from '../../services/rest.service';
import { Router, ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-mama-edit',
  templateUrl: './mama-edit.component.html',
  styleUrls: ['./mama-edit.component.scss']
})
export class MamaEditComponent implements OnInit {
  constructor(
    private restService: RestService,
    private router: Router,
    private route: ActivatedRoute,
    private snackBar: MatSnackBar
  ) {}

  momId: string | undefined;
  firstName: string | undefined;
  lastName: string | undefined;
  billsPayed: boolean | undefined;
  initialCourses: string[] = [];
  selectedCourses: string[] = [];
  allCourses: Course[] = [];


  ngOnInit(): void {
    this.route.params.subscribe((params) => {
      this.momId = params["id"]
      this.restService.getMom(params["id"]).subscribe({
        next: (res) => {
          this.firstName = res.data.firstName;
          this.lastName = res.data.lastName;
          this.billsPayed = res.data.billsPayed;
          this.initialCourses = res.data.courses;
          this.selectedCourses = res.data.courses;
        }
      })
    })
    this.restService.getCourses().subscribe({
      next: (res) => {
        this.allCourses = res.data;
      }
    })
  }

  onSave(): void {
    const coursesToDelete = this.initialCourses.filter(course => !this.selectedCourses.includes(course));
    const coursesToAdd = this.selectedCourses.filter(course => !this.initialCourses.includes(course));
    let mom: PostMom = {
      firstName: this.firstName!,
      lastName: this.lastName!,
      billsPayed: this.billsPayed!,
      courses: this.selectedCourses,
      appointments: []
    }

    this.restService.putMom(this.momId!, mom).subscribe({
      complete: () => {
        this.router.navigate(['/mamas/'], { skipLocationChange: true });
        this.snackBar.open('Mama bearbeited!', 'Ausblenden', {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });        
      }
    })
    coursesToDelete.forEach((courseId) => {
      let course = this.allCourses.find((course: Course) => course.id === courseId)
      let updatedCourse: PostCourse = {
        name: course!.name,
        moms: course!.moms.filter((mom: string) => mom !== this.momId)
      }
      this.restService.putCourse(courseId, updatedCourse).subscribe()
    })
    coursesToAdd.forEach((courseId) => {
      let course = this.allCourses.find((course: Course) => course.id === courseId)
      let updatedCourse: PostCourse = {
        name: course!.name,
        moms: [...course!.moms, this.momId!]
      }
      this.restService.putCourse(courseId, updatedCourse).subscribe()
    })
  }

  onBack(): void {
    this.router.navigate(['/mamas/'], { skipLocationChange: true });
  }
}
