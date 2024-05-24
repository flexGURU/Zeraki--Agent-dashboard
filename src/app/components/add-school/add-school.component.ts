import { Component } from '@angular/core';
import { RouterModule, Router } from '@angular/router';
import { DataAddService } from '../../services/data-add.service';
import { School } from '../../models/school.model';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-add-school',
  standalone: true,
  imports: [ RouterModule, FormsModule, ReactiveFormsModule],
  templateUrl: './add-school.component.html',
  styleUrl: './add-school.component.css'
})
export class AddSchoolComponent {

  constructor(private addDataService:  DataAddService, private router: Router ) {}

  formdata: School = {
    id: 0,
    name: '',
    type: '',
    products: [],
    county: '',
    registrationDate: '',
    contactInfo: {
      email: '',
      phone: ''
    },
    balance: 0
  }

  addNewSchool() {
    this.addDataService.addSchool(this.formdata).subscribe({
      next: (data) => {
        this.router.navigate(["/schools"])

      },
      error: (er) => {
        console.log(er)
      }
    })
  }

}
