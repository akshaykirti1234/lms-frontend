import { Component, ViewChild } from '@angular/core';
import { AssesmentConfigService } from '../../Services/assesment-config.service';
import { FormBuilder, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-assesment-config',
  templateUrl: './view-assesment-config.component.html',
  styleUrls: ['./view-assesment-config.component.css']
})
export class ViewAssesmentConfigComponent {

  isScheduleWise: boolean = true;
  scheduleData: any[] = [];
  scheduleConfigDetails: any = {

  };
  schConfigForm: FormGroup;
  sessConfigForm: FormGroup;
  sessionConfigDetails: any = {
    id: '',
    moduleName: '',
    subModuleName: '',
    schdeuleFor: '',
    sessionName: ''
  };
  sessionData: any[] = [];

  constructor(private fb: FormBuilder, private assessmentConfigService: AssesmentConfigService) {
    this.schConfigForm = this.fb.group({

      "numberOfQuestions": ['']
    });

    this.sessConfigForm = this.fb.group({

      "numberOfQuestions": [''],
    });
  }
  ngOnInit() {
    this.getAllScheduleConfigList();
  }

  getAllScheduleConfigList() {
    this.assessmentConfigService.getAllScheduleConfigList().subscribe((data: any) => {
      this.scheduleData = data;
    })
  }

  getAllSessionConfigList() {
    this.assessmentConfigService.getAllSessionConfigList().subscribe((data: any) => {
      this.sessionData = data;

    })
  }

  @ViewChild('editModal') editModal: any;
  selectedItem: any;

  toggleDataView() {
    this.isScheduleWise = !this.isScheduleWise;
    this.getAllSessionConfigList();
  }

  openSchEditModal(item: any) {
    this.selectedItem = item;
    this.getSchConfig(item);


  }

  getSchConfig(itemData: any) {
    this.assessmentConfigService.getSchConfigById(itemData).subscribe((data: any) => {
      console.log(data);
      this.scheduleConfigDetails.id = data.ASSESSMENTSETTINGID;
      this.scheduleConfigDetails.moduleName = data.MODULENAME;
      this.scheduleConfigDetails.subModuleName = data.SUBMODULENAME;
      this.scheduleConfigDetails.schdeuleFor = data.SCHEDULEFOR;
      this.schConfigForm.patchValue({
        "numberOfQuestions": data.NOOFQUESTION,
      });
    });
  }
  //form submit for schedule config edit
  schFormSubmit(id: any) {
    console.log(id);

    console.log('schFormSubmit works');

    this.assessmentConfigService.updateSchConfig(id, this.schConfigForm.value).subscribe((data: any) => {
      Swal.fire('Success', 'Successfully Updated!', 'success');

    })

  }

  deleteSchConfig(id: any) {

    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.assessmentConfigService.deleteSchConfig(id).subscribe(
          (data) => {
            Swal.fire(
              'Data Deleted',
              'The data has been successfully deleted.',
              'success'
            );

          },
          (error) => {
            Swal.fire(
              'Error',
              'An error occurred while fetching the kt data.',
              'error'
            );
          }
        );
      }
    });
  }


  openSessEditModal(item: any) {
    this.selectedItem = item;
    this.getSessConfig(item);
  }

  getSessConfig(itemData: any) {
    this.assessmentConfigService.getSessionConfigById(itemData).subscribe((data: any) => {
      console.log(data);
      this.sessionConfigDetails.id = data.SESSIONASSESSMENTSETTINGID
      this.sessionConfigDetails.moduleName = data.MODULENAME;
      this.sessionConfigDetails.subModuleName = data.SUBMODULENAME;
      this.sessionConfigDetails.schdeuleFor = data.SCHEDULEFOR;
      this.sessionConfigDetails.sessionName = data.SESSIONNAME;
      this.sessConfigForm.patchValue({
        "numberOfQuestions": data.NOOFQUESTION,
      });


    })
  }
  //form submit for  session config edit
  sessFormSubmit(id: any) {
    console.log(id);
    console.log('sessFormSubmit works');
    this.assessmentConfigService.updateSessConfig(id, this.sessConfigForm.value).subscribe((data: any) => {
      Swal.fire('Success', 'Successfully Updated!', 'success');
    })
  }

  deleteSessConfig(id: any) {
    Swal.fire({
      title: 'Confirm Deletion',
      text: 'Are you sure you want to delete this data?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it',
      cancelButtonText: 'No, cancel',
    }).then((result) => {
      if (result.isConfirmed) {
        this.assessmentConfigService.deleteSessConfig(id).subscribe(
          (data) => {
            Swal.fire(
              'Data Deleted',
              'The data has been successfully deleted.',
              'success'
            );

          },
          (error) => {
            Swal.fire(
              'Error',
              'An error occurred while fetching the kt data.',
              'error'
            );
          }

        );
      }
    });
  }

  closeEditModal() {
    this.editModal.hide(); // This assumes you have a hide method in your modal component
  }
}
