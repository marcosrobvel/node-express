import { Contact } from "../interfaces/contactInterface";

export const validateContactData = (data: Partial<Omit<Contact, "id">>) => {
  if (!data.photo || !data.photo.startsWith("https://")) {
    throw new Error("URL de foto inválida");
  }

  if (!data.customer || typeof data.customer !== "string") {
    throw new Error("El nombre del cliente es requerido");
  }

  if (!data.mail || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.mail)) {
    throw new Error("Correo electrónico inválido");
  }

  if (!data.phone || !/^\d+-\d+-\d+$/.test(data.phone)) {
    throw new Error("Formato de teléfono inválido");
  }

  if (!data.subject) {
    throw new Error("El asunto es requerido");
  }

  if (!data.comment) {
    throw new Error("El comentario es requerido");
  }

  if (data.status !== "" && data.status !== "archived") {
    throw new Error("Estado inválido");
  }
};
