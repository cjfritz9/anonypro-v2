import { NextRequest, NextResponse } from 'next/server';
import { rajaClient } from '../clients';

export const POST = async (req: NextRequest) => {
  return NextResponse.json(rajaClient.test());
};
