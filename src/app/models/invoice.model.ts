export interface Invoice {
    id: number;
    schoolId: number;
    invoiceNumber: string;
    invoiceItem: string;
    creationDate: string;
    dueDate: string;
    amount: number;
    paidAmount: number;
    balance: number;
    status: string;
  }
  