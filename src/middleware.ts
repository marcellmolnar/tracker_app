import { NextResponse, NextRequest } from 'next/server';
export function middleware(req: NextRequest) {
    const ip = req.headers.get('x-forwarded-for') || req.ip || req.socket.remoteAddress;
    const userAgent = req.headers.get('user-agent');
    const referer = req.headers.get('referer');
    const fullUrl = req.nextUrl.href;
    const pathname = req.nextUrl.pathname;
    const method = req.method;
    const host = req.headers.get('host');
    const accept = req.headers.get('accept');
    const lang = req.headers.get('accept-language');
    const currentTime = new Date().toISOString(); // Current time in ISO format
    console.log(`[${currentTime}]: ${method} from IP: ${ip} URL: ${fullUrl} [Path: ${pathname}] [Host: ${host}] [UA: ${userAgent}] [Referer: ${referer}] [Accept: ${accept}] [Lang: ${lang}]`);
  
  // Forward the request to the next middleware or page
  return NextResponse.next();
  }