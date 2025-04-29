type RoomType = "Single Bed" | "Double Bed" | "Suite" | "Deluxe Suite";
type BookingStatus = "in" | "out" | "progress";

export interface Booking {
  id: number; 
  guest: string;
  orderDate: string; 
  checkIn: string;
  checkOut: string;
  special: string | null; 
  roomType: RoomType;
  roomNumber: number;
  bookStatus: BookingStatus;
  photo: string[]; 
}