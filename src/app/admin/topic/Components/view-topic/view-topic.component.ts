import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TopicService } from '../../Services/topic.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-view-topic',
  templateUrl: './view-topic.component.html',
  styleUrls: ['./view-topic.component.css']
})
export class ViewTopicComponent {
  topicList:any;

  // for pagination
  indexNumber: number = 0;
  page: number = 1;
  tableSize: number = 10;
  count: number = 0;
  pageSizes = [10, 20, 30, 40, 50];

  constructor(private toipcService: TopicService, private router: Router) { }

  ngOnInit() {
    this.getAllTopics();
  }
  getAllTopics() {
    this.toipcService.viewTopic().subscribe((response) => {
      this.topicList = response;
    });
  }

  public delete(id: any): void {
    Swal.fire({
      title: 'Are you sure ?',

      text: '',

      icon: 'warning',

      showCancelButton: true,

      cancelButtonText: 'No',

      confirmButtonColor: '#3085d6',

      cancelButtonColor: '#d33',

      confirmButtonText: 'Yes',
    }).then((result) => {
      if (result.isConfirmed) {
        this.toipcService.deleteTopic(id).subscribe({
          next: (response) => {
            Swal.fire({
              icon: 'success',

              title: 'Deleted Successfully',
            });

            this.getAllTopics();
          },

          error: (error) => {
            Swal.fire({
              icon: 'error',

              title: 'Something Went Wrong!',
            });
          },
        });
      }
    });
  }

  edit(id: any) {
    // alert(id)
    this.router.navigate(['/admin/topic/editTopic/' + id]);
  }

  //pagination functionality
  getTableDataChange(event: any) {

    this.page = event;
    this.indexNumber = (this.page - 1) * this.tableSize;
    this.getAllTopics();
  }



}
