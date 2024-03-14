import { NextRequest, NextResponse } from 'next/server';
import { igClient } from '../clients';

export const POST = async (req: NextRequest) => {
  try {
    const { id, next_cursor } = await req.json();

    const reels = await igClient.getReels(id, next_cursor);

    return NextResponse.json(reels);
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ error: 'API Error' });
  }
};
