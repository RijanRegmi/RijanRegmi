import { Request, Response } from 'express';
import { contactService, ContactService } from '../services/contact.service';
import { ApiResponse } from '../utils/response';
import { asyncHandler } from '../utils/async-handler';

export class ContactController {
  constructor(private readonly contactServ: ContactService = contactService) {}

  submitContact = asyncHandler(async (req: Request, res: Response) => {
    const contact = await this.contactServ.createContact(req.body);
    return ApiResponse.created(res, contact, 'Message received successfully! We will get back to you soon.');
  });

  getAllContacts = asyncHandler(async (_req: Request, res: Response) => {
    const contacts = await this.contactServ.getAllContacts();
    return ApiResponse.success(res, contacts, 'Contacts retrieved successfully');
  });

  getContactById = asyncHandler(async (req: Request, res: Response) => {
    const contact = await this.contactServ.getContactById(req.params.id);
    return ApiResponse.success(res, contact);
  });

  markAsRead = asyncHandler(async (req: Request, res: Response) => {
    const contact = await this.contactServ.markAsRead(req.params.id);
    return ApiResponse.success(res, contact, 'Contact marked as read');
  });
}

export const contactController = new ContactController();
