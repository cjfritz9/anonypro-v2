import { NextRequest, NextResponse } from 'next/server';
import { igClient } from '../clients';

export const POST = async (req: NextRequest) => {
  try {
    const { id } = await req.json();

    const posts = await igClient.getPosts(id);

    return NextResponse.json(posts);
  } catch (error) {
    console.error({ error });
    return NextResponse.json({error: 'API Error'})
  }
};
