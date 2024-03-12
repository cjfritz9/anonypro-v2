import { NextRequest, NextResponse } from 'next/server';
import { APIResponse } from '../../utils';
import { igClient } from '../../clients';

export const GET = async (
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    console.log(id)
    const mediaResponse = await igClient.getDownloadableMediaById(id);

    if (mediaResponse && mediaResponse.ok) {
      return mediaResponse;
    } else {
      console.log(await mediaResponse?.text());
    }

    // return NextResponse.json(new APIResponse('ok', null, null));
  } catch (error) {
    console.error(error);
  }
};
