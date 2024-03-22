import { NextRequest, NextResponse } from 'next/server';
import { APIResponse } from '../../models/APIResponse';
import { rajaClient } from '../../clients';

export const POST = async (req: NextRequest) => {
  const { username } = await req.json();

  if (!username) {
    return NextResponse.json(
      new APIResponse('error', 'No username provided', null)
    );
  }


  try {
    const response = await rajaClient.boostStoryViews(username);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      new APIResponse('error', 'Internal server error', null)
    );
  }
};
