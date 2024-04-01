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
  public userList: any;


  constructor(private assignService: AssignService, private fb: FormBuilder) { }

  ngOnInit(): void {
  }


  public onFormSubmit(): void {

  }

}
