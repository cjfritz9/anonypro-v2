import { NextRequest, NextResponse } from 'next/server';
import { igClient } from '../clients';

export const POST = async (req: NextRequest) => {
  try {
    const { username } = await req.json();

    const profile: any = await igClient.getProfile(username);

    if (profile && profile.id) {
      return NextResponse.json(profile);
    } else {
      return NextResponse.json(null);
    }
  } catch (error) {
    console.error({ error });
  }
};
