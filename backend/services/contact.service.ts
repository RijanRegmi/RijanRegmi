import { contactRepository, ContactRepository } from '../repositories/contact.repository';
import { CreateContactDto } from '../dtos/contact.dto';
import { IContact } from '../models/contact.model';
import { NotFoundError } from '../errors';
import { logger } from '../utils/logger';
import { emailService } from './email.service';

export class ContactService {
  constructor(private readonly contactRepo: ContactRepository = contactRepository) {}

  async createContact(data: CreateContactDto): Promise<IContact | any> {
    logger.info(`Processing new contact submission from: ${data.email}`);

    // 1. Dispatch real-time SMTP notification email to your Gmail
    const emailSent = await emailService.sendContactNotification(data);

    // 2. Safely save to MongoDB database (Fail-safe: does not fail user if DB is full)
    let savedContact: IContact | null = null;
    try {
      savedContact = await this.contactRepo.create(data);
    } catch (dbError: any) {
      logger.error('MongoDB database write failed (e.g. cluster quota full), but email notification was handled:', dbError.message);
    }

    // Return success object so the website user gets the "Thank you" confirmation
    return savedContact || {
      _id: 'local_' + Date.now(),
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message,
      emailDispatched: emailSent,
      createdAt: new Date(),
    };
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
