import { User } from '../interfaces/userInterface';

export function validateUserData(data: Partial<Omit<User, 'id'>>) {
  if (!data.photo || typeof data.photo !== 'string' || !data.photo.startsWith('http')) {
    throw new Error('Photo is required and must be a valid URL string');
  }

  if (!data.name || typeof data.name !== 'string') {
    throw new Error('Name is required and must be a string');
  }

  if (!data.mail || typeof data.mail !== 'string' || !data.mail.includes('@')) {
    throw new Error('Mail is required and must be a valid email address');
  }

  if (!data.job || typeof data.job !== 'string') {
    throw new Error('Job is required and must be a string');
  }

  if (!data.phone || typeof data.phone !== 'string') {
    throw new Error('Phone is required and must be a string');
  }

  if (!['active', 'inactive'].includes(data.status || '')) {
    throw new Error('Status must be either "active" or "inactive"');
  }

  if (!data.startDate || typeof data.startDate !== 'string') {
    throw new Error('Start date is required and must be a string');
  }

  if (!data.endDate || typeof data.endDate !== 'string') {
    throw new Error('End date is required and must be a string');
  }
}
