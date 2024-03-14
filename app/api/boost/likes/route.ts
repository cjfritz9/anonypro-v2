import { NextRequest, NextResponse } from 'next/server';
import { APIResponse } from '../../models/APIResponse';
import { rajaClient } from '../../clients';

export const POST = async (req: NextRequest) => {
  const { shortcode } = await req.json();

  if (!shortcode) {
    return NextResponse.json(
      new APIResponse('error', 'No shortcode provided', null)
    );
  }

  try {
    const response = await rajaClient.boostLikes(shortcode);
    return NextResponse.json(response);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      new APIResponse('error', 'Internal server error', null)
    );
  }
};
