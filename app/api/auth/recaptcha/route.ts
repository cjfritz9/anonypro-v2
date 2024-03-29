import { NextRequest, NextResponse } from 'next/server';

export const POST = async (req: NextRequest) => {
  const token = await req.json();

  if (!token) {
    return NextResponse.json('No Recaptcha token provided');
  }

  const response = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`,
    {
      method: 'POST',
    }
  );

  const result = await response.json();

  if (result && result.score && result.score < 0.7) {
    console.info({ result });
  }

  return NextResponse.json(result);
};
