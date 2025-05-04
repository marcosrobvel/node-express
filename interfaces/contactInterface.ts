type ContactStatus = "" | "archived";
type Email = `${string}@${string}.${string}`; 
type PhoneNumber = `${number}-${number}-${number}`; 
type URLString = `https://${string}`;

export interface Contact {
  id: number;
  photo: URLString;
  date: string;
  customer: string;
  mail: Email;
  phone: PhoneNumber;
  subject: "New Subject" | string;
  comment: string;
  status: ContactStatus;
}
