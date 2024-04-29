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
      const subModuleId = params.get('subModuleId');
      this.getScheduleBySubModuleId(subModuleId);
    });
  }

  public scheduleForId: any;
  public scheduleForName: any;
  public newlist: any = [];

  public getScheduleBySubModuleId(subModuleId: any) {

    this.newlist = [];
    this.scheduleForId = null;

    this.dahboardService.getScheduleBySubModuleId(subModuleId).subscribe({
      next: (response) => {
        console.log(response.body);
        this.scheduleList = response.body;
        this.scheduleList.forEach((element: any) => {
          if (element.scheduleForId == 7) {
            this.scheduleForId = element.scheduleForId;
            this.scheduleForName = element.scheduleForName;
          } else {
            this.newlist.push(element);
          }
        });
      },
      error: (error) => {
        console.log(error);
        this.scheduleList = null;
      }
    });
  }

}
