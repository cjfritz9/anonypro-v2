import { NextRequest, NextResponse } from 'next/server';
import { igClient } from '../clients';

export const POST = async (req: NextRequest) => {
  try {
    const { username } = await req.json();

    const stories = await igClient.getStories(username);

    return NextResponse.json(stories);
  } catch (error) {
    console.error({ error });
    return NextResponse.json({error: 'API Error'})
  }
};
