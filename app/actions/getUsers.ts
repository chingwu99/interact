import prisma from "@/libs/prismadb";

export default async function getUsers() {
  try {
    const users = await prisma.user.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    if (!users) {
      return [];
    }

    return users;
  } catch (error: any) {
    throw new Error(error);
  }
}
