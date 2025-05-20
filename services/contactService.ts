import { Contact } from '../interfaces/contactInterface';
import pool from '../database/mongoConnection';

export class ContactService {
  public async getAllContacts(): Promise<Contact[]> {
    const [rows] = await pool.execute(
      'SELECT * FROM contacts'
    );
    return rows as Contact[];
  }

  public async getContactById(id: number): Promise<Contact | null> {
    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM contacts WHERE id = ?',
      [id]
    );
    return Array.isArray(rows) && rows.length > 0 ? (rows[0] as Contact) : null;
  }

  public async createContact(contactData: Omit<Contact, 'id'>): Promise<Contact> {
    const { photo, date, customer, mail, phone, subject, comment, status } = contactData;
    const [result] = await pool.execute(
      'INSERT INTO contacts (photo, date, customer, mail, phone, subject, comment, status) VALUES (?, ?, ?, ?, ?, ?, ?, ?)',
      [photo, date, customer, mail, phone, subject, comment, status]
    );
    return {
      ...contactData,
      id: (result as any).insertId,
    };
  }

  public async updateContact(id: number, contactData: Partial<Omit<Contact, 'id'>>): Promise<Contact | null> {
    const { photo, date, customer, mail, phone, subject, comment, status } = contactData;
    const [result] = await pool.execute(
      'UPDATE contacts SET photo = ?, date = ?, customer = ?, mail = ?, phone = ?, subject = ?, comment = ?, status = ? WHERE id = ?',
      [photo, date, customer, mail, phone, subject, comment, status, id]
    );

    const updateResult = result as import('mysql2').ResultSetHeader;
    if (updateResult.affectedRows === 0) return null;

    const [rows] = await pool.execute<any[]>(
      'SELECT * FROM contacts WHERE id = ?',
      [id]
    );

    return Array.isArray(rows) && rows.length > 0 ? (rows[0] as Contact) : null;
  }

  public async deleteContact(id: number): Promise<Contact | null> {
    const [result] = await pool.execute(
      'DELETE FROM contacts WHERE id = ?',
      [id]
    );

    if ((result as import('mysql2').ResultSetHeader).affectedRows === 0) return null;

    return { id } as Contact;
  }
}




/*import { Contact } from "../interfaces/contactInterface";
import { validateContactData } from "../validators/contactValidator";
import ContactModel from "../schemas/contactSchema";

export class ContactService {
  public async getAllContacts(): Promise<Contact[]> {
    const contacts = await ContactModel.find().lean();
    return contacts.map((contact) => ({
      ...contact,
      id: Number(contact.id),
    }));
  }

  public async getContactById(id: number): Promise<Contact | null> {
    const contact = await ContactModel.findOne({ id }).lean();
    return contact ? { ...contact, id: Number(contact.id) } : null;
  }

  public async createContact(contactData: Omit<Contact, "id">): Promise<Contact> {
    validateContactData(contactData);

    const lastContact = await ContactModel.findOne().sort({ id: -1 }).limit(1);
    const newId = lastContact ? Number(lastContact.id) + 1 : 1;

    const newContact = new ContactModel({ ...contactData, id: newId });
    const savedContact = await newContact.save();

    return {
      ...savedContact.toObject(),
      id: Number(savedContact.id),
    };
  }

  public async updateContact(id: number, contactData: Partial<Omit<Contact, "id">>): Promise<Contact> {
    validateContactData(contactData as Omit<Contact, "id">);

    const updated = await ContactModel.findOneAndUpdate({ id }, contactData, { new: true }).lean();
    if (!updated) throw new Error("Contact not found");

    return { ...updated, id: Number(updated.id) };
  }

  public async deleteContact(id: number): Promise<Contact> {
    const deleted = await ContactModel.findOneAndDelete({ id }).lean();
    if (!deleted) throw new Error("Contact not found");

    return { ...deleted, id: Number(deleted.id) };
  }
}
*/