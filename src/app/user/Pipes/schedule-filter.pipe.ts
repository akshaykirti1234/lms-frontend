import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'scheduleFilter'
})
export class ScheduleFilterPipe implements PipeTransform {

  transform(value: any, args?: any): any {
    // console.log("In Pipe");
    // console.log(value);
    // console.log(args);
    if (!args) {
      return value;
    } else {
      return value.filter((schedule: any) =>
        schedule.scheduleForName.toLowerCase().includes(args.toLowerCase()) || schedule.technology?.techName.toLowerCase().includes(args.toLowerCase()) || schedule.author?.authName.toLowerCase().includes(args.toLowerCase())
      );
    }

  }

}
