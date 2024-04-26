import { Component } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AssessmentService } from '../../Services/assessment.service';
import { SubModuleService } from 'src/app/admin/sub-module/Services/sub-module.service';
import { ScheduleService } from 'src/app/admin/schedule/Services/schedule.service';
import { DashboardService } from 'src/app/user/Services/dashboard.service';
import { SessionMasterService } from 'src/app/admin/session/Services/session-master.service';

@Component({
  selector: 'app-add-assesment',
  templateUrl: './add-assesment.component.html',
  styleUrls: ['./add-assesment.component.css']
})
export class AddAssesmentComponent {
  ModuleList: any[] = [];
  subModuleList: any;
  schedulelist: any;
  assessmentData: any;
  assessmentId: any;
  scheduleForName: any;
  sessionList:any

  constructor(private formBuilder: FormBuilder, private service: AssessmentService, private router: Router,
    private subModuleService : SubModuleService,
     private actRout: ActivatedRoute,
     private dashboardService :DashboardService,private sessionService:SessionMasterService) {

    this.assessmentData = this.formBuilder.group({
      assessmentId: [''],
      scheduleForId: ['', [Validators.required]],
      sessionId: [''],
      question: ['',[Validators.required]],
      option1: ['',[Validators.required]],
      option2: ['',[Validators.required]],
      option3: ['',[Validators.required]],
      option4: ['',[Validators.required]],
      answer: ['',[Validators.required]],
      moduleId: ['' ,[Validators.required]],
      submoduleId: ['', [Validators.required]],
      radio: ['schedule', [Validators.required]] 

    })
  }

  ngOnInit() {
    this.actRout.params.subscribe((params) => {
      this.assessmentId = params['id'];
      console.log(this.assessmentId);
      this.service.editAssessment(this.assessmentId).subscribe(response => {

        this.assessmentData.patchValue({
          assessmentId: response.ASSESSMENTID,
          moduleId:response.MODULEID,
          submoduleId:response.SUBMODULEID,
          scheduleForId: response.SCHEDULEFORID,
          sessionId:response.SESSIONID,
          question: response.QUESTION,
          option1: response.OPTION1,
          option2: response.OPTION2,
          option3: response.OPTION3,
          option4: response.OPTION4,
          answer: response.ANSWER
        })
      })
    })
    //this.getAllSchedules();
    this.getModuleList();

  }

  // getAllSchedules() {
  //   this.service.getAllScheduleName().subscribe((data: any) => {

  //     this.schedulelist = data;
  //     console.log(this.schedulelist)
  //   })
  // }

//for ModuleList
  getModuleList() {
    this.subModuleService.getModuleList().subscribe((responseData: any) => {
      this.ModuleList = responseData;

      console.log(responseData);
    });
  }

 

  //get subModuleByModuleId
  public getSubModuleByModuleId(event: any) {
   const moduleId=event.target.value
    this.dashboardService.getSubModuleByModuleId(moduleId).subscribe({
      next: (response) => {
        this.subModuleList = response.body;
        console.log(this.subModuleList);
        
      },
      error: (error) => {
        console.log(error);
        this.subModuleList = null;
      }
    });
  }

  //for Scheduleforlist

  getSchList(event: any) {
    
    const submoduleId = parseInt(
      (event.target as HTMLSelectElement).value,
      10
    );
    this.sessionService
      .getSchListById(submoduleId)
      .subscribe((data: any) => {
        console.log(data);
        
        this.schedulelist = data;
      });

  }
//for Session List
  getSessionList(event: any){
    const scheduleForId = parseInt(
      (event.target as HTMLSelectElement).value,
      10
    );
    this.dashboardService
      .getSessionByscheduleForId(scheduleForId)
      .subscribe((data: any) => {
        console.log(data.body);
        
        this.sessionList = data.body;
      });

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

  onRadioChange() {
    const radioValue = this.assessmentData.get('radio').value;

    if (radioValue === 'schedule') {
      this.assessmentData.get('sessionId').clearValidators(); // Clear validation for session field
      this.assessmentData.get('sessionId').setValue(''); // Reset session field value
    } else {
      this.assessmentData.get('sessionId').setValidators(Validators.required); // Add validation for session field
    }

    this.assessmentData.get('sessionId').updateValueAndValidity(); // Update validation status for session field
  }

}
