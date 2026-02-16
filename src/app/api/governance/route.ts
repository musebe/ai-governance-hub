import { NextResponse } from "next/server";
import { revalidateTag } from 'next/cache';
import { after } from 'next/server';

/**
 * Public Webhook Endpoint for MediaFlows Agent signals.
 * @param {Request} request - The incoming POST request.
 */
export async function POST(request: Request) {
    try {
        const payload = await request.json();

        // Rule 2.2: Revalidate with specific profile to satisfy Next.js 16 requirements
        revalidateTag('governance-list', 'page');

        // Rule 84: Non-blocking side effect for logging
        after(() => {
            console.info(`[Governance Agent]: Notified UI for ${payload.public_id}`);
        });

        return NextResponse.json({ success: true }, { status: 200 });
    } catch {
        return NextResponse.json({ error: "Invalid payload" }, { status: 400 });
    }
}