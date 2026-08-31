import { Model, Document, FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';

export interface IBaseRepository<T extends Document> {
  create(item: Partial<T>): Promise<T>;
  findById(id: string): Promise<T | null>;
  findOne(filter: FilterQuery<T>): Promise<T | null>;
  find(filter?: FilterQuery<T>, options?: QueryOptions): Promise<T[]>;
  update(id: string, item: UpdateQuery<T>): Promise<T | null>;
  delete(id: string): Promise<T | null>;
  count(filter?: FilterQuery<T>): Promise<number>;
}

export abstract class BaseRepository<T extends Document> implements IBaseRepository<T> {
  protected readonly model: Model<T>;

  constructor(model: Model<T>) {
    this.model = model;
  }

  async create(item: Partial<T>): Promise<T> {
    return this.model.create(item);
  }

  async findById(id: string): Promise<T | null> {
    return this.model.findById(id).exec();
  }

  async findOne(filter: FilterQuery<T>): Promise<T | null> {
    return this.model.findOne(filter).exec();
  }

  async find(filter: FilterQuery<T> = {}, options: QueryOptions = {}): Promise<T[]> {
    return this.model.find(filter, null, options).exec();
  }

  async update(id: string, item: UpdateQuery<T>): Promise<T | null> {
    return this.model.findByIdAndUpdate(id, item, { new: true, runValidators: true }).exec();
  }

  async delete(id: string): Promise<T | null> {
    return this.model.findByIdAndDelete(id).exec();
  }

  async count(filter: FilterQuery<T> = {}): Promise<number> {
    return this.model.countDocuments(filter).exec();
  }
}
