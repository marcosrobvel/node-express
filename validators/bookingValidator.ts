import { Booking } from '../interfaces/bookingInterface';

export function validateBooking(data: Booking): { valid: boolean; errors?: string[] } {
  const errors: string[] = [];

  if (typeof data.id !== 'number') {
    errors.push('id must be a number');
  }

  if (typeof data.guest !== 'string' || !data.guest.trim()) {
    errors.push('guest must be a non-empty string');
  }

  if (!isValidDateString(data.orderDate)) {
    errors.push('orderDate must be a valid date in MM-DD-YYYY format');
  }

  if (!isValidDateString(data.checkIn)) {
    errors.push('checkIn must be a valid date in MM-DD-YYYY format');
  }

  if (!isValidDateString(data.checkOut)) {
    errors.push('checkOut must be a valid date in MM-DD-YYYY format');
  }

  if (data.special !== null && typeof data.special !== 'string') {
    errors.push('special must be a string or null');
  }

  const validRoomTypes = ['Double Bed', 'Single Bed', 'Suite'];
  if (!validRoomTypes.includes(data.roomType)) {
    errors.push(`roomType must be one of: ${validRoomTypes.join(', ')}`);
  }

  if (typeof data.roomNumber !== 'number') {
    errors.push('roomNumber must be a number');
  }

  const validStatuses = ['in', 'out', 'cancelled'];
  if (!validStatuses.includes(data.bookStatus)) {
    errors.push(`bookStatus must be one of: ${validStatuses.join(', ')}`);
  }

  if (!Array.isArray(data.photo) || !data.photo.every(isValidUrl)) {
    errors.push('photo must be an array of valid URLs');
  }

  return {
    valid: errors.length === 0,
    errors,
  };
}

function isValidDateString(dateStr: string): boolean {
  const regex = /^\d{2}-\d{2}-\d{4}$/;
  if (!regex.test(dateStr)) return false;

  const [month, day, year] = dateStr.split('-').map(Number);
  const date = new Date(`${year}-${month}-${day}`);
  
  return date.getFullYear() === year && date.getMonth() === month - 1 && date.getDate() === day;
}

function isValidUrl(url: any): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}
