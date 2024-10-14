import { NextRequest, NextResponse } from 'next/server'

import sql from '@/lib/db.ts'

export async function POST(req: NextRequest) {
    return new NextResponse(JSON.stringify({ message: "Hello from Raspberry pi" }), { status: 200 });
}

export async function PUT(req: NextRequest) {
    return new NextResponse(JSON.stringify({ message: "Hello from Raspberry pi" }), { status: 200 });
}

export async function GET(req: NextRequest) {
    try {
        const pos = await sql`SELECT * FROM positions LIMIT 30;`;
        return NextResponse.json( pos );
    } catch (error) {
    console.error('Error in POST handler:', error);
        return new NextResponse(JSON.stringify({ error: 'Error processing request' }), { status: 500 });
    }
}