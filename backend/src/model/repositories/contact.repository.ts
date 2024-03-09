import { PrismaClient } from "../prisma/generated";
import { Contact } from "../contact.model";
import { ContactRepositoryInterface } from "./interfaces/contact.repository.interface";

export class PostgreSQLContactRepository implements ContactRepositoryInterface {
  private client: PrismaClient
  
  constructor(client: PrismaClient) {
    this.client = client;
  }

  async createContact(contact: Contact): Promise<Contact> {
    const contactEntity = await this.client.contact.create({
      data: contact
    });

    return contactEntity;
  }

  async deleteContact(id: number): Promise<void> {
    await this.client.contact.delete({
      where: { id: id }
    });
  }

  async updateContact(id: number, contact: Partial<Contact>): Promise<Contact> {
    const updatedContact = await this.client.contact.update({
      where: { id: id },
      data: contact
    });

    return updatedContact;
  }

  async findAllContacts(): Promise<Contact[]> {
    const contacts = await this.client.contact.findMany();
    return contacts;
  }

  async findAllContactsByUserId(userId: number): Promise<Contact[]> {
    const contacts = await this.client.contact.findMany({
      where: { userId: userId }
    });
    return contacts;
  }
}