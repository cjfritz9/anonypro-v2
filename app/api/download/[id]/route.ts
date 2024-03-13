import { NextRequest, NextResponse } from 'next/server';
import { APIResponse } from '../../models/APIResponse';
import { igClient } from '../../clients';

export const GET = async (
  _req: NextRequest,
  { params: { id } }: { params: { id: string } }
) => {
  try {
    const mediaResponse = await igClient.getDownloadableMediaById(id);

    if (mediaResponse && mediaResponse.ok) {
      return mediaResponse;
    } else {
      console.error(await mediaResponse?.text());
    }

    // return NextResponse.json(new APIResponse('ok', null, null));
  } catch (error) {
    console.error(error);
  }
};
