import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ModuleserviceService } from 'src/app/admin/module/Services/moduleservice.service';
import { DashboardService } from 'src/app/user/Services/dashboard.service';
import Swal from 'sweetalert2';
import { AssesmentConfigService } from '../../Services/assesment-config.service';
import { Router } from '@angular/router';

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
  isScheduleDropdownSelected : boolean = false;

  constructor(private fb: FormBuilder,
    private moduleService: ModuleserviceService,
    private dashboardService: DashboardService,
    private assessmentConfigService: AssesmentConfigService,
  private router : Router) {
    this.configForm = this.fb.group({
      module: ['', Validators.required],
      subModule: ['', Validators.required],
      radio: ['', Validators.required],
      schedule: [''],
      session: [''],
      sessionWiseList: [''],
      scheduleWiseList: ['']
    });
    this.configForm.get('radio')?.valueChanges.subscribe(value => {
      if (value === 'schedule') {
        this.configForm.get('schedule')?.clearValidators();
        this.configForm.get('schedule')?.updateValueAndValidity();
      } else if (value === 'session') {
        this.configForm.get('schedule')?.setValidators(Validators.required);
        this.configForm.get('schedule')?.updateValueAndValidity();
      }
    });

    this.configForm.get('module')!.valueChanges.subscribe((moduleId: any) => {
      if (moduleId === '') {
        this.configForm.get('subModule')!.setValue('');
        this.configForm.get('schedule')!.setValue('');
        this.configForm.get('session')!.setValue('');
        this.configForm.get('subModule')!.disable();
        this.configForm.get('schedule')!.disable();
        this.configForm.get('session')!.disable();
      } else {
        this.configForm.get('subModule')!.enable();
        this.configForm.get('schedule')!.disable();
      }
    });

    this.configForm.get('subModule')!.valueChanges.subscribe((submoduleId: any) => {
      if (submoduleId === '') {
        this.configForm.get('schedule')!.setValue('');
        this.configForm.get('session')!.setValue('');
        this.configForm.get('schedule')!.disable();
        this.configForm.get('session')!.disable();
      } else {
        this.configForm.get('schedule')!.enable();
        this.configForm.get('session')!.disable();
      }
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
    if (this.configForm.get('radio')!.value === 'schedule') {
      this.assessmentConfigService.getScheduleForSchConfig(subModuleId).subscribe((data : any)=>{
        console.log(data.length);
        this.schedules = data;
      },(error : any)=> {
        console.log(error);
        
      })
  }
  else if(this.configForm.get('radio')!.value === 'session'){

    this.dashboardService.getScheduleBySubModuleId(subModuleId).subscribe((data: any) => {
      this.schedules = data.body;
    },(error : any)=> {
      console.log(error);
      this.schedules = [];
      
    })
    
  }

  

  }

  onScheduleChange(event: any) {
    const scheduleId = event.target.value;
    this.isScheduleDropdownSelected = true;
    this.assessmentConfigService.getSessionForSessionConfig(scheduleId).subscribe((data : any)=>{
      this.sessions = data;
    });
    // this.dashboardService.getSessionByscheduleForId(scheduleId).subscribe((data: any) => {
    //   this.sessions = data.body;
    // })

  }

  onRadioChange() {
    if (this.configForm.get('radio')!.value === 'session') {
      this.configForm.value.scheduleWiseList = '';
      this.scheduleWiseList = [];
      // Fetch and display schedule dropdown list for the selected submodule
      const selectedSubmoduleId = this.configForm.get('subModule')!.value;
      if (selectedSubmoduleId) {
        this.dashboardService.getScheduleBySubModuleId(selectedSubmoduleId).subscribe((data: any) => {
          this.schedules = data.body;
        })
        //this.scheduleDropdown = this.schedules.filter(schedule => schedule.submoduleId === selectedSubmoduleId);
      }
    } else {
      this.configForm.value.sessionWiseList = '';
      const selectedSubmoduleId = this.configForm.get('subModule')!.value;
      
        this.assessmentConfigService.getScheduleForSchConfig(selectedSubmoduleId).subscribe((data : any)=>{
          console.log(data.length);
          this.schedules = data;
        },(error : any)=> {
          console.log(error);
          
        })
      
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
    if(Number.parseInt(noOfQuestions) <= 0){
      Swal.fire('You can not enter negative number or zero');
      event.target.value = '';
    }else{
    if (noOfQuestions.length > 0) {

      const existingIndex = this.scheduleWiseList.findIndex((item :any) => item.scheduleForId === scheduleForId);
      if (existingIndex !== -1) {
        this.scheduleWiseList[existingIndex].numberOfQuestions = noOfQuestions;
      } else {
        this.scheduleWiseList.push({
          "scheduleForId": scheduleForId,
          "numberOfQuestions": noOfQuestions,
          "passingPercentage": ''
        });
      }
      this.configForm.value.scheduleWiseList = this.scheduleWiseList;
    }
  }
  }

  setSessionList(event: any, sessionId: any) {
    const noOfQuestions = event.target.value;
    if(Number.parseInt(noOfQuestions) <= 0){
      Swal.fire('You can not enter negative number or zero');
      event.target.value = '';
    }else{
    if (noOfQuestions.length > 0) { 
      const existingIndex = this.sessionWiseList.findIndex((item :any) => item.sessionId === sessionId);
      if (existingIndex !== -1) {
        this.sessionWiseList[existingIndex].numberOfQuestions = noOfQuestions;
      } else {
        this.sessionWiseList.push({
          "sessionId": sessionId,
          "numberOfQuestions": noOfQuestions,
          "passingPercentage": ''
        });
      }
      this.configForm.value.sessionWiseList = this.sessionWiseList;
    }
  }
  }

  setPassPercentScheduleList(event: any, scheduleForId: any) {
    const passingPercentage: string = event.target.value;
    if (Number.parseInt(passingPercentage) < 0 || Number.parseInt(passingPercentage) > 100) {
      Swal.fire('Please enter a valid pass percentage between 0 and 100');
      event.target.value = '';
      return;
    }
  
    if (passingPercentage.length > 0) {
      const existingIndex = this.scheduleWiseList.findIndex((item :any) => item.scheduleForId === scheduleForId);
      if (existingIndex !== -1) {
        this.scheduleWiseList[existingIndex].passingPercentage = passingPercentage;
      } else {
        this.scheduleWiseList.push({
          "scheduleForId": scheduleForId,
          "numberOfQuestions": '',
          "passingPercentage": passingPercentage
        });
      }
      this.configForm.value.scheduleWiseList = this.scheduleWiseList;
    }
  }
  
  setPassPercentSessionList(event: any, sessionId: any) {
    const passingPercentage: string = event.target.value;
    if (Number.parseInt(passingPercentage) < 0 || Number.parseInt(passingPercentage) > 100) {
      Swal.fire('Please enter a valid pass percentage between 0 and 100');
      event.target.value = '';
      return;
    }
  
    if (passingPercentage.length > 0) {
      const existingIndex = this.sessionWiseList.findIndex((item :any) => item.sessionId === sessionId);
      if (existingIndex !== -1) {
        this.sessionWiseList[existingIndex].passingPercentage = passingPercentage;
      } else {
        this.sessionWiseList.push({
          "sessionId": sessionId,
          "numberOfQuestions": '',
          "passingPercentage": passingPercentage
        });
      }
      this.configForm.value.sessionWiseList = this.sessionWiseList;
    }
  }
  
  
  
  

  onSubmit() {
    let errorFlag = 0;
    const module = this.configForm.get('module');
    const subModule = this.configForm.get('subModule');
    const radio = this.configForm.get('radio');
    const schedule = this.configForm.get('schedule');
    if (module?.invalid && errorFlag === 0) {
      errorFlag = 1;
      console.log('error happened');
      module.markAsTouched();
    }
    if (subModule?.invalid && errorFlag === 0) {
      errorFlag = 1;
      console.log('error happened');
      subModule.markAsTouched();
    }
    if (radio?.invalid && errorFlag === 0) {
      errorFlag = 1;
      console.log('error happened');
      radio.markAsTouched();
    }
    if (schedule?.invalid && errorFlag === 0) {
      errorFlag = 1;
      console.log('error happened');
      schedule.markAsTouched();
    }

    if(this.configForm.value.radio == 'schedule' && this.scheduleWiseList == "" ){
      errorFlag = 1;
      Swal.fire('Please enter at least one no. of question for scheduling', '', 'warning')
    }

    if(this.configForm.value.radio == 'session' && this.sessionWiseList == "" ){
      errorFlag = 1;
      Swal.fire('Please enter at least one no. of question for scheduling', '', 'warning')
    }

    if (errorFlag === 0) {
    Swal.fire({
      title: 'Save Data',
      text: 'Are you sure you want to save this data?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonText: 'Yes, save it',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        if(this.configForm.value.radio == 'schedule'){
        this.assessmentConfigService.saveAssesmentSetting(this.configForm.value).subscribe(
          (data: any) => {
            Swal.fire(
              'Data Saved!',
              'Your data has been saved successfully.',
              'success'
            );
          this.router.navigateByUrl('/admin/assessment-config/view');
          },
          (error: any) => {
            Swal.fire(
              'Error!',
              'There is some internal server error',
              'warning'
            );
            console.log(error);
            
          }
        );
      }else{
        this.assessmentConfigService.saveAssessmentSessionSetting(this.configForm.value).subscribe(
          (data: any) => {
            Swal.fire(
              'Data Saved!',
              'Your data has been saved successfully.',
              'success'
            );
          this.router.navigateByUrl('/admin/assessment-config/view');
          },
          (error: any) => {
            Swal.fire(
              'Error!',
              'There is some internal server error',
              'warning'
            );
            console.log(error);
            
          }
        );
      }
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        Swal.fire('Cancelled', 'Your data was not saved.', 'info');
      }
    });
  }
}
}
