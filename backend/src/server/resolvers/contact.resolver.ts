import { readFileSync } from "fs";
import { ContactService } from "../../services/contact.service";
import { Contact, ContactWithId, PartialContact, Resolvers } from "../graphql/generated/types";
import { BaseResolver } from "./interfaces/base.resolver.interface";
import { GraphQLError } from "graphql";

export class ContactResolver implements BaseResolver {
  resolvers: Resolvers;
  typeDefs: string;
  
  private contactService: ContactService;

  constructor(contactService: ContactService) {
    this.contactService = contactService;

    this.typeDefs = readFileSync('./src/server/graphql/contact.graphql', 'utf-8');
    this.resolvers = {
      Query: {
        findContacts: this.findContacts
      },
      Mutation: {
        createContact: this.createContact,
        deleteContact: this.deleteContact,
        updateContact: this.updateContact
      },
    }
  }

  createContact = async (_: any, { contact }: { contact: Contact }, ctx: any): Promise<ContactWithId> => {
    const userId = this.getUserID(ctx);

    const contactEntity = await this.contactService.createContact({
      name: contact.name,
      lastName: contact.lastName,
      age: contact.age,
      phone: contact.phone,
      userId: userId
    })
    
    return {
      ...contactEntity,
      id: contactEntity.id || -1
    };
  }

  findContacts = async (_: any, __: any, ctx: any): Promise<ContactWithId[]> => {
    const userId = this.getUserID(ctx);

    const contacts = await this.contactService.findAllContactsByUserId(userId);
    
    return contacts.map(contact => {
      return {
        ...contact,
        id: contact.id || -1
      }
    });
  }

  updateContact = async (_: any, { id, contact }: { id: number, contact: PartialContact }, ctx: any): Promise<ContactWithId> => {
    this.getUserID(ctx);
    
    const contactEntity = await this.contactService.updateContact(id, {
      name: contact.name? contact.name : undefined,
      lastName: contact.lastName? contact.lastName : undefined,
      age: contact.age? contact.age : undefined,
      phone: contact.phone? contact.phone : undefined,
    });

    return {
      ...contactEntity,
      id: contactEntity.id || -1
    };;
  }

  deleteContact = async (_: any, { id }: { id: number }, ctx: any): Promise<boolean> => {
    this.getUserID(ctx);

    await this.contactService.deleteContact(id);

    return true;
  }

  private getUserID(ctx: any): number {
    const userId = ctx.userId;

    if (!userId) {
      throw new GraphQLError("Missing authorization header")
    }

    return userId;
  }
}