import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../shared/http.service';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { error } from 'util';


@Component({
  selector: 'app-display-employee',
  templateUrl: './display.component.html',
  styleUrls: ['./display.component.scss']
})
export class DisplayComponent implements OnInit {
  displayList = [];
  constructor(private Service: HttpService, private router: Router,private route : ActivatedRoute, ) { }

  ngOnInit() {
    this.Service.displayEmployee()
    .subscribe((response) => {
      this.displayList = response.EmployeeDetails;
    },error=>{
      this.router.navigate(['authentication/login'])
    });
  }
  editEmployee(employeeId) {
    this.router.navigate(['../update/' +employeeId], {relativeTo: this.route});
  }
  deleteEmployee(empId) {
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
      if (result.value) {
        this.Service.deleteEmp(empId)
        .subscribe(response => {
          console.log(response);
          this.ngOnInit();
        }, error => {
          console.log(error);
        });
        Swal.fire('Deleted!','Your file has been deleted.','success')
      }
    })
}
}
