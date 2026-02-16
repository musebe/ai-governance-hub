import { NextResponse } from 'next/server';
import { revalidateTag } from 'next/cache';

/** * Main Engine: The Webhook Listener
 * Rule 1.1: See full implementation in GitHub repo
 */
export async function POST(request: Request) {
  try {
    const body = await request.json();

    // Rule 84: Audit log the incoming public_id for tracking
    console.log('--- MediaFlows Webhook Success ---', body.public_id);

    /**
     * In Next.js 16, revalidateTag requires a second profile argument.
     * { expire: 0 } forces the 'governance-list' cache to expire immediately.
     */
    revalidateTag('governance-list', { expire: 0 });

    return NextResponse.json({
      success: true,
      message: 'Cache revalidated',
      asset: body.public_id
    });
  } catch {
    // Rule: Caught error variable removed to satisfy ESLint no-unused-vars
    return NextResponse.json({ error: 'Invalid Webhook Payload' }, { status: 400 });
  }
}