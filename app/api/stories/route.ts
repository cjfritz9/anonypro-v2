import { NextRequest, NextResponse } from 'next/server';
import { igClient } from '../clients';
import { cookies } from 'next/headers';
import { ApiError } from 'next/dist/server/api-utils';
import { APIResponse } from '../models/APIResponse';

const cookieName = 'RATE_TRACKING';

interface RateTracking {
  userIp: string;
  lastRequest: string;
}

export const POST = async (req: NextRequest) => {
  try {
    const { username } = await req.json();
    const stories = await igClient.getStories(username);

    return NextResponse.json(new APIResponse('ok', null, stories));
  } catch (error) {
    console.error({ error });
    return NextResponse.json(new APIResponse('error', 'SERVER_FAILURE', null));
  }
};
