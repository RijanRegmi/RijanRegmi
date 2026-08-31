import mongoose, { Document, Schema } from 'mongoose';

export interface IProject extends Document {
  title: string;
  category: 'web' | 'advertising' | 'branding';
  description?: string;
  imageUrl: string;
  link?: string;
  githubUrl?: string;
  tags: string[];
  featured: boolean;
  order: number;
  createdAt: Date;
  updatedAt: Date;
}

const ProjectSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Project title is required'],
      trim: true,
    },
    category: {
      type: String,
      required: true,
      enum: ['web', 'advertising', 'branding'],
      default: 'web',
    },
    description: {
      type: String,
      trim: true,
    },
    imageUrl: {
      type: String,
      required: [true, 'Project image is required'],
    },
    link: {
      type: String,
      trim: true,
    },
    githubUrl: {
      type: String,
      trim: true,
    },
    tags: {
      type: [String],
      default: [],
    },
    featured: {
      type: Boolean,
      default: false,
    },
    order: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

export const Project = mongoose.models.Project || mongoose.model<IProject>('Project', ProjectSchema);
