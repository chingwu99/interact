import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";
import prisma from "@/libs/prismadb";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  //取得 req body
  const requestBody = await request.json();
  const { body } = requestBody;
  //取得 searchParams
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get("postId") as string;

  const comment = await prisma.comment.create({
    data: {
      body,
      userId: currentUser.id,
      postId,
    },
  });

  // NOTIFICATION PART START
  try {
    const post = await prisma.post.findUnique({
      where: {
        id: postId,
      },
    });

    if (post?.userId) {
      await prisma.notification.create({
        data: {
          body: "Someone replied on your interact!",
          userId: post.userId,
        },
      });

      await prisma.user.update({
        where: {
          id: post.userId,
        },
        data: {
          hasNotification: true,
        },
      });
    }
  } catch (error) {
    console.log(error);
  }
  // NOTIFICATION PART END

  return NextResponse.json(comment);
}
