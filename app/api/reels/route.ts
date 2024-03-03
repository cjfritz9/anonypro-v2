import { NextRequest } from "next/server";

export const POST = async (req: NextRequest) => {
  const { username } = await req.json();
  
}