import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog extends Document {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  imageUrl: string;
  tags: string[];
  likes: number;
  commentsCount: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
}

const BlogSchema: Schema = new Schema(
  {
    title: {
      type: String,
      required: [true, 'Blog title is required'],
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      trim: true,
      lowercase: true,
    },
    excerpt: {
      type: String,
      required: [true, 'Excerpt is required'],
      trim: true,
    },
    content: {
      type: String,
      required: [true, 'Content is required'],
    },
    author: {
      type: String,
      default: 'Rijan Regmi',
    },
    imageUrl: {
      type: String,
      required: [true, 'Cover image is required'],
    },
    tags: {
      type: [String],
      default: [],
    },
    likes: {
      type: Number,
      default: 0,
    },
    commentsCount: {
      type: Number,
      default: 0,
    },
    published: {
      type: Boolean,
      default: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Blog = mongoose.models.Blog || mongoose.model<IBlog>('Blog', BlogSchema);
