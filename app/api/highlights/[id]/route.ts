import { NextRequest, NextResponse } from 'next/server';
import { igClient } from '../../clients';

export const GET = async (
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const highlight = await igClient.getHighlightById(id);

    return NextResponse.json(highlight);
  } catch (error) {
    console.error({ error });
    return NextResponse.json({ error: 'API Error' });
  }
};
