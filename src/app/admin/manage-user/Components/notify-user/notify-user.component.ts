import { Component, OnInit } from '@angular/core';
import { FormArray, FormBuilder, Validators } from '@angular/forms';
import { ManageUserService } from '../../Services/manage-user.service';


@Component({
  selector: 'app-notify-user',
  templateUrl: './notify-user.component.html',
  styleUrls: ['./notify-user.component.css']
})
export class NotifyUserComponent implements OnInit {

  public notifyForm: any;
  public userList: any;


  constructor(private fb: FormBuilder, private manageUserService: ManageUserService) {
    this.notifyForm = fb.group({
      // emailId: fb.control('', [Validators.required]),
      notifyStatus: fb.control('', [Validators.required]),
      normalPassword: fb.control(''),
      selectedEmails: fb.array([], Validators.required),
    });


  }

  ngOnInit(): void {
    this.getAllUsers();
  }

  getAllUsers(): void {
    this.manageUserService.getAllUsers().subscribe({
      next: (response) => {
        this.userList = response.body;
        console.log(this.userList);
      }, error: (error) => {
        console.log(error);
      }
    });
  }

  public onFormSubmit(): void {

  }

}
