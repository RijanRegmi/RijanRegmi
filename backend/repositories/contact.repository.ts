import { BaseRepository } from './base.repository';
import { Contact, IContact } from '../models/contact.model';

export class ContactRepository extends BaseRepository<IContact> {
  constructor() {
    super(Contact);
  }

  async markAsRead(id: string): Promise<IContact | null> {
    return this.update(id, { isRead: true });
  }

  async findRecent(limit: number = 10): Promise<IContact[]> {
    return this.find({}, { sort: { createdAt: -1 }, limit });
  }
}

export const contactRepository = new ContactRepository();
