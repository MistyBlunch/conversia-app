import { Contact } from "../../contact.model"

export interface ContactRepositoryInterface {
  createContact(contact: Contact): Promise<Contact>
  deleteContact(id: number): Promise<void>
  updateContact(id: number, contact: Partial<Contact>): Promise<Contact>
  findAllContacts(): Promise<Contact[]>
  findAllContactsByUserId(userId: number): Promise<Contact[]>
}