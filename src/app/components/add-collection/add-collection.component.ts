import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Router } from '@angular/router';
import { Collection } from '../../models/collection.model';
import { DataAddService } from '../../services/data-add.service';

@Component({
  selector: 'app-add-collection',
  standalone: true,
  imports: [ RouterModule, FormsModule, ReactiveFormsModule],  
  templateUrl: './add-collection.component.html',
  styleUrl: './add-collection.component.css'
})
export class AddCollectionComponent {

  constructor(private addDataService:  DataAddService, private router: Router ) {}

  formdata: Collection = {
    id: 0,
    invoiceId: 0,
    collectionNumber: '',
    date: '',
    status: '',
    amount: 0
  }
  addNewCollection() {
    return this.addDataService.addCollection(this.formdata).subscribe({
      next: (data) => {
        this.router.navigate(["/schools"])
      },
      error: (er) => {
        console.log(er)
      }
    })
  }


}
