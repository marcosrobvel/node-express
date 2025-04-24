export interface User {
    id: number;
    photo: string;
    name: string;
    mail: string;
    job: string;
    phone: string;
    status: "active" | "inactive";
    startDate: string;
    endDate: string;
  }