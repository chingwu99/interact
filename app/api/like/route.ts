import prisma from "@/libs/prismadb";
import { NextResponse } from "next/server";
import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { postId } = body;

  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid ID");
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Invalid ID");
  }

  let updatedLikedIds = [...(post.likedIds || [])];

  updatedLikedIds.push(currentUser.id);

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
          body: "Someone liked your interact!",
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

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likedIds: updatedLikedIds,
    },
  });

  return NextResponse.json(updatedPost);
}

export async function DELETE(request: Request) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }

  const body = await request.json();

  const { postId } = body;

  if (!postId || typeof postId !== "string") {
    throw new Error("Invalid ID");
  }

  const post = await prisma.post.findUnique({
    where: {
      id: postId,
    },
  });

  if (!post) {
    throw new Error("Invalid ID");
  }

  let updatedLikedIds = [...(post.likedIds || [])];

  updatedLikedIds = updatedLikedIds.filter(
    (likedId) => likedId !== currentUser?.id
  );

  const updatedPost = await prisma.post.update({
    where: {
      id: postId,
    },
    data: {
      likedIds: updatedLikedIds,
    },
  });

  return NextResponse.json(updatedPost);
}
