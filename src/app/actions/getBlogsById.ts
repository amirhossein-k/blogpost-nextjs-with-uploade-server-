import {Prisma} from "@prisma/client";

interface IParams {
  blogId: string;
}

export default async function getBlogsById(params: IParams) {
  try {
    const {blogId} = params;
    console.log(blogId);

    const blog = await prisma?.blog.findUnique({
      where: {
        id: blogId,
      },
      include: {
        user: true,
      },
    });

    if (!blog) {
      return null;
    }

    return {
      ...blog,
      createdAt: blog.createdAt.toString(),
      user: {
        ...blog.user,
        createdAt: blog.user.createdAt.toString(),
        updatedAt: blog.user.updatedAt.toString(),
        emailVerified: blog.user.emailVerified?.toString() || null,
      },
    };
  } catch (error: any) {
    throw new Error(error);
  }
}
