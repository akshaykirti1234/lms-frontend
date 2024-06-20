import { Component, ViewChild } from '@angular/core';
import { AssesmentConfigService } from '../../Services/assesment-config.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-assesment-config',
  templateUrl: './view-assesment-config.component.html',
  styleUrls: ['./view-assesment-config.component.css']
})
export class ViewAssesmentConfigComponent {

  isScheduleWise: boolean = true;
  indexNumber: number = 0;
  page: number = 1;
  tableSize: number = 10;
  count: number = 0;
  pageSizes = [10, 20, 30, 40, 50];

  indexNumberSess: number = 0;
  pageSess: number = 1;
  tableSizeSess: number = 10;
  countSess: number = 0;
  pageSizesSess = [10, 20, 30, 40, 50];
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

      "numberOfQuestions": ['', Validators.required],
      "passingPercentage": ['', Validators.required]
    });

    this.sessConfigForm = this.fb.group({

      "numberOfQuestions": ['', Validators.required],
      "passingPercentage": ['', Validators.required]
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

  //pagination functionality
  getTableDataChangeSch(event: any) {
    this.page = event;
    this.indexNumber = (this.page - 1) * this.tableSize;
    this.getAllScheduleConfigList();
  }

  getAllSessionConfigList() {
    this.assessmentConfigService.getAllSessionConfigList().subscribe((data: any) => {
      this.sessionData = data;

    })
  }

  //pagination functionality
  getTableDataChangeSess(event: any) {
    this.pageSess = event;
    this.indexNumberSess = (this.pageSess - 1) * this.tableSizeSess;
    this.getAllSessionConfigList();
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
      // console.log(data);
      this.scheduleConfigDetails.id = data.ASSESSMENTSETTINGID;
      this.scheduleConfigDetails.moduleName = data.MODULENAME;
      this.scheduleConfigDetails.subModuleName = data.SUBMODULENAME;
      this.scheduleConfigDetails.schdeuleFor = data.SCHEDULEFOR;
      this.schConfigForm.patchValue({
        "numberOfQuestions": data.NOOFQUESTION,
        "passingPercentage": data.PASSINGPERCENTAGE
      });
    });
  }
  //form submit for schedule config edit
  schFormSubmit(id: any) {
    // console.log(id);

    // console.log('schFormSubmit works');
    let errorFlag = 0;
    const numberOfQuestions = this.schConfigForm.get('numberOfQuestions');
    const passingPercentage = this.schConfigForm.get('passingPercentage');

    if (numberOfQuestions?.invalid && errorFlag === 0) {
      errorFlag = 1;
      // console.log('error happened');
      numberOfQuestions.markAsTouched();
    }
    if (passingPercentage?.invalid && errorFlag === 0) {
      errorFlag = 1;
      // console.log('error happened');
      passingPercentage.markAsTouched();
    }
    if (errorFlag == 0) {
      this.assessmentConfigService.updateSchConfig(id, this.schConfigForm.value).subscribe((data: any) => {
        Swal.fire('Success', 'Successfully Updated!', 'success');
        this.getAllScheduleConfigList();

      });
    }

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
            this.getAllScheduleConfigList();
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
      // console.log(data);
      this.sessionConfigDetails.id = data.SESSIONASSESSMENTSETTINGID
      this.sessionConfigDetails.moduleName = data.MODULENAME;
      this.sessionConfigDetails.subModuleName = data.SUBMODULENAME;
      this.sessionConfigDetails.schdeuleFor = data.SCHEDULEFOR;
      this.sessionConfigDetails.sessionName = data.SESSIONNAME;
      this.sessConfigForm.patchValue({
        "numberOfQuestions": data.NOOFQUESTION,
        "passingPercentage": data.PASSINGPERCENTAGE
      });


    })
  }
  //form submit for  session config edit
  sessFormSubmit(id: any) {
    // console.log(id);
    // console.log('sessFormSubmit works');
    let errorFlag = 0;
    const numberOfQuestions = this.sessConfigForm.get('numberOfQuestions');
    const passingPercentage = this.sessConfigForm.get('passingPercentage');

    if (numberOfQuestions?.invalid && errorFlag === 0) {
      errorFlag = 1;
      // console.log('error happened');
      numberOfQuestions.markAsTouched();
    }
    if (passingPercentage?.invalid && errorFlag === 0) {
      errorFlag = 1;
      console.log('error happened');
      passingPercentage.markAsTouched();
    }
    if (errorFlag == 0) {
      this.assessmentConfigService.updateSessConfig(id, this.sessConfigForm.value).subscribe((data: any) => {
        Swal.fire('Success', 'Successfully Updated!', 'success');
        this.getAllSessionConfigList();
      });
    }
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
            this.getAllSessionConfigList();
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
