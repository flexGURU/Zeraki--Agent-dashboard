import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Invoice } from '../../models/invoice.model';
import { DataAddService } from '../../services/data-add.service';




@Component({
  selector: 'app-add-invoice',
  standalone: true,
  imports: [ RouterModule, FormsModule, ReactiveFormsModule],  
  templateUrl: './add-invoice.component.html',
  styleUrl: './add-invoice.component.css'
})
export class AddInvoiceComponent {

  constructor(private addDataService:  DataAddService, private router: Router ) {}

  formdata: Invoice = {
    id: 0,
    schoolId: 0,
    invoiceNumber: '',
    invoiceItem: '',
    creationDate: '',
    dueDate: '',
    amount: 0,
    paidAmount: 0,
    balance: 0,
    status: ''
  }
  addNewInvoice() {
    return this.addDataService.addInvoice(this.formdata).subscribe({
      next: (data) => {
        this.router.navigate(["/schools"])
      },
      error: (er) => {
        console.log(er)
      }
    })
  }

  }


