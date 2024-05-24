export interface School {
    id: number;
    name: string;
    type: string;
    products: string[];
    county: string;
    registrationDate: string;
    contactInfo: {
      email: string;
      phone: string;
    };
    balance: number;
  }
  