import { NextRequest, NextResponse } from 'next/server';
import { APIResponse } from '../../utils';
import { igClient } from '../../clients';

export const GET = async (
  req: NextRequest,
  { params: { code } }: { params: { code: string } }
) => {
  try {
    const index = req.nextUrl.searchParams.get('index');
    const mediaResponse = await igClient.getDownloadableMediaByShortcode(
      code,
      index && +index ? +index : undefined
    );

    if (mediaResponse && mediaResponse.ok) {
      return mediaResponse;
    }

    return NextResponse.json(new APIResponse('ok', null, null));
  } catch (error) {
    console.error(error);
  }
};
