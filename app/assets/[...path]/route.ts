import { NextRequest, NextResponse } from 'next/server';
import path from 'path';
import fs from 'fs';

const MIME_TYPES: Record<string, string> = {
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.webp': 'image/webp',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.pdf': 'application/pdf',
  '.css': 'text/css',
  '.js': 'application/javascript',
  '.json': 'application/json',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2',
  '.ttf': 'font/ttf',
  '.eot': 'application/vnd.ms-fontobject',
};

export async function GET(
  _req: NextRequest,
  { params }: { params: { path?: string[] } }
) {
  try {
    const fileSubPath = params.path ? params.path.join('/') : '';
    // Resolve directly to the main root assets directory
    const resolvedPath = path.join(process.cwd(), 'assets', fileSubPath);

    // Prevent path traversal
    const assetsRoot = path.resolve(process.cwd(), 'assets');
    if (!path.resolve(resolvedPath).startsWith(assetsRoot)) {
      return new NextResponse('Forbidden', { status: 403 });
    }

    if (!fs.existsSync(resolvedPath)) {
      return new NextResponse('File Not Found', { status: 404 });
    }

    const stat = fs.statSync(resolvedPath);
    if (!stat.isFile()) {
      return new NextResponse('Not a file', { status: 400 });
    }

    const ext = path.extname(resolvedPath).toLowerCase();
    const contentType = MIME_TYPES[ext] || 'application/octet-stream';
    const fileBuffer = fs.readFileSync(resolvedPath);

    return new NextResponse(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': contentType,
        'Content-Length': stat.size.toString(),
        'Cache-Control': 'public, max-age=31536000, immutable',
      },
    });
  } catch (error: any) {
    return new NextResponse('Internal Server Error', { status: 500 });
  }
}
