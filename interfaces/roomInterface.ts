export interface Room {
    id: number;
    photo: string[];
    roomNumber: number;
    roomType: string;
    amenities: string;
    price: number;
    offer_price: number;
    status: 'available' | 'booked';
  }
  