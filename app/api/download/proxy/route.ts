import { NextRequest, NextResponse } from 'next/server';
import { APIResponse } from '../../utils';
import { igClient } from '../../clients';

export const GET = async (req: NextRequest) => {
  try {
    const url = req.nextUrl.searchParams.get('url');

    if (url) {
      const originResponse = await fetch(url);

      if (originResponse && originResponse.ok) {
        return originResponse;
      }
    }
  } catch (error) {
    console.error(error);
  }
};
