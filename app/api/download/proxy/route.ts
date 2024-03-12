import { NextRequest, NextResponse } from 'next/server';
import { APIResponse } from '../../utils';
import { igClient } from '../../clients';

export const GET = async (req: NextRequest) => {
  try {
    const origin = req.nextUrl.searchParams.get('origin');
    if (origin) {
      const formattedOrigin = origin.slice(origin.indexOf('/?url=') + 6);
      const mediaResponse = await fetch(formattedOrigin, {
        cache: 'no-cache',
        headers: {
          'Content-Type': 'application/octet-stream',
        },
      });

      if (mediaResponse && mediaResponse.ok) {
        return mediaResponse;
      } else {
        console.log(await mediaResponse?.text());
      }
    }

    return NextResponse.json(new APIResponse('ok', null, null));
  } catch (error) {
    return NextResponse.json(
      new APIResponse('error', 'Internal server error', null)
    );
    console.error(error);
  }
};
