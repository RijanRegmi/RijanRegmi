import { NextRequest, NextResponse } from 'next/server';
import { connectDatabase } from '@/backend/database/connection';
import { contactService, projectService, blogService, healthService } from '@/backend/services';
import { CreateContactSchema, CreateProjectSchema, CreateBlogSchema } from '@/backend/dtos';

export const dynamic = 'force-dynamic';

/**
 * Single-project Vercel Serverless Catch-All API Handler
 * Connects all /api/* routes directly to the Layered Architecture Services
 */
async function handleApiRequest(req: NextRequest, { params }: { params: { route?: string[] } }) {
  const routePath = params.route ? params.route.join('/') : '';
  const method = req.method;

  try {
    // Health check endpoint
    if (routePath === 'health') {
      try {
        await connectDatabase();
      } catch (err) {
        // ignore error to let health service report status
      }
      const health = healthService.getHealth();
      return NextResponse.json({
        success: health.status === 'UP',
        statusCode: health.status === 'UP' ? 200 : 503,
        data: health,
      }, { status: health.status === 'UP' ? 200 : 503 });
    }

    // Auto-connect to database for data endpoints
    await connectDatabase();

    // 1. Contact Routes: /api/v1/contact
    if (routePath === 'v1/contact' || routePath === 'contact') {
      if (method === 'POST') {
        const body = await req.json();
        const parsed = CreateContactSchema.parse(body);
        const contact = await contactService.createContact(parsed);
        return NextResponse.json({
          success: true,
          statusCode: 201,
          message: 'Message sent successfully! Thank you for reaching out.',
          data: contact,
        }, { status: 201 });
      }

      if (method === 'GET') {
        const contacts = await contactService.getAllContacts();
        return NextResponse.json({
          success: true,
          statusCode: 200,
          data: contacts,
        });
      }
    }

    // 2. Project Routes: /api/v1/projects or /api/v1/projects/[id]
    if (routePath.startsWith('v1/projects') || routePath.startsWith('projects')) {
      const parts = routePath.split('/');
      const id = parts.length > 2 ? parts[2] : undefined;

      if (method === 'GET') {
        if (id) {
          const project = await projectService.getProjectById(id);
          return NextResponse.json({ success: true, statusCode: 200, data: project });
        }
        const { searchParams } = new URL(req.url);
        const category = searchParams.get('category') || undefined;
        const featured = searchParams.get('featured') === 'true' ? true : undefined;
        const projects = await projectService.getProjects({ category: category as any, featured });
        return NextResponse.json({ success: true, statusCode: 200, data: projects });
      }

      if (method === 'POST') {
        const body = await req.json();
        const parsed = CreateProjectSchema.parse(body);
        const project = await projectService.createProject(parsed);
        return NextResponse.json({ success: true, statusCode: 201, data: project }, { status: 201 });
      }
    }

    // 3. Blog Routes: /api/v1/blogs or /api/v1/blogs/[slugOrId]
    if (routePath.startsWith('v1/blogs') || routePath.startsWith('blogs')) {
      const parts = routePath.split('/');
      const slugOrId = parts.length > 2 ? parts[2] : undefined;

      if (method === 'GET') {
        if (slugOrId) {
          const blog = await blogService.getBlogBySlugOrId(slugOrId);
          return NextResponse.json({ success: true, statusCode: 200, data: blog });
        }
        const blogs = await blogService.getBlogs();
        return NextResponse.json({ success: true, statusCode: 200, data: blogs });
      }

      if (method === 'POST') {
        if (routePath.endsWith('/like') && slugOrId) {
          const blog = await blogService.likeBlog(slugOrId);
          return NextResponse.json({ success: true, statusCode: 200, data: blog });
        }
        const body = await req.json();
        const parsed = CreateBlogSchema.parse(body);
        const blog = await blogService.createBlog(parsed);
        return NextResponse.json({ success: true, statusCode: 201, data: blog }, { status: 201 });
      }
    }

    return NextResponse.json(
      { success: false, statusCode: 404, error: 'NOT_FOUND', message: `Route /api/${routePath} not found` },
      { status: 404 }
    );
  } catch (error: any) {
    const statusCode = error.statusCode || (error.name === 'ZodError' ? 422 : 500);
    return NextResponse.json({
      success: false,
      statusCode,
      message: error.message || 'Internal Server Error',
      errors: error.errors,
    }, { status: statusCode });
  }
}

export async function GET(req: NextRequest, ctx: { params: { route?: string[] } }) {
  return handleApiRequest(req, ctx);
}

export async function POST(req: NextRequest, ctx: { params: { route?: string[] } }) {
  return handleApiRequest(req, ctx);
}

export async function PUT(req: NextRequest, ctx: { params: { route?: string[] } }) {
  return handleApiRequest(req, ctx);
}

export async function PATCH(req: NextRequest, ctx: { params: { route?: string[] } }) {
  return handleApiRequest(req, ctx);
}

export async function DELETE(req: NextRequest, ctx: { params: { route?: string[] } }) {
  return handleApiRequest(req, ctx);
}
