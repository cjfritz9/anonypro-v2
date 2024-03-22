import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { resendClient } from '../clients';
import { APIResponse } from '../models/APIResponse';
export const POST = async (req: NextRequest) => {
  try {
    const { name, email, subject, message } = await req.json();

    const response = await resendClient.emails.send({
      from: 'onboarding@resend.dev',
      to: 'dev.cjfritz@gmail.com',
      subject: 'Anonypro.com: New Website Inquiry',
      html: `
      ${subject ? `Subject: <p>${subject}</p>` : ''}
      <p>Message: ${message}</p>
      <p>From: ${name}</p>
      <p>Email: ${email}</p>
      `,
    });

    if (!response || response.error) {
      console.error(response);
      return NextResponse.json(
        new APIResponse(
          'error',
          'Something went wrong with the email client',
          null
        )
      );
    } else {
      return NextResponse.json(new APIResponse('ok', null, response.data));
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      new APIResponse('error', 'Internal Server Error', null)
    );
  }
};
