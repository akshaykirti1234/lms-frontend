import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AssessmentService } from '../../Services/assessment.service';

@Component({
  selector: 'app-add-assesment',
  templateUrl: './add-assesment.component.html',
  styleUrls: ['./add-assesment.component.css']
})
export class AddAssesmentComponent {

  schedulelist: any;
  assessmentData: any;
  assessmentId: any;
  scheduleForName: any

  constructor(private formBuilder: FormBuilder, private service: AssessmentService, private router: Router, private actRout: ActivatedRoute) {
    this.assessmentData = this.formBuilder.group({
      assessmentId: ['',],
      scheduleForId: ['', [Validators.required]],
      question: ['', [Validators.required]],
      option1: ['', [Validators.required]],
      option2: ['', [Validators.required]],
      option3: ['', [Validators.required]],
      option4: ['', [Validators.required]],
      answer: ['', [Validators.required]]

    })
  }

  ngOnInit() {
    this.actRout.params.subscribe((params) => {
      this.assessmentId = params['id'];
      console.log(this.assessmentId);
      this.service.editAssessment(this.assessmentId).subscribe(response => {

        this.assessmentData.patchValue({
          assessmentId: response.ASSESSMENTID,
          scheduleForId: response.SCHEDULEFORID,
          question: response.QUESTION,
          option1: response.OPTION1,
          option2: response.OPTION2,
          option3: response.OPTION3,
          option4: response.OPTION4,
          answer: response.ANSWER
        })
      })
    })
    this.getAllSchedules();

  }
  getAllSchedules() {
    this.service.getAllScheduleName().subscribe((data: any) => {

      this.schedulelist = data;
      console.log(this.schedulelist)
    })
  }

  // saveForm() {
  //   if (this.assessmentData.valid) {
  //     this.service.saveAssessment(this.assessmentData.value).subscribe((response) => {
  //       Swal.fire("Success", "Data saved Successfully", "success");
  //       this.router.navigate(["/dashboard/viewAssessment"])

  //     },
  //       (error: any) => {
  //         Swal.fire({

  //           icon: 'error',

  //           title: 'Something Went Wrong!',

  //         });
  //       }
  //     )
  //   } else {
  //     Swal.fire({
  //       icon: 'error',
  //       title: 'Please Enter Form Correctly',
  //     });
  //   }
  // }

  public saveForm(): void {
    if (this.assessmentData.valid) {
      Swal.fire({
        title: this.assessmentData.get('assessmentId').value === '' ? 'Do you want to save ?' : 'Do you want to Update ?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.service.saveAssessment(this.assessmentData.value).subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: this.assessmentData.get('assessmentId').value === '' ? 'Assesment Saved Successfully' : 'Updated Successfully',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/admin/assessment/viewAssessment']);
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
      this.assessmentData.markAllAsTouched();
    }
  }
}
