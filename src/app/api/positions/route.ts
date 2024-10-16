import { NextRequest, NextResponse } from 'next/server'

import sql from '@/lib/db.ts'

/// Database creation:
/// create table positions (id serial primary key, lng float, lat float, time timestamp);

export async function POST(req: NextRequest) {
    const validateCoordinates = (lng, lat) => {
        const isValidFloat = (value) => {
            const num = parseFloat(value);
            return !isNaN(num) && isFinite(num);
          }
        const lngFloat = parseFloat(lng);
        const latFloat = parseFloat(lat);

        return (
          isValidFloat(lng) && isValidFloat(lat) &&   // Check if they are valid float numbers
          lngFloat >= -180 && lngFloat <= 180 &&      // Longitude range check
          latFloat >= -90 && latFloat <= 90           // Latitude range check
        );
      };

    try {
        const body = await req.json();  // Parse JSON from the request body

        // Access the 'data' field from the incoming request
        const { position } = body;
        const { lng, lat } = position;
        if (!validateCoordinates(lng, lat)) {
            return new NextResponse(JSON.stringify({ message: 'Invalid longitude or latitude values' }), { status: 400 });
        }

        console.log('Received lng, lat:', lng, lat);
        await sql`insert into positions (lat, lng, time) values (${lng}, ${lat}, NOW());`;

        return new NextResponse(JSON.stringify({ message: "Hello from Raspberry pi" }), { status: 200 });
    } catch (error) {
    console.error('Error in POST handler:', error);
        return new NextResponse(JSON.stringify({ error: 'Error processing request' }), { status: 500 });
    }
}

export async function PUT(req: NextRequest) {
    return new NextResponse(JSON.stringify({ message: "Hello from Raspberry pi" }), { status: 200 });
}

export async function GET(req: NextRequest) {
    try {
        const pos = await sql`SELECT * FROM positions ORDER BY time DESC LIMIT 30;`;
        return NextResponse.json( pos );
    } catch (error) {
    console.error('Error in GET handler:', error);
        return new NextResponse(JSON.stringify({ error: 'Error processing request' }), { status: 500 });
    }
}