import { Contact } from "../model/contact.model";
import { ContactRepositoryInterface } from "../model/repositories/interfaces/contact.repository.interface";

export class ContactService {
  private contactRepository: ContactRepositoryInterface;

  constructor(contactRepository: ContactRepositoryInterface) {
    this.contactRepository = contactRepository;
  }

  async createContact(contact: Contact) {
    return await this.contactRepository.createContact(contact);
  }

  async deleteContact(id: number) {
    await this.contactRepository.deleteContact(id);
  }

  async updateContact(id: number, contact: Partial<Contact>) {
    return await this.contactRepository.updateContact(id, contact);
  }

  async findAllContactsByUserId(userId: number) {
    return await this.contactRepository.findAllContactsByUserId(userId);
  }
}