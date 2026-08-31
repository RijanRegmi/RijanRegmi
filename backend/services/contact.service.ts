import { contactRepository, ContactRepository } from '../repositories/contact.repository';
import { CreateContactDto } from '../dtos/contact.dto';
import { IContact } from '../models/contact.model';
import { NotFoundError } from '../errors';
import { logger } from '../utils/logger';

export class ContactService {
  constructor(private readonly contactRepo: ContactRepository = contactRepository) {}

  async createContact(data: CreateContactDto): Promise<IContact> {
    logger.info(`Processing new contact submission from: ${data.email}`);
    return this.contactRepo.create(data);
  }

  async getAllContacts(): Promise<IContact[]> {
    return this.contactRepo.findRecent();
  }

  async getContactById(id: string): Promise<IContact> {
    const contact = await this.contactRepo.findById(id);
    if (!contact) {
      throw new NotFoundError(`Contact with ID ${id} not found`);
    }
    return contact;
  }

  async markAsRead(id: string): Promise<IContact> {
    const contact = await this.contactRepo.markAsRead(id);
    if (!contact) {
      throw new NotFoundError(`Contact with ID ${id} not found`);
    }
    return contact;
  }
}

export const contactService = new ContactService();
