import { Room } from '../interfaces/roomInterface';

export function validateRoomData(data: Partial<Omit<Room, 'id'>>) {
  if (!data.photo || !Array.isArray(data.photo) || data.photo.length === 0) {
    throw new Error('Photo must be a non-empty array');
  }

  if (!data.photo.every(url => typeof url === 'string' && url.startsWith('http'))) {
    throw new Error('Each photo must be a valid URL string');
  }

  if (typeof data.roomNumber !== 'number' || data.roomNumber <= 0) {
    throw new Error('Room number must be a positive number');
  }

  if (!data.roomType || typeof data.roomType !== 'string') {
    throw new Error('Room type is required and must be a string');
  }

  if (!data.amenities || typeof data.amenities !== 'string') {
    throw new Error('Amenities are required and must be a string');
  }

  if (typeof data.price !== 'number' || data.price <= 0) {
    throw new Error('Price must be a positive number');
  }

  if (typeof data.offer_price !== 'number' || data.offer_price < 0) {
    throw new Error('Offer price must be a non-negative number');
  }

  if (!['available', 'booked'].includes(data.status || '')) {
    throw new Error('Status must be either "available" or "booked"');
  }
}
