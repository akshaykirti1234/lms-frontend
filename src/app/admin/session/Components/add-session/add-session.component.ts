import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Subscription } from 'rxjs';
import { SessionMasterService } from '../../Services/session-master.service';

@Component({
  selector: 'app-add-session',
  templateUrl: './add-session.component.html',
  styleUrls: ['./add-session.component.css'],
})
export class AddSessionComponent {
  sessionForm!: FormGroup;
  projectList: any;
  subModuleList: any;
  scheduleForList: any;
  designationtList: any;
  id: any;
  viewFileUrl: string = 'http://localhost:8085/viewFile';
  showSelectScheduleFor!: boolean;
  isConditionSatisfied: any;

  subModuleIdSubscription: Subscription | undefined;
  constructor(
    private formBuilder: FormBuilder,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private sessionService: SessionMasterService
  ) {
    this.sessionForm = this.formBuilder.group({
      sessionName: ['', Validators.required],
      subModuleId: ['', Validators.required],
      scheduleForId: ['', Validators.required],
      video: ['',Validators.required],
      document: ['',Validators.required],
      description: ['', Validators.required],
      isLastSession: [false],
      createdOn: [''],
    });
    if (this.id == 0) {
      this.showSelectScheduleFor = false;
    } else {
      this.showSelectScheduleFor = true;
    }
    this.subModuleIdSubscription = this.sessionForm
      .get('subModuleId')
      ?.valueChanges.subscribe(() => {
        const secondDropdownControl = this.sessionForm.get('scheduleForId');
        if (this.showSelectScheduleFor) {
          secondDropdownControl?.setValue('');
          
        } else {
          this.showSelectScheduleFor = true;
        }
      });

      this.setScheduleDropDown();
  }

  private setScheduleDropDown() {
    this.sessionForm.get('subModuleId')!.valueChanges.subscribe((subModuleId: any) => {
      if (subModuleId === '' || subModuleId === null) {
        this.sessionForm.get('scheduleForId')!.setValue('');
        this.sessionForm.get('scheduleForId')!.disable();
      } else {
        this.sessionForm.get('scheduleForId')!.enable();
      }
    });
  }

  ngOnInit() {
    this.getAllSubModule();

    this.id = this.activatedRoute.snapshot.paramMap.get('id');

    if (this.id > 0) {
      this.getSessionById(this.id);
    } else {
      this.id = 0;
    }
  }
  getAllSubModule() {
    this.sessionService.getAllSubModule().subscribe((data: any) => {
      this.subModuleList = data;
    });
  }
  getSchList(event: any) {

    const selectedsubModuleId = parseInt(
      (event.target as HTMLSelectElement).value,
      10
    );
    this.sessionService
      .getSchListById(selectedsubModuleId)
      .subscribe((data: any) => {
        this.scheduleForList = data;
      });
  }

  checkIsLastSession(event: any) {
    if (this.id == 0) {
      const selectedscheduleForId = parseInt(
        (event.target as HTMLSelectElement).value,
        10
      );
      this.sessionService.checkIsLastSession(selectedscheduleForId).subscribe(
        (data: any) => {
          console.log(data);
          if (data.isLastSession) {
            Swal.fire({
              icon: 'error',
              title: 'No. of Session  Reached!',
              text: `You have reached the maximum number of sessions for this Schedule`,
            });
            this.sessionForm.reset();

            this.sessionForm.get('subModuleId')?.setValue('');
            this.sessionForm.get('scheduleForId')?.setValue('');
            this.isConditionSatisfied = false;
          } else {
            if (data.checkBoxValidation) {
              this.isConditionSatisfied = true;
              this.sessionForm.get('isLastSession')!.setValue(true);
            } else {
              this.isConditionSatisfied = false;
              this.sessionForm.get('isLastSession')!.setValue(false);
            }
          }
        },
        (error) => {
          alert(error.message);
          this.sessionForm.get('isLastSession')!.setValue(false);
          this.isConditionSatisfied = false;
        }
      );
    }
  }

  getSessionById(id: any) {
    this.sessionService.getSessionById(id).subscribe((data: any) => {
      console.log(data);
      this.sessionForm.patchValue({
        sessionName: data.sessionName,
        isLastSession: data.isLastSession,
        video: data.video,
        document: data.document,
        description: data.description,
        subModuleId: data.subModuleId,
        // scheduleForId: data.scheduleForId,
      });
      if (data.isLastSession == true) {
        this.isConditionSatisfied = true;
      }
      setTimeout(() => {
        const subModuleId = document.querySelectorAll('#subModuleId');
        for (let i = 0; i < subModuleId.length; i++) {
          subModuleId[i].dispatchEvent(new Event('change'));
        }
        this.sessionForm.patchValue({
          scheduleForId: data.scheduleForId,
        });
      }, 1010);
      setTimeout(() => {
        const scheduleForId = document.querySelectorAll('#scheduleForId');
        for (let i = 0; i < scheduleForId.length; i++) {
          scheduleForId[i].dispatchEvent(new Event('change'));
        }
      }, 2010);
    });

  }

  validateAndUploadFile(event: any) {
    if (this.validateFile(event)) {
      this.uploadFile(event);
    }
  }

  validateAndUploadDoc(event: any) {
    if (this.validateDoc(event)) {
      this.uploadFile(event);
    }
  }

  validateDoc(event: any): boolean {
    let file = event.target.files[0];
    const allowedFormats = ['pdf'];
    const fileExt = file.name.split('.').pop().toLowerCase();

    if (!allowedFormats.includes(fileExt)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid Document format',
        text: 'Only PDF format is allowed.',
      });
      const docInput: HTMLInputElement | null =
        document.querySelector('#document');

      if (docInput) {
        docInput.value = '';
      }
      return false;
    }

    return true;
  }

  validateFile(event: any): boolean {
    let file = event.target.files[0];
    const allowedFormats = ['mp4', 'avi', 'mov', 'mkv'];
    const fileExt = file.name.split('.').pop().toLowerCase();

    if (!allowedFormats.includes(fileExt)) {
      Swal.fire({
        icon: 'error',
        title: 'Invalid file format',
        text: 'Only MP4, AVI, and MOV formats are allowed.',
      });
      const videoInput: HTMLInputElement | null =
        document.querySelector('#video');

      if (videoInput) {
        videoInput.value = '';
      }

      return false;
    }

    return true;
  }

  uploadFile(event: any) {
    if (event.target != null) {
      let file = event.target.files[0];
      let fileId = event.target.id;
      let sessionName = this.sessionForm.value.sessionName;
      const fileData = new FormData();
      fileData.append('file', file);
      fileData.append('name', sessionName != null ? sessionName : 'video');
      this.sessionService.setTempFile(fileData).subscribe(
        (data: any) => {
          if (this.sessionForm.controls[fileId]) {
            this.sessionForm.controls[fileId].setValue(data.fileName);
          } else {
            console.error(`Control with id '${fileId}' not found in form.`);
          }
        },
        (error: any) => {
          alert('Something went wrong');
          console.log(error);
        }
      );
    }
  }

  onSubmit() {
    let errorFlag = 0;

    const subModuleId = this.sessionForm.get('subModuleId');
    const scheduleForId = this.sessionForm.get('scheduleForId');
    const sessionName = this.sessionForm.get('sessionName');
    const video = this.sessionForm.get('video');
    const documentId = this.sessionForm.get('document');
    const description = this.sessionForm.get('description');
    if (subModuleId?.invalid && errorFlag === 0) {
      errorFlag = 1;
      console.log('error happened');
      subModuleId.markAsTouched();
    }
    if (scheduleForId?.invalid && errorFlag === 0) {
      errorFlag = 1;
      console.log('error happened');
      scheduleForId.markAsTouched();
    }
    if (sessionName?.invalid && errorFlag === 0) {
      errorFlag = 1;
      console.log('error happened');
      sessionName.markAsTouched();
    }
    if (video?.invalid && documentId?.invalid && errorFlag === 0) {
      errorFlag = 1;
      Swal.fire('You have to upload either Video or Document.');
      video.markAsTouched();
      documentId.markAsTouched();
    }
    // if (documentId?.invalid && errorFlag === 0) {
    //   errorFlag = 1;
    //   console.log('error happened');
    //   documentId.markAsTouched();
    // }
    if (description?.invalid && errorFlag === 0) {
      errorFlag = 1;
      console.log('error happened');
      description.markAsTouched();
    }



    if (errorFlag === 0) {
      this.sessionForm.value.sessionid = this.id;
      Swal.fire({
        title: 'Save Data',

        text: 'Are you sure you want to save this data?',

        icon: 'question',

        showCancelButton: true,

        confirmButtonText: 'Yes, save it',

        cancelButtonText: 'No, cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          this.sessionService.saveSession(this.sessionForm.value).subscribe(
            (data: any) => {
              if (this.id != 0) {
                Swal.fire(
                  'Data Updated!',
                  'Your data has been updated successfully.',
                  'success'
                );
                this.router.navigate(['/admin/session/viewSession']);
              } else {
                Swal.fire(
                  'Data Saved!',
                  'Your data has been saved successfully.',
                  'success'
                );
                // Reset form controls to blank values
                this.sessionForm.reset();

                // Clear file input field
                this.isConditionSatisfied = false;
                const videoInput: HTMLInputElement | null =
                  document.querySelector('#video');

                if (videoInput) {
                  videoInput.value = '';
                }
                const docInput: HTMLInputElement | null =
                  document.querySelector('#document');

                if (docInput) {
                  docInput.value = '';
                }
              }
            },

            (error: any) => {
              Swal.fire(
                'Error!',

                'There is some internal server error',

                'warning'
              );
            }
          );

          //this.router.navigate(['/emp-list']);
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire('Cancelled', 'Your data was not saved.', 'info');
        }
      });
    }
  }

  cancel() {
    Swal.fire({
      title: 'Cancel Updating',

      text: 'Are you sure you want to cancel this operation?',

      icon: 'question',

      showCancelButton: true,

      confirmButtonText: 'Yes, Cancel',

      cancelButtonText: 'No',
    }).then((result) => {
      if (result.isConfirmed) {
        this.router.navigate(['/admin/session/viewSession']);
      }
    });
  }


  resetForm(){
    this.setScheduleDropDown();
    this.isConditionSatisfied = false;
  }
}
