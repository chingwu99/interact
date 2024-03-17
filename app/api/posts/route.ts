import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const requestBody = await request.json();

  const { body } = requestBody;

  const post = await prisma.post.create({
    data: {
      body,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(post);
}
