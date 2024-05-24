import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Invoice } from '../../models/invoice.model';
import { editService } from '../../services/edit.service'
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';



@Component({
  selector: 'app-edit-invoice',
  standalone: true,
  imports: [FormsModule, ReactiveFormsModule ],
  templateUrl: './edit-invoice.component.html',
  styleUrl: './edit-invoice.component.css'
})
export class EditInvoiceComponent {

  constructor(
    private editServ: editService,
    private router: Router,
    private route: ActivatedRoute
  )  {}

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
  ngOnInit(): void {
  
    this.route.paramMap.subscribe((param) => {
      let id = Number(param.get('id'))
      this.getByid(id)
    })
  }
  getByid(id: number) {
    this.editServ.editInvoice(id).subscribe((data) => {
      this.formdata = data;
  
    })
  }
  update() {
    this.editServ.updateInvoice(this.formdata).subscribe({
      next: (data) => {
        this.router.navigate(["/schools"])
  
      },
      error: (er) => {
        console.log(er)
      }
    })
  }
  
  }
