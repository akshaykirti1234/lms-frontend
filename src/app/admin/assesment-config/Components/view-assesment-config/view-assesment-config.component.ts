import { Component, ViewChild } from '@angular/core';
import { AssesmentConfigService } from '../../Services/assesment-config.service';

@Component({
  selector: 'app-view-assesment-config',
  templateUrl: './view-assesment-config.component.html',
  styleUrls: ['./view-assesment-config.component.css']
})
export class ViewAssesmentConfigComponent {
  isScheduleWise: boolean = true;
  scheduleData: any[] = []
;
  sessionData: any[] = [];

constructor(private assessmentConfigService: AssesmentConfigService){}
ngOnInit(){
  this.getAllScheduleConfigList();
}

getAllScheduleConfigList(){
this.assessmentConfigService.getAllScheduleConfigList().subscribe((data : any)=>{
  console.log(data);
  this.scheduleData = data;
})
}

getAllSessionConfigList(){
  this.assessmentConfigService.getAllSessionConfigList().subscribe((data : any)=>{
    console.log(data);
    this.sessionData = data;
    
  })
}

  @ViewChild('editModal') editModal: any;
  selectedItem: any;

  toggleDataView() {
    this.isScheduleWise = !this.isScheduleWise;
    this.getAllSessionConfigList();
  }

  openEditModal(item: any) {
    this.selectedItem = item;
    this.editModal.show(); // This assumes you have a show method in your modal component
  }

  closeEditModal() {
    this.editModal.hide(); // This assumes you have a hide method in your modal component
  }
}
