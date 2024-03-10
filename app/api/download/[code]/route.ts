import { NextRequest, NextResponse } from 'next/server';
import { APIResponse } from '../../utils';

export const GET = async (
  _req: NextRequest,
  { params: { code } }: { params: { code: string } }
) => {
  try {
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      new APIResponse('error', 'Internal server error', null)
    );
  }
};
