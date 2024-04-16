import { Component, OnInit } from '@angular/core';
import { DashboardService } from '../../Services/dashboard.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-schedule',
  templateUrl: './view-schedule.component.html',
  styleUrls: ['./view-schedule.component.css']
})
export class ViewScheduleComponent implements OnInit {

  public scheduleList: any;

  constructor(private dahboardService: DashboardService, private activateRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activateRoute.paramMap.subscribe(params => {
      const subModuleId = params.get('subModuleId');
      this.getScheduleBySubModuleId(subModuleId);
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
      }
    });
  }

}
