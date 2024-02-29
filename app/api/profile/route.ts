import { NextRequest, NextResponse } from 'next/server';
import { igClient } from '../clients';

export const POST = async (req: NextRequest) => {
  try {
    const { username } = await req.json();

    const profile = await igClient.getProfile(username);

    return NextResponse.json(profile);
  } catch (error) {
    console.error({error})
  }
};
