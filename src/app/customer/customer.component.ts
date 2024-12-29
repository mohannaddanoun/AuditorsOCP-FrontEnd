import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer } from '../shared/customer.service';
import { CommonModule, NgFor } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css'],
  imports: [CommonModule, NgFor, FormsModule],
})
export class CustomerComponent implements OnInit {

  
  customers: Customer[] = [];
  customer: Customer = {
    id:0,
    nationalId: 0,
    taxNumber: '',
    customerName: '',
    registrationEntity: '',
    companyType: '',
    financialYear: new Date().getFullYear(),
  };

  registrationEntities: string[] = [
    'وزارة الصناعة والتجارة',
    'دائرة مراقبة الشركات',
    'المجموعة الاردنية للمناطق الحرة',
    'وزارة التنمية الاجتماعية',
  ]; // جهات التسجيل
  companyTypes: { [key: string]: string[] } = {
    'وزارة الصناعة والتجارة': ['مؤسسة فردية'],
    'دائرة مراقبة الشركات': [
      'مساهمة عامة',
      'مساهمة خاصة',
      'ذات مسؤولية محدودة',
      'أجنبية عاملة',
      'أجنبية غير عاملة',
      'تضامن',
      'توصية بسيطة',
      'توصية بالأسهم',
    ],
    'المجموعة الاردنية للمناطق الحرة': [
      'مؤسسة فردية',
      'مساهمة عامة',
      'مساهمة خاصة',
      'ذات مسؤولية محدودة',
      'أجنبية عاملة',
      'أجنبية غير عاملة',
      'تضامن',
      'توصية بسيطة',
    ],
    'وزارة التنمية الاجتماعية': ['جمعية خيرية'],
  };

  filteredCompanyTypes: string[] = [];

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  onRegistrationEntityChange(): void {
    this.filteredCompanyTypes =
      this.companyTypes[this.customer.registrationEntity] || [];
  }

  addCustomer(): void {
    // if (this.customer.nationalId.toString().length !== 10) {
    //   alert('الرقم الوطني يجب أن يكون مكوناً من 10 أرقام!');
    //   return;
    // }

    this.customerService.addCustomer(this.customer).subscribe(() => {
      this.loadCustomers();
      this.resetForm();
    });
  }

  editIndex: number | null = null;

  enableEdit(index: number): void {
    this.editIndex = index; 
  } 

  updateCustomer(customer: Customer): void {
    if (customer.id) {
      this.customerService
        .updateCustomer(customer.id, customer)
        .subscribe(() => {
          this.loadCustomers();

        });
    }
  }

  saveEdit(): void {
    if (this.editIndex !== null) {
      const editedCustomer = this.customers[this.editIndex];
      this.customerService.updateCustomer(editedCustomer.id, editedCustomer).subscribe(() => {
        this.editIndex = null; 
        this.loadCustomers();
      });
    }
  }

  deleteCustomer(id: number): void {
    this.customerService.deleteCustomer(id).subscribe(() => {
      this.loadCustomers();
    });
  }

  resetForm(): void {
    this.customer = {
      id:0,
      nationalId: 0,
      taxNumber: '',
      customerName: '',
      registrationEntity: '',
      companyType: '',
      financialYear: new Date().getFullYear(),
    };
    this.filteredCompanyTypes = [];
  }
}
