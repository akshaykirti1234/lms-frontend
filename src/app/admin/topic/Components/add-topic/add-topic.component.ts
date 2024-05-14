import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { TopicService } from '../../Services/topic.service';
import Swal from 'sweetalert2';
import { ManageUserService } from 'src/app/admin/manage-user/Services/manage-user.service';
@Component({
  selector: 'app-add-topic',
  templateUrl: './add-topic.component.html',
  styleUrls: ['./add-topic.component.css']
})
export class AddTopicComponent {

  topicForm: any;
  topicId: any;
  userList:any;
 
  constructor(private fb: FormBuilder, private topicService: TopicService, private router: Router, private actRout: ActivatedRoute,
    private service: ManageUserService) {
    this.topicForm = this.fb.group({
      topicId: [''],
      userId:['', [Validators.required]],
      topicName: ['', [Validators.required, Validators.pattern(/^[a-zA-Z0-9\s]+$/)]],
     //topicName:[''],
     referTo: ['',[Validators.required, Validators.email]]
    });
  }

  ngOnInit() {
    this.getUsersList();
    this.actRout.params.subscribe((params) => {
      this.topicId = params['id'];
      console.log(this.topicId)
      this.topicService.getTopicById(this.topicId).subscribe((response:any) => {
        console.log(response);

        this.topicForm.patchValue({
          topicId: response.topicId,
          userId: response.userMaster.userId,
          topicName: response.topicName,
          referTo: response.referTo
        });

      });

    }
    )
  }


  
      
    getUsersList() {
    this.service.getUsersList().subscribe((data: any) => {
      console.log(data);

      this.userList = data;
    });
  }


  

public saveTopicForm(): void {

  if (this.topicForm.valid) {



    Swal.fire({

      title: this.topicForm.get('topicId').value === '' ? 'Do you want to submit ?' : 'Do you want to Update ?',

      text: "",

      icon: 'warning',

      showCancelButton: true,

      cancelButtonText: 'No',

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes'

    }).then((result) => {

      if (result.isConfirmed) {

        this.topicService.saveTopic(this.topicForm.value).subscribe({

          next: (response) => {

            Swal.fire({

              icon: 'success',

              title: this.topicForm.get('topicId').value === '' ? 'Author Saved Successfully' : 'Update Successfully',

            }).then((result) => {

              if (result.isConfirmed) {

                this.router.navigate(['/admin/topic/viewTopic']);

              }

            });

          },

          error: (error) => {

            Swal.fire({

              icon: 'error',

              title: 'Something Went Wrong!',

            });

          }

        });

      }

    });

  } else {

    Swal.fire({

      icon: 'error',

      title: 'Please fill the fields correctly!',

      text: ''

    });
    this.topicForm.markAllAsTouched();
  }
}

cancel() {
  Swal.fire({
    title: 'Cancel',
    text: 'Are you sure you want to cancel?',
    icon: 'question',
    showCancelButton: true,
    confirmButtonText: 'Yes',
    cancelButtonText: 'No',
  }).then((result) => {
    if (result.isConfirmed) {
      // User confirmed, navigate away
      this.router.navigate(['/admin/topic/viewTopic']);
    }
  });
}



}