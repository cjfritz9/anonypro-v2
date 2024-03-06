import { NextRequest, NextResponse } from 'next/server';
import { igClient } from '../clients';

export const POST = async (req: NextRequest) => {
  try {
    const { username } = await req.json();

    const highlights = await igClient.getHighlights(username);

    return NextResponse.json(highlights);
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ error: 'API Error' });
  }
};
