import { NextRequest, NextResponse } from 'next/server';
import { APIResponse } from '../../models/APIResponse';
import { igClient } from '../../clients';

export const GET = async (req: NextRequest) => {
  const origin = req.nextUrl.searchParams.get('origin');
  if (origin) {
    const formattedOrigin = origin.slice(origin.indexOf('/?url=') + 6);
    const mediaResponse = await fetch(formattedOrigin, {
      cache: 'no-cache',
    });

    if (mediaResponse && mediaResponse.ok) {
      return mediaResponse;
    } else {
      console.error(await mediaResponse?.text());
    }
  } else {
    return NextResponse.json(
      new APIResponse('error', 'Internal server error', null)
    );
  }
};
