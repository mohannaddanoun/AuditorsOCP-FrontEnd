import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http'; 
import { CommonModule, NgFor } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { FormsModule } from '@angular/forms'
import { Manager } from '../shared/manager.model';
import { DashboardService } from '../shared/dashboard.service';
@Component({
  selector: 'app-manager',
  standalone:true,
  imports: [HttpClientModule, CommonModule, NgFor,RouterModule,FormsModule], 
  templateUrl: './manager.component.html',
  styleUrl: './manager.component.css'
})
export class ManagerComponent implements OnInit {
  filteredD: any[] = [];
  search: string = '';
  paginatedD: any[] = []; 

  currentPage: number = 1;
  pageSize: number = 3; 
  totalPages: number = 0;

  constructor(
    public service: DashboardService,
    private toastr: ToastrService,
    private router: Router,
   ) {}
  ngOnInit(): void {
    this.service.getList();
  }

  populateForm(record: Manager){
    this.service.newData =Object.assign({},record)
    this.navigateToForm()
  }

  deleteRecord(officeID: number) {
    if(confirm('Are you sure to delete this record ?'))
    this.service.deleteData(officeID)
      .subscribe({
        next: () => {
         this.toastr.error('Deleted Successfully', 'Recored Removed');
         this.service.getList(); 
       },
       error: err => console.log(err),
      });
  }
  toCustomer() {
    this.router.navigate(['/app-customer']);
  }
  tologin() {
    this.router.navigate(['/app-login']);
  }
  navigateToForm() {
    this.router.navigate(['/app-manager-form']);
  }

  filteredData() {
    this.filteredD = this.service.records.filter((data) =>
      data.officeName.toLowerCase().includes(this.search.toLowerCase()) ||
      data.taxNumber.toLowerCase().includes(this.search.toLowerCase()) 
    );
    this.currentPage = 1; 
    this.updatePagination(); 
  }


  updatePagination() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    this.paginatedD = this.filteredD.slice(startIndex, startIndex + this.pageSize);
    this.totalPages = Math.ceil(this.filteredD.length / this.pageSize);
  }
  goToPage(page: number) {
    this.currentPage = page;
    this.updatePagination();
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updatePagination();
    }
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updatePagination();
    }
  }
}
