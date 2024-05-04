import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Route, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AssessmentService } from '../../Services/assessment.service';
import { SubModuleService } from 'src/app/admin/sub-module/Services/sub-module.service';
import { ScheduleService } from 'src/app/admin/schedule/Services/schedule.service';
import { DashboardService } from 'src/app/user/Services/dashboard.service';
import { SessionMasterService } from 'src/app/admin/session/Services/session-master.service';
import { formatCurrency } from '@angular/common';

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
  sessionList: any;
  selectedType: string = 'schedule'; // Default to 'Schedule for'

  // for upload excel

  uploadForm: any;

  selectedFile: File | null = null; // Variable to store the selected file

  showUploadValidationMessage: boolean = false; // Flag to show/hide upload validation message

  uploadValidationMessage: string = ''; // Validation message




  constructor(private formBuilder: FormBuilder, private service: AssessmentService, private router: Router,
    private subModuleService: SubModuleService,
    private actRout: ActivatedRoute,
    private dashboardService: DashboardService, private sessionService: SessionMasterService) {

    this.assessmentData = this.formBuilder.group({
      assessmentId: [''],
      scheduleForId: ['', [Validators.required]],
      sessionId: [''],
      question: ['', [Validators.required]],
      option1: ['', [Validators.required]],
      option2: ['', [Validators.required]],
      option3: ['', [Validators.required]],
      option4: ['', [Validators.required]],
      answer: ['', [Validators.required]],
      moduleId: ['', [Validators.required]],
      submoduleId: ['', [Validators.required]],
      radio: ['schedule', [Validators.required]],
      bulkUploadMode: [false]
    });

    this.assessmentData.get('bulkUploadMode')!.valueChanges.subscribe((value: any) => {
      if (value) {
        console.log(1); // Log 1 if checked
        document.getElementById("bulkQsnMode")!.style.display = "block";
        document.getElementById("oneQsnMode")!.style.display = "none";
      } else {
        console.log(0); // Log 0 if unchecked
        document.getElementById("bulkQsnMode")!.style.display = "none";
        document.getElementById("oneQsnMode")!.style.display = "block";
      }
    });
    
    this.assessmentData.get('moduleId').valueChanges.subscribe((moduleId: any) => {
      this.assessmentData.get('submoduleId').setValue('');
      this.assessmentData.get('scheduleForId').setValue('');
      this.assessmentData.get('sessionId').setValue('');
      this.assessmentData.get('submoduleId').enable();
    });

    this.assessmentData.get('submoduleId').valueChanges.subscribe((submoduleId: any) => {
      this.assessmentData.get('scheduleForId').setValue('');
      this.assessmentData.get('sessionId').setValue('');
      this.assessmentData.get('scheduleForId').enable();
    });

    this.assessmentData.get('scheduleForId').valueChanges.subscribe((scheduleForId: any) => {
      this.assessmentData.get('sessionId').setValue('');
      this.assessmentData.get('sessionId').enable();
    });
  






  }



  ngOnInit() {
    this.actRout.params.subscribe((params) => {
      this.assessmentId = params['id'];
      console.log(this.assessmentId);

      // Determine which edit method to call based on the type of assessment

      this.actRout.queryParams.subscribe(params => {
        this.selectedType = params['selectType'];
        if (this.assessmentId > 0) {
          if (this.selectedType === 'schedule') {
            this.editAssessment(this.assessmentId);
          } else if (this.selectedType === 'session') {
            this.editAssessmentSession(this.assessmentId);
          }
        }
        else {
          this.assessmentId = 0;
        }

      });

    });
    this.getModuleList();
    setTimeout(() => {
      const bulkQsnModeElement = document.getElementById("bulkQsnMode");
      if (bulkQsnModeElement) {
        console.log('inside display none');
        bulkQsnModeElement.style.display = "none";
      } else {
        console.log(bulkQsnModeElement);
      }
    });

  }



  editAssessment(assessmentId: any) {
    this.service.editAssessment(assessmentId).subscribe(response => {
      console.log(response);
      this.assessmentData.patchValue({
        assessmentId: response.ASSESSMENTMASTERID,
        moduleId: response.MODULEID,
        //submoduleId: response.SUBMODULEID,
        //scheduleForId: response.SCHEDULEFORID,
        question: response.QUESTION,
        option1: response.OPTION1,
        option2: response.OPTION2,
        option3: response.OPTION3,
        option4: response.OPTION4,
        answer: response.ANSWER
      });

      setTimeout(() => {
        const moduleId = document.querySelectorAll('#moduleId');
        for (let i = 0; i < moduleId.length; i++) {
          moduleId[i].dispatchEvent(new Event('change'));
        }
        this.assessmentData.patchValue({
          submoduleId: response.SUBMODULEID
        });
      }, 1010);

      setTimeout(() => {
        const submoduleId = document.querySelectorAll('#submoduleId');
        for (let i = 0; i < submoduleId.length; i++) {
          submoduleId[i].dispatchEvent(new Event('change'));
        }
        this.assessmentData.patchValue({
          scheduleForId: response.SCHEDULEFORID
        });
      }, 2010);
    });
  }

  editAssessmentSession(assessmentId: any) {
    const isSessionEdit = true
    if (isSessionEdit) {
      this.assessmentData.get('radio').setValue('session');
    }
    this.service.editAssessmentSession(assessmentId).subscribe(response => {
      console.log(response);
      this.assessmentData.patchValue({
        assessmentId: response.SESSIONASSESSMENTMASTERID, // Use SESSIONASSESSMENTMASTERID as primary key for sessions
        moduleId: response.MODULEID,
        //submoduleId: response.SUBMODULEID,
        //scheduleForId: response.SCHEDULEFORID,
        //sessionId: response.SESSIONID, // Remove this line to ensure session radio button is selected by default
        question: response.QUESTION,
        option1: response.OPTION1,
        option2: response.OPTION2,
        option3: response.OPTION3,
        option4: response.OPTION4,
        answer: response.ANSWER
      });

      setTimeout(() => {
        const moduleId = document.querySelectorAll('#moduleId');
        for (let i = 0; i < moduleId.length; i++) {
          moduleId[i].dispatchEvent(new Event('change'));
        }
        this.assessmentData.patchValue({
          submoduleId: response.SUBMODULEID
        });
      }, 1010);

      setTimeout(() => {
        const submoduleId = document.querySelectorAll('#submoduleId');
        for (let i = 0; i < submoduleId.length; i++) {
          submoduleId[i].dispatchEvent(new Event('change'));
        }
        this.assessmentData.patchValue({
          scheduleForId: response.SCHEDULEFORID
        });
      }, 2010);


      setTimeout(() => {
        const scheduleForId = document.querySelectorAll('#scheduleForId');
        for (let i = 0; i < scheduleForId.length; i++) {
          scheduleForId[i].dispatchEvent(new Event('change'));
        }
        this.assessmentData.patchValue({
          sessionId: response.SESSIONID
        });
      }, 2110);

      setTimeout(() => {
        const sessionId = document.querySelectorAll('#sessionId');
        for (let i = 0; i < sessionId.length; i++) {
          sessionId[i].dispatchEvent(new Event('change'));
        }
      }, 2210);

    });
  }



  //for ModuleList
  getModuleList() {
    this.subModuleService.getModuleList().subscribe((responseData: any) => {
      this.ModuleList = responseData;

      console.log(responseData);
    });
  }



  //get subModuleByModuleId
  public getSubModuleByModuleId(event: any) {
    const moduleId = event.target.value;
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
  getSessionList(event: any) {
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


  public saveForm(): void {
    if (this.assessmentData.valid) {
      Swal.fire({
        title: this.assessmentData.get('assessmentId').value === '' ? 'Do you want to save?' : 'Do you want to Update?',
        text: '',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          // Check if it's a session or schedule
          const isSession = this.assessmentData.get('radio').value === 'session';

          if (isSession) {
            this.saveAssessmentSession();
          } else {
            this.saveAssessment();
          }
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

  private saveAssessment(): void {
    this.service.saveAssessment(this.assessmentData.value).subscribe({
      next: (response) => {
        const message = this.assessmentData.get('assessmentId').value === '' ? 'Assessment Schedule Saved Successfully' : 'Updated Successfully';

        Swal.fire({
          icon: 'success',
          title: message,
        }).then(() => {
          this.assessmentData.reset(); // Reset the form to clear all fields
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

  private saveAssessmentSession(): void {
    this.service.saveAssessmentSession(this.assessmentData.value).subscribe({
      next: (response) => {
        const message = this.assessmentData.get('assessmentId').value === '' ? 'Session Assessment Saved Successfully' : 'Updated Successfully';

        Swal.fire({
          icon: 'success',
          title: message,
        }).then(() => {
          this.assessmentData.reset(); // Reset the form to clear all fields
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



  //iInserting record through  uploading xl file

  onFileSelected(event: any) {
    this.selectedFile = event.target.files[0]; // Store the selected file

    console.log('Selected file:', this.selectedFile);

    // Check if the selected file is not an Excel file

    if (!this.selectedFile?.name.endsWith('.xlsx')) {
      this.showUploadValidationMessage = true; // Show validation message

      this.uploadValidationMessage =
        'Please select an only Excel file (.xlsx) only.';

      const fileInput: HTMLInputElement | null = document.querySelector('#fileInput');

      console.log(fileInput);




      if (fileInput) {
        // Reset the file input by setting its value to an empty string
        fileInput.value = '';
      }
    } else {
      this.showUploadValidationMessage = false; // Hide validation message
    }
  }

  downloadExcel() {

    this.service.downloadScheduleSessionExcel().subscribe((data: any) => {
      const blob = new Blob([data], {
        type:
          'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
      });

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement('a');

      link.href = url;

      link.download = 'QuestionList.xlsx';

      link.click();

      window.URL.revokeObjectURL(url);
    });
  }



  // normal field validation message

  validateAndImport() {
    const moduleId = this.assessmentData.value.moduleId;
    const subModuleId = this.assessmentData.value.submoduleId;
    const scheduleId = this.assessmentData.value.scheduleForId;
    const radio = this.assessmentData.value.radio;
    const sessionId = this.assessmentData.value.sessionId;
    console.log(`${moduleId},${subModuleId},${scheduleId},${sessionId}`);

    if (moduleId == '') {
      this.showUploadValidationMessage = true; // Show validation message

      this.uploadValidationMessage = 'Please select module before import file';

      return;
    }
    if (subModuleId == '') {
      this.showUploadValidationMessage = true; // Show validation message

      this.uploadValidationMessage = 'Please select sub module before import file';

      return;
    }
    if (scheduleId == '') {
      this.showUploadValidationMessage = true; // Show validation message

      this.uploadValidationMessage = 'Please select schedule before import file';

      return;
    }
    if (radio == '') {
      this.showUploadValidationMessage = true; // Show validation message

      this.uploadValidationMessage = 'Please select one option before import file';

      return;
    }
    if (this.assessmentData.value.radio == 'session' && sessionId == '') {
      this.showUploadValidationMessage = true; // Show validation message

      this.uploadValidationMessage = 'Please select session before import file';

      return;
    }

    // Check if a file is selected

    if (!this.selectedFile) {
      this.showUploadValidationMessage = true; // Show validation message

      this.uploadValidationMessage = 'Please select a file to import.';

      return;
    }

    // Check if the selected file is an Excel file

    if (!this.selectedFile.name.endsWith('.xlsx')) {

      this.showUploadValidationMessage = true; // Show validation message

      this.uploadValidationMessage = 'Please select an only Excel file (.xlsx) only.';

      return;

    }

    // Proceed with import

    this.importData(moduleId, subModuleId, scheduleId, sessionId);
  }

  importData(moduleId: any, subModuleId: any, scheduleId: any, sessionId: any) {

    if (this.selectedFile) {
      const formData = new FormData();
      formData.append('moduleId', moduleId);
      formData.append('subModuleId', subModuleId);
      formData.append('scheduleId', scheduleId);
      if (this.assessmentData.get('radio').value === 'session' && sessionId != null) {
        formData.append('sessionId', sessionId);
      }
      formData.append('file', this.selectedFile);
      formData.forEach((item: any) => {
        console.log(`${item}`);
      });


      this.service.importScheduleSessionExcel(formData).subscribe(
        (data: any) => {
          console.log('Importing file:', this.selectedFile);
          Swal.fire('Data Saved Succesfully', 'Session data saved Successfully', 'success');
        },

        (error: any) => {
          console.error('Error importing file:', error);
          Swal.fire('Error', 'Invalid Data format found. Please Check Your Excel and try again', 'error');
        }
      );



      // Clear the selected file reference

      this.selectedFile = null;
    } else {
      // Handle case when no file is selected

      console.log('No file selected.');
    }

    const fileInput: HTMLInputElement | null = document.querySelector('#fileInput');

    console.log(fileInput);




    if (fileInput) {
      // Reset the file input by setting its value to an empty string
      fileInput.value = '';
    }
  }


  isChecked: boolean = false;

  onToggleChange(event: any): void {
    this.isChecked = event.target.checked;
    if (this.isChecked) {
      console.log(1); // Log 1 if checked
    } else {
      console.log(0); // Log 0 if unchecked
    }
  }








}
