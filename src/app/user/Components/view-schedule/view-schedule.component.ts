import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {

  public searchFilter: any;

  public scheduleList: any;

  public sales: boolean = false;



  constructor(private dahboardService: DashboardService, private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      const subModuleId: any = params.get('subModuleId');
      if (subModuleId == 12) {
        this.sales = true;
      } else {
        this.sales = false;
        this.getScheduleBySubModuleId(subModuleId);
      }
    });
  }

  public getScheduleBySubModuleId(subModuleId: any) {
    this.dahboardService.getScheduleBySubModuleId(subModuleId).subscribe({
      next: (response) => {
        console.log(response);
        this.scheduleList = response.body;
      },
      error: (error) => {
        console.log(error);
        this.scheduleList = null;
      }
    });
  }

}
