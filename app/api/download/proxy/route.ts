import { NextRequest, NextResponse } from 'next/server';

export const GET = async (req: NextRequest) => {
  try {
    const url = req.nextUrl.searchParams.get('url');

    if (url) {
      const originResponse = await fetch(url);

      if (originResponse && originResponse.ok) {
        return originResponse;
      } else {
        console.error(originResponse)
        console.error(await originResponse.text())
      }
    }
  } catch (error) {
    console.error(error);
  }
};
