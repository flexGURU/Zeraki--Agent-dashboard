# sales-agent-dashboard

![dashboard](https://github.com/flexGURU/-Zeraki-sales-agent-dashboard/assets/88624924/b66178b0-53e5-4907-9d1f-f4d58638ca6b)
![edit](https://github.com/flexGURU/-Zeraki-sales-agent-dashboard/assets/88624924/894dab49-9785-4a5f-a685-ce8f4cad3520)
![schools](https://github.com/flexGURU/-Zeraki-sales-agent-dashboard/assets/88624924/de8d244c-5b88-469a-bc77-9f77bf4610cd)
a comprehensive Angular web application designed to efficiently manage schools, invoices, and collections through intuitive dashboards, data visualizations, and seamless CRUD operations.

## Features

### Dashboard

1. **Summary**: The dashboard displays summaries of collections, signups, total revenue, bounced checks, and upcoming invoices.
2. **Product Distribution**: Pie charts illustrate the actual and target distributions of three products: Zeraki Analytics, Zeraki Finance, and Zeraki Timetable. The target distribution for each product is set to 15%.
3. **School Type Distribution**: Bar charts show the distribution of schools (Primary, Secondary, and IGCSE) for each product: Zeraki Analytics, Zeraki Finance, and Zeraki Timetable.

### Schools

The Schools section allows you to manage schools, invoices, and collections. You can perform CRUD (Create, Read, Update, Delete) operations against the `db.json` file using an HTTP client.

## Data Schema

The application uses a `db.json` file to store data. Here is the data schema:

### Schools

{
 "id": number,
 "name": string,
 "type": string,
 "products": string[],
 "county": string,
 "registrationDate": string,
 "contactInfo": {
   "email": string,
   "phone": string
 },
 "balance": number
}

### Invoices
{
  "id": number,
  "schoolId": number,
  "invoiceNumber": string,
  "invoiceItem": string,
  "creationDate": string,
  "dueDate": string,
  "amount": number,
  "paidAmount": number,
  "balance": number,
  "status": string
}

### Collections
{
  "id": number,
  "schoolId": number,
  "invoiceNumber": string,
  "invoiceItem": string,
  "creationDate": string,
  "dueDate": string,
  "amount": number,
  "paidAmount": number,
  "balance": number,
  "status": string
}


## Services
The application utilizes three services:

1. data-add service: This service contains functions responsible for adding data and is injected into components that add collections, invoices, or schools.
2. edit service: This service handles data editing operations.
3. school service: This service manages school-related operations.

## Deployment
To run the project locally, follow these steps:

## Clone the repository.
<b>PREREQUISITES: </b> must have Node 18 and above, angular/cli and Typescript installed
Install the required dependencies by running npm install.
Start the development server with ng serve.
Navigate to http://localhost:4200/ in your web browser.

# Note: The application uses Angular CLI 17.3.7 and Node.js 20.13.1, and it employs standalone components.


This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 17.3.7.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
