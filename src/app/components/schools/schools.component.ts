import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { SchoolService } from '../../services/school.service';
import { DataAddService } from '../../services/data-add.service';
import { FormBuilder, FormGroup, FormControl, Validators } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { editService } from '../../services/edit.service'
import { School } from '../../models/school.model';

@Component({
  selector: 'app-schools',
  standalone: true,
  imports: [CommonModule, MatCardModule, ReactiveFormsModule, RouterModule],
  templateUrl: './schools.component.html',
  styleUrls: ['./schools.component.css']
})
export class SchoolComponent implements OnInit {
  schools: any[] = [];
  selectedSchool: any = null;
  invoices: any[] = [];
  collections: any[] = [];
  addSchoolForm!: FormGroup;
  addInvoiceForm!: FormGroup;
  addCollectionForm!: FormGroup;
  showAddSchoolForm = false;
  showAddInvoiceForm = false;
  showAddCollectionForm = false;

  constructor(
    private schoolService: SchoolService,
    private dataAddService: DataAddService,
    private editServ: editService
    
  ) {
    
  }

  ngOnInit() {
    this.fetchSchools();
  }

  fetchSchools() {
    this.schoolService.getSchools().subscribe((schools: any[]) => {
      this.schools = schools;
      console.log(this.schools);
    });
  }

  selectSchool(school: any) {
    this.selectedSchool = school;
    console.log("Selected School:", this.selectedSchool);
    this.fetchInvoicesAndCollections(school.id);
  }

  fetchInvoicesAndCollections(schoolId: number) {
    this.schoolService.getInvoicesById(schoolId).subscribe((invoices: any[]) => {
      this.invoices = invoices;
    });
    this.schoolService.getCollectionsById(schoolId).subscribe((collections: any[]) => {
      this.collections = collections;
    });
  }

  deleteSchool(id: number) {
    this.editServ.deleteSchool(id).subscribe({
      next: (data) => {
        this.schools = this.schools.filter(_ => _.id != id)
      }

    })
  }
  closeDetails() {
    this.selectedSchool = null;
  }

  
}