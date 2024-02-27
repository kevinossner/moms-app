import { Component, OnInit } from '@angular/core';
import { PostCourse, RestService } from '../../services/rest.service';
import { Mom } from '../../services/rest.service';
import { DataService } from '../../services/data.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-mamas',
  templateUrl: './mamas.component.html',
  styleUrls: ['./mamas.component.scss'],
})
export class MamasComponent implements OnInit {
  constructor(
    private dataService: DataService,
    private router: Router,
    public dialog: MatDialog,
    private snackBar: MatSnackBar
  ) {}

  moms: Mom[] = [];
  selectedId: string | undefined;
  dialogRef: any;

  ngOnInit(): void {
    this.dataService.getMoms().subscribe((res: any) => {
      this.moms = res;
    });
  }

  openDialog(templateRef: any, id: string) {
    this.selectedId = id;
    this.dialogRef = this.dialog.open(templateRef, {
      width: '300px',
    });
  }

  onCancel() {
    this.dialogRef.close();
  }

  onDelete() {
    if (this.selectedId) {
      let snackBar = this.snackBar;
      this.dataService.deleteMom(this.selectedId).then(() => {
        this.dataService.getMoms().subscribe((moms) => {
          this.moms = moms;
        });
        this.dialogRef.close();
        snackBar.open('Mama gelöscht!', 'Ausblenden', {
          duration: 3 * 1000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
        });
      });
      let selectedMom = this.moms.find((mom) => mom.id === this.selectedId);
      selectedMom?.courses.forEach((courseId) => {
        this.dataService.getCourse(courseId).subscribe({
          next: (res) => {
            let updatedCourse: PostCourse = {
              name: res.name,
              moms: res.moms.filter(
                (mom: string) => mom !== this.selectedId
              ),
            };
            this.dataService.putCourse(courseId, updatedCourse)
          }     
        })
      });
    }
  }

  onAdd(): void {
    this.router.navigate(['/mamas/add/'], { skipLocationChange: true });
  }

  onEdit(id: string) {
    this.router.navigate(['/mamas/edit/', id], { skipLocationChange: true });
  }
}
