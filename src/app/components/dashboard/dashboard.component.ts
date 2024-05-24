// src/app/components/dashboard/dashboard.component.ts
import Chart from 'chart.js/auto';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { Component, OnInit } from '@angular/core';
import { SchoolService } from '../../services/school.service'
import { controllers } from 'chart.js';
import { MatDialog } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms'; // Import FormsModule
import { School } from '../../models/school.model';
import { Invoice } from '../../models/invoice.model';
import { Collection } from '../../models/collection.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, MatCardModule, FormsModule],
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  schools: any[]= [];
  invoices: Invoice[] = [];
  collections: Collection[] = [];
  sortedInvoices: any[] = [];
  selectedInvoice: any = null;
  paymentAmount: number = 0;
  financeSignUps: number = 0;
  AnalysisSignUps: number = 0;
  timetableSignUps: number = 0;
  barAnalyticsSignUps: number = 0;
  barFinanceSignUps: number = 0;
  barTimetableSignUps: number =0;

  
  

  displayedColumns: string[] = ['schoolName', 'amountDue', 'dueDate', 'actions'];

  constructor(private schoolService: SchoolService, public dialog: MatDialog) {}
  
  

  ngOnInit(): void {
    this.schoolService.getSchools().subscribe(data => {
      this.schools = data;
      this.calculateSignUps();
    });
  
   

    this.schoolService.countFinanceSignUps().subscribe(count => {
      this.financeSignUps = count;
      this.createChart();
    })

    this.schoolService.countAnlysisSignups().subscribe(count => {
      this.AnalysisSignUps = count;
      this.createAnalyticsChart();
    });

    this.schoolService.countTimetableSignups().subscribe(count => {
      this.timetableSignUps = count;
      this.createTimetableChart();
    });
    

    this.schoolService.getSchools().subscribe(data => {
      console.log('Schools:', data); 
      this.schools = data;
    });

    this.schoolService.getInvoices().subscribe(data => {
      console.log('Invoices:', data); 
      this.invoices = data;
    });

    this.schoolService.getCollections().subscribe(data => {
      console.log('Collections:', data); 
      this.collections = data;
    });

    
  }
  calculateSignUps(): void {
    this.barAnalyticsSignUps = this.calculateProductSignUps('Zeraki Analytics');
    this.barFinanceSignUps = this.calculateProductSignUps('Zeraki Finance');
    this.barTimetableSignUps = this.calculateProductSignUps('Zeraki Timetable');

   
    this.createBarAnalyticsChart();
    this.createBarFinanceChart();
    this.createBarTimetableChart();
  }
  calculateProductSignUps(product: string): any {
    const signUps = { Primary: 0, Secondary: 0, IGCSE: 0 };

    this.schools.forEach(school => {
      if (school.products.includes(product)) {
        switch (school.type) {
          case 'Primary':
            signUps.Primary++;
            break;
          case 'Secondary':
            signUps.Secondary++;
            break;
          case 'IGCSE':
            signUps.IGCSE++;
            break;
          default:
            break;
        }
      }
    });

    return signUps;
  }
  calculateTotalRevenue(): number {
    // Calculate total revenue based on invoices
    return this.invoices.reduce((total, invoice) => total + invoice.amount, 0);
  }

  countBouncedCheques(): number {
    // Count number of invoices with bounced status
    return this.invoices.filter(invoice => invoice.status === 'Bounced').length;
  }
  showInvoices(): void {
    this.sortedInvoices = this.invoices.filter(invoice => invoice.status === 'Pending').sort((a, b) => new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime());
  }
  getSchoolNameBySchoolId(schoolId: number): string {
    const school = this.schools.find(school => school.id === schoolId);
    return school ? school.name : 'Unknown School';
  }

  getSchoolName(invoice: Invoice): string {
    const schoolId = invoice.schoolId;
    return this.getSchoolNameBySchoolId(schoolId);
  }

  collectPayment(invoice: any): void {
    this.selectedInvoice = invoice;
    this.paymentAmount = invoice.balance;
  }

  submitPayment(): void {
    // Logic to handle payment submission
    console.log(`Collecting payment for invoice ${this.selectedInvoice.invoiceNumber}: ${this.paymentAmount}`);
    // After handling the payment, close the modal and reset the form
    this.closePaymentModal();
  }

  closePaymentModal(): void {
    this.selectedInvoice = null;
    this.paymentAmount = 0;
  }
  setTarget(): void {
    // Assuming you have a variable to store the target value
    const targetValue = 100; // You can replace this with the actual target value
  
    // Update the pie chart data with the new target value
    this.chart.data.datasets[0].data[1] = targetValue; // Assuming the target value is for 'Finance'
    this.chart.update();
  }
  
  
  public chart: any;

  createChart() {
    
    const finance = new Chart("financeTargets", {
      type: 'pie',
      data: {
        labels: [ 'Actual', 'Targets'],
      
        datasets: [{
          data: [this.financeSignUps,15],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)'
            
          ],
          hoverOffset: 14,
          borderColor: ['rgba(0, 0, 0, 0.1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        radius: 100,
        rotation: 0,
        circumference: 360,
        plugins: {
          title: {
            display: true,
            text: "Zeraki Finance",
            font: {
              size: 18,
              weight: 'normal',
              family: 'Segoe UI',
            },
            color: 'black',
            
          },
          legend: {
            display: true,
            align: 'end'
          }
        }
      }
    });
  }

  createAnalyticsChart() {

    const analysis = new Chart("analysisTargets", {
      type: 'pie',
      data: {
        labels: ['Actual', 'Target'],
      
        datasets: [{
          data: [this.AnalysisSignUps,15],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)'
          ],
          hoverOffset: 14,
          borderColor: ['rgba(0, 0, 0, 0.1)'],
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        radius: 100,
        rotation: 0,
        circumference: 360,
        plugins: {
          title: {
            display: true,
            text: "Zeraki Analytics",
            font: {
              size: 18,
              weight: 'normal',
              family: 'Segoe UI',
            },
            color: 'black',
            
          },
          legend: {
            display: true,
            align: 'end'
          }
        }
      }
    });
  }


    createTimetableChart() {
    const timetable = new Chart("timetableTargets", {
      type: 'pie',
      data: {
        labels: ['Actual', 'Target'],
      
        datasets: [{
          data: [this.timetableSignUps,15],
          backgroundColor: [
            'rgb(255, 99, 132)',
            'rgb(255, 205, 86)'

            
          ],
          hoverOffset: 14,
          borderColor: 'rgba(0, 0, 0, 0.1)',
          borderWidth: 1
        }]
      },
      options: {
        responsive: true,
        radius: 100,
        rotation: 0,
        circumference: 360,
        plugins: {
          title: {
            display: true,
            text: "Zeraki Timetable",
            font: {
              size: 18,
              weight: 'normal',
              family: 'Segoe UI',
            },
            color: 'black',
            
          },
          legend: {
            display: true,
            align: 'end'
          }
        }
      }
    });
  }
  

    createBarAnalyticsChart() {
      this.chart = new Chart("financeSignups", {
        type: 'bar',
        data: {
          labels: ['Primary', 'Secondary', 'IGCSE'],
          datasets: [
            {
              label: 'Zeraki Finance',
              data: ["9", "7", "3"],
              backgroundColor: [
                'rgba(54, 162, 205, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 20, 1)'
  
              ],
            }
          ]
        },
        options: {
          responsive: true,
          aspectRatio: 1.5,
          plugins: {
            title: {
              display: true,
              text: "Zeraki Finance",
              font: {
                size: 18,
                weight: 'normal',
                family: 'Segoe UI',
              },
              color: 'black'
            },
            legend: {
              display: false,
              labels: {
                font: {
                  size: 14,
                  family: 'Segoe UI',
                },
                color: 'black',
              }
            },
          },
          scales: {
            x: {
              grid: {
                display: true
              },
              ticks: {
                font: {
                  size: 14,
                  family: 'Segoe UI',
                },
                color: 'black'
              } 
            },
            y: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)', 
              },
              ticks: {
                font: {
                  size: 14,
                  family: 'Segoe UI',
                },
                color: 'black'
              }
            }
          }
        }
      });

    }
    
    createBarFinanceChart() {
      this.chart = new Chart("analysisSignups", {
        type: 'bar',
        data: {
          labels: ['Primary', 'Secondary', 'IGCSE'],
          datasets: [
            {
              label: "Zeraki Analytics",
              data: [ "5", "4", "8"],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 20, 1)'
  
              ],
            }
          ]
        },
        options: {
          responsive: true,
          aspectRatio: 1.5,
          plugins: {
            title: {
              display: true,
              text: "Zeraki Analytics",
              font: {
                size: 18,
                weight: 'normal',
                family: 'Segoe UI',
              },
              color: 'black'
            },
            legend: {
              display: false,
              labels: {
                font: {
                  size: 14,
                  family: 'Segoe UI',
                },
                color: 'black',
              }
            },
          },
          scales: {
            x: {
              grid: {
                display: true
              },
              ticks: {
                font: {
                  size: 14,
                  family: 'Segoe UI',
                },
                color: 'black'
              } 
            },
            y: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)', 
              },
              ticks: {
                font: {
                  size: 14,
                  family: 'Segoe UI',
                },
                color: 'black'
              }
            }
          },
          
        }
      });

    }
    
    createBarTimetableChart() {
      this.chart = new Chart("timetableSignups", {
        type: 'bar',
        data: {
          labels: ['Primary', 'Secondary', 'IGCSE'],
          datasets: [
            {
              label: "Zeraki Timetable",
              data: ["11", "5", "7" ],
              backgroundColor: [
                'rgba(54, 162, 235, 0.2)',
                'rgba(153, 102, 255, 0.2)',
                'rgba(201, 203, 20, 1)'
              ],
            }
          ]
        },
        options: {
          responsive: true,
          aspectRatio: 1.5,
          plugins: {
            title: {
              display: true,
              text: "Zeraki Timetable",
              font: {
                size: 18,
                weight: 'normal',
                family: 'Segoe UI',
              },
              color: 'black'
            },
            legend: {
              display: false,
              labels: {
                font: {
                  size: 14,
                  family: 'Segoe UI',
                },
                color: 'black',
              }
            },
          },
          scales: {
            x: {
              grid: {
                display: true
              },
              ticks: {
                font: {
                  size: 14,
                  family: 'Segoe UI',
                },
                color: 'black'
              } 
            },
            y: {
              grid: {
                color: 'rgba(0, 0, 0, 0.1)', 
              },
              ticks: {
                font: {
                  size: 14,
                  family: 'Segoe UI',
                },
                color: 'black'
              }
            }
          },
          
        }
      });

    }
    
}






