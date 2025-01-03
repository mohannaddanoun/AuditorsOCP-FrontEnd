import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CommonModule, NgIf } from '@angular/common';
import { Router } from '@angular/router';
import { DashboardService } from '../shared/dashboard.service';
import { Manager } from '../shared/manager.model';
@Component({
  selector: 'app-manager-form',
  imports: [FormsModule, NgIf,CommonModule],
  templateUrl: './manager-form.component.html',
  styleUrl: './manager-form.component.css'
})
export class ManagerFormComponent {

  constructor(public service: DashboardService, private router: Router,  private toastr: ToastrService
  ) {}
  trackByFn(index: number,item:any):number{
    return index;
  }
  onSubmit(Form: NgForm){
    if(this.service.newData.id == 0)
      this.addRecord(Form)
    else
      this.updateRecord(Form)
  }
  addRecord(Form: NgForm){
    this.service.postData()
    .subscribe({
      next: res => {
        this.service.records= res as Manager[]
        console.log(res)
        this.service.reset(Form)
        this.toastr.success('Inserted Successfully', 'New Record is Added')
        this.navigateToTable()
      },
      error: err=> {console.log(err)}
    })
  }
  updateRecord(Form: NgForm){
    this.service.putData()
    .subscribe({
      next: res => {
        this.service.records= res as Manager[]
        console.log(res)
        this.service.reset(Form)
        this.toastr.info('Updated Successfully', 'Data is Updated')
        this.navigateToTable()
      },
      error: err=> {console.log(err)}
    })
  }
  addPhoneNumber() {
    this.service.newData.phoneNumbers.push('');
  }
  removePhoneNumber(index: number) {
    this.service.newData.phoneNumbers.splice(index, 1);
  }

  addEmail() {
    this.service.newData.emails.push('');
}
removeEmail(index: number) {
    this.service.newData.emails.splice(index, 1);
}

addlicensedAccountants() {
  this.service.newData.licensedAccountants.push('');
}
removelicensedAccountants(index: number) {
  this.service.newData.licensedAccountants.splice(index, 1);
}

addlicenseNumbers() {
  this.service.newData.licenseNumbers.push('');
}
removelicenseNumbers(index: number) {
  this.service.newData.licenseNumbers.splice(index, 1);
}

  navigateToTable() {
    this.router.navigate(['/app-manager']);
  }


}
