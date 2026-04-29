import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

export async function GET() {
    return new Response('878dc35e02e64ed49f57edd01ea0b48a', {
        headers: {
            'Content-Type': 'text/plain',
        },
    });
}
