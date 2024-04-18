import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ScheduleService } from '../../Services/schedule.service';
import { ActivatedRoute, Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-add-schedule',
  templateUrl: './add-schedule.component.html',
  styleUrls: ['./add-schedule.component.css']
})
export class AddScheduleComponent implements OnInit {

  // Define a property to hold the form data
  public scheduleForm: any;

  // Define properties to hold the list of submodules, authors, and technologies
  public subModuleList: any;
  public authorList: any;
  public technologyList: any;

  // Inject necessary services and dependencies
  constructor(private fb: FormBuilder, private scheduleService: ScheduleService, private activatedRoute: ActivatedRoute, private router: Router) { }

  // Initialize the component and fetch necessary data
  ngOnInit(): void {
    this.initScheduleForm();
    this.getAllAutohors();
    this.getAllSubModules();
    this.getAllTechnologies();
    this.editSheduleFor();
  }

  // Initialize the form using the form builder
  public initScheduleForm() {
    this.scheduleForm = this.fb.group({
      scheduleForId: this.fb.control(''),
      scheduleForName: this.fb.control('', [Validators.required]),
      subModule: this.fb.group({
        submoduleId: this.fb.control('', [Validators.required]),
        submoduleName: this.fb.control('')
      }),
      author: this.fb.group({
        authId: this.fb.control('', [Validators.required]),
        authName: this.fb.control('')
      }),
      technology: this.fb.group({
        techId: this.fb.control('', [Validators.required]),
        techName: this.fb.control('')
      }),
      noOfSession: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]],
      noOfHours: ['', [Validators.required, Validators.pattern('^[1-9][0-9]*$')]]
      // isAssessmentPrepared: fb.control('')
    });
  }

  // Method to fetch the list of all submodules
  public getAllSubModules(): void {
    this.scheduleService.getAllSubModules().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.subModuleList = response.body;
        }
      }
    });
  }

  // Method to fetch the list of all authors
  public getAllAutohors(): void {
    this.scheduleService.getAllAutohors().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.authorList = response.body;
        }
      }
    });
  }

  // Method to fetch the list of all technologies
  public getAllTechnologies(): void {
    this.scheduleService.getAllTechnologies().subscribe({
      next: (response) => {
        if (response.status === 200) {
          this.technologyList = response.body;
        }
      }
    });
  }

  //save ScheduleFor Form
  public onFormSubmit(): void {
    if (this.scheduleForm.valid) {

      Swal.fire({
        title: this.scheduleForm.get('scheduleForId').value === '' ? 'Do you want to save ?' : 'Do you want to Update ?',
        text: "",
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'No',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes'
      }).then((result) => {
        if (result.isConfirmed) {
          this.scheduleService.saveScheduleForm(this.scheduleForm.value).subscribe({
            next: (response) => {
              Swal.fire({
                icon: 'success',
                title: this.scheduleForm.get('scheduleForId').value === '' ? 'Scheduled Successfully' : 'Update Successfully',
              }).then((result) => {
                if (result.isConfirmed) {
                  this.router.navigate(['/admin/schedule/viewSchedule']);
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
      // this.scheduleForm.markAllAsTouched();
    }
  }


  // Method to fetch and set the values of the form if the component is in edit mode
  public editSheduleFor(): void {
    var scheduleForId;
    scheduleForId = this.activatedRoute.snapshot.paramMap.get('scheduleForId')

    if (scheduleForId) {
      this.scheduleService.updateScheduleFor(scheduleForId).subscribe({
        next: (response) => {
          this.scheduleForm.patchValue({
            scheduleForId: response.body.scheduleForId,
            scheduleForName: response.body.scheduleForName,
            subModule: {
              submoduleId: response.body.subModule?.submoduleId,
              submoduleName: response.body.subModule?.submoduleName,
            },
            author: {
              authId: response.body.author?.authId,
              authName: response.body.author?.authName,
            },
            technology: {
              techId: response.body.technology?.techId,
              techName: response.body.technology?.techName,
            },
            noOfSession: response.body.noOfSession,
            noOfHours: response.body.noOfHours,
            // isAssessmentPrepared: response.body.isAssessmentPrepared,
          });
        }
      });
    }
  }
}
