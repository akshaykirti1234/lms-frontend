import { Component, OnInit } from '@angular/core';
import { AssignService } from '../../Services/assign.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-add-assign',
  templateUrl: './add-assign.component.html',
  styleUrls: ['./add-assign.component.css']
})
export class AddAssignComponent implements OnInit {

  public assignForm: any;

  public subModuleList: any;
  public scheduleList: any;
  public userList: any;


  constructor(private assignService: AssignService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.getAllSubModule();
    this.getAllScheduleForm();
  }


  public onFormSubmit(): void {

  }

  public getAllSubModule(): void {
    this.assignService.getAllSubModules().subscribe({
      next: (response) => {
        this.subModuleList = response.body;
        console.log(this.subModuleList);
      },
      error: (error) => {
        console.log("Something went wrong");
      }
    });
  }

  public getAllScheduleForm(): void {
    this.assignService.getAllScheduleForm().subscribe({
      next: (response) => {
        this.scheduleList = response.body;
        console.log(this.scheduleList);
      },
      error: (error) => {
        console.log("Something went wrong");
      }
    });
  }

}
