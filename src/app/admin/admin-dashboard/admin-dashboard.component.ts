import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './admin-dashboard.component.html',
  styleUrls: ['./admin-dashboard.component.css']
})
export class AdminDashboardComponent implements OnInit {

  public userName = sessionStorage.getItem('fullName');
  // Property to hold the current time
  currentTime: any;

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    setInterval(() => {
      this.currentTime = new Date();
    }, 1000);
  }



  public logout(): void {
    Swal.fire({
      title: 'Confirm Logout?',
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes'
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.clear();
        this.router.navigate(['/home']);
      }
    });
  }

}
