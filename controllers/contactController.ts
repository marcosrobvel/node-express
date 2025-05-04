import { Request, Response } from 'express';
import { Contact } from '../interfaces/contactInterface';
import { ContactService } from '../services/contactService';

const contactService = new ContactService();

export const getContacts = async (_req: Request, res: Response) => {
  try {
    const contacts: Contact[] = await contactService.getAllContacts();
    res.status(200).json(contacts);
  } catch (error) {
    console.error('Error en getContacts:', error);
    res.status(500).json({
      message: "Error interno al obtener los contactos",
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

export const getContactById = async (req: Request, res: Response) => {
  const contactId = req.params.id;

  if (!contactId) {
    return res.status(400).json({ message: "ID de contacto no proporcionado" });
  }

  try {
    const contact: Contact | null = await contactService.getContactById(Number(contactId));
    if (contact) {
      return res.status(200).json(contact);
    } else {
      return res.status(404).json({ message: "Contacto no encontrado" });
    }
  } catch (error) {
    console.error(`Error en getContactById para ID ${contactId}:`, error);
    return res.status(500).json({
      message: "Error interno al obtener el contacto",
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

export const createContact = async (req: Request, res: Response) => {
  const contactData: Partial<Contact> = req.body;

  try {
    const newContact: Contact = await contactService.createContact(contactData as Omit<Contact, 'id'>);
    return res.status(201).json(newContact);
  } catch (error: any) {
    console.error('Error en createContact:', error);

    return res.status(400).json({
      message: error.message || "Error al crear el contacto",
      error: process.env.NODE_ENV === 'development' ? error : undefined
    });
  }
};

export const updateContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  const contactData = req.body;

  try {
    const updatedContact = await contactService.updateContact(Number(id), contactData);
    return res.status(200).json(updatedContact);
  } catch (error: any) {
    if (error.message === 'Contact not found') {
      return res.status(404).json({ message: 'Contacto no encontrado' });
    } else {
      return res.status(500).json({ message: 'Error interno al actualizar el contacto' });
    }
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const deletedContact = await contactService.deleteContact(Number(id));
    res.status(200).json(deletedContact);
  } catch (error: any) {
    if (error.message === 'Contact not found') {
      res.status(404).json({ message: 'Contacto no encontrado' });
    } else {
      res.status(500).json({ message: 'Error interno al eliminar el contacto' });
    }
  }
};
