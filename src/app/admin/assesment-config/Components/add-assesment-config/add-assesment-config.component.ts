import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModuleserviceService } from 'src/app/admin/module/Services/moduleservice.service';
import { DashboardService } from 'src/app/user/Services/dashboard.service';
import Swal from 'sweetalert2';
import { AssesmentConfigService } from '../../Services/assesment-config.service';

@Component({
  selector: 'app-add-assesment-config',
  templateUrl: './add-assesment-config.component.html',
  styleUrls: ['./add-assesment-config.component.css']
})
export class AddAssesmentConfigComponent {
  configForm: FormGroup;
  modules: any[] = [];
  submodules: any[] = [];
  schedules: any[] = [];
  sessions: any[] = [];
  scheduleDropdown: any[] = [];
  scheduleWiseList: any = [];
  sessionWiseList: any = [];

  constructor(private fb: FormBuilder,
    private moduleService: ModuleserviceService,
    private dashboardService: DashboardService,
    private assessmentConfigService: AssesmentConfigService) {
    this.configForm = this.fb.group({
      module: ['', Validators.required],
      subModule: ['', Validators.required],
      radio: ['', Validators.required],
      schedule: [''],
      session: [''],
      sessionWiseList: [''],
      scheduleWiseList: ['']
    });
  }

  ngOnInit() {
    this.getModuleList();
  }
  getModuleList() {
    this.moduleService.getModuleDetails().subscribe((data: any) => {
      this.modules = data;
    })
  }

  onModuleChange(event: any) {
    const moduleId = event.target.value;
    this.dashboardService.getSubModuleByModuleId(moduleId).subscribe((data: any) => {
      this.submodules = data.body;
    })

  }

  onSubModuleChange(event: any) {
    const subModuleId = event.target.value;
    this.dashboardService.getScheduleBySubModuleId(subModuleId).subscribe((data: any) => {
      this.schedules = data.body;

    })

  }

  onScheduleChange(event: any) {
    const scheduleId = event.target.value;
    this.dashboardService.getSessionByscheduleForId(scheduleId).subscribe((data: any) => {
      this.sessions = data.body;

    })

  }

  onRadioChange() {
    if (this.configForm.get('radio')!.value === 'session') {
      this.configForm.value.scheduleWiseList = '';
      this.scheduleWiseList = [];
      // Fetch and display schedule dropdown list for the selected submodule
      const selectedSubmoduleId = this.configForm.get('submodule')!.value;
      if (selectedSubmoduleId) {
        this.scheduleDropdown = this.schedules.filter(schedule => schedule.submoduleId === selectedSubmoduleId);
      }
    } else {
      this.configForm.value.sessionWiseList = '';
      this.sessionWiseList = [];
      // Reset schedule dropdown list when radio changes
      this.scheduleDropdown = [];
      // Reset schedule and session values
      this.configForm.patchValue({
        schedule: '',
        session: ''
      });
    }
  }

  setScheduleList(event: any, scheduleForId: any) {
    const noOfQuestions: string = event.target.value;
    if (noOfQuestions.length > 0) {
      this.scheduleWiseList.push({
        "noOfQuestions": noOfQuestions,
        "scheduleforId": scheduleForId
      });
      this.configForm.value.scheduleWiseList = this.scheduleWiseList;
    }
    // else {
    //   Swal.fire("Error", "Number of questions can not be  empty!", 'error');
    // }
  }

  setSessionList(event: any, sessionId: any) {
    const noOfQuestions = event.target.value;
    if (noOfQuestions.length > 0) {
      this.sessionWiseList.push({
        "noOfQuestions": noOfQuestions,
        "sessionId": sessionId
      });
      this.configForm.value.sessionWiseList = this.sessionWiseList;
    }
  }

  onSubmit() {
    console.log(this.configForm.value);
    Swal.fire({
      title: 'Save Data',
      text: 'Are you sure you want to save this data?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.assessmentConfigService.saveAssesmentSetting(this.configForm.value).subscribe(
          (data: any) => {
            // if (this.id != 0) {
            //   Swal.fire(
            //     'Data Updated!',
            //     'Your data has been updated successfully.',
            //     'success'
            //   );
            //   this.router.navigate(['/admin/session/viewSession']);
            // } else {
            Swal.fire(
              'Data Saved!',
              'Your data has been saved successfully.',
              'success'
            );
          },
          (error: any) => {
            Swal.fire(
              'Error!',
              'There is some internal server error',
              'warning'
            );
          }
        );
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your data was not saved.', 'info');
      }
    });
  }
}
