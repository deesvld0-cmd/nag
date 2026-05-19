import { readFile } from 'fs/promises';
import { NextResponse } from 'next/server';
import { extname, join } from 'path';

const IMAGE_BY_SLUG: Record<string, string> = {
  'bolor-erdene': 'trainer-bolorerdene.jpg',
  amarbat: 'trainer-amarbat.jpg',
  ochirerdene: 'trainer-ochirerdene.jpg',
  uyanga: 'trainer-uyanga.jpg',
  'hitec-real-mass': 'supplements/hitec-real-mass.jpg',
  'hitec-bcaa-811': 'supplements/hitec-bcaa-811.jpg',
  'hitec-whey-c6': 'supplements/hitec-whey-c6.jpg',
  'hitec-glutamine': 'supplements/hitec-glutamine.jpg',
  'hitec-bcaa': 'supplements/hitec-bcaa.jpg',
  'hitec-creatine': 'supplements/hitec-creatine.jpg',
  'hitec-real-isolate-100': 'supplements/hitec-real-isolate-100.jpg',
};

const MIME_BY_EXTENSION: Record<string, string> = {
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.png': 'image/png',
  '.webp': 'image/webp',
};

export async function GET(
  _request: Request,
  { params }: { params: { slug: string } }
) {
  const imageName = IMAGE_BY_SLUG[params.slug];

  if (!imageName) {
    return NextResponse.json({ error: 'Image not found' }, { status: 404 });
  }

  try {
    const publicDir = join(process.cwd(), 'public');
    const imagePath = join(publicDir, imageName);
    const file = await readFile(imagePath);
    const extension = extname(imageName).toLowerCase();
    const contentType = MIME_BY_EXTENSION[extension] ?? 'application/octet-stream';
    
    return new NextResponse(file, {
      headers: {
        'Content-Type': contentType,
        'Cache-Control': 'public, max-age=86400',
      },
    });
  } catch (error) {
    console.error('Failed to read trainer image:', error);
    return NextResponse.json({ error: 'Failed to load image' }, { status: 500 });
  }
}
