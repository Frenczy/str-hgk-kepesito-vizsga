import { Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, NgForm } from '@angular/forms';
import { StudentHttpService } from '../../service/student-http.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Student } from '../../models/student'
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.css']
})
export class StudentFormComponent implements OnInit {

  @ViewChild('form') form: NgForm;
  reactForm: FormGroup;

  student$: Observable<Student> = this.activatedRoute.params.pipe(switchMap(e=>this.studentService.getById(e.id)))

  studentId: string;
  studentForm: Student = {firstName:'', lastName:"", email:""}

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private studentService: StudentHttpService) { }

  ngOnInit(): void {
    this.studentId=this.activatedRoute.snapshot.params.id;
    if(this.studentId){
      this.studentService.getById(this.studentId).subscribe(e=>{this.studentForm = e})
    }  
  }

  saveStudent(form: NgForm){
    if(this.studentId){
      this.studentService.update(form.value, this.studentId).subscribe(
        e => this.router.navigate(['student-list']),
        err => console.error(err)
      )
    }else {
      this.studentService.save(form.value).subscribe(
        e => this.router.navigate(['student-list']),
        err => console.error(err)
      )
    }

  }
}
