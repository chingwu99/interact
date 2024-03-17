import prisma from "@/libs/prismadb";

interface IParams {
  userId?: string | undefined;
}

export default async function getPosts(params: IParams) {
  try {
    const { userId } = params;

    console.log({ userId });

    let posts;

    if (userId && typeof userId === "string") {
      posts = await prisma.post.findMany({
        where: {
          userId,
        },
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    } else {
      posts = await prisma.post.findMany({
        include: {
          user: true,
          comments: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      });
    }

    return posts;
  } catch (error: any) {
    throw new Error(error);
  }
}
