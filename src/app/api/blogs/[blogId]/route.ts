import getCurrentUser from "@/app/actions/getCurrentUser";
import {Prisma} from "@prisma/client";
import {NextResponse} from "next/server";

interface IParams {
  blogId?: string;
}

export async function DELETE(req: Request, {params}: {params: IParams}) {
  const currentUser = await getCurrentUser();

  if (!currentUser) {
    return NextResponse.error();
  }
  const {blogId} = params;
  console.log(params.blogId);

  if (!blogId || typeof blogId !== "string") {
    throw new Error("invalid id");
  }

  const blog = await prisma?.blog.deleteMany({
    where: {
      id: blogId,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(blog);
}

export async function PUT(req: Request, {params}: {params: IParams}) {
  const currentUser = await getCurrentUser();
  const json = await req.json();

  if (!currentUser) {
    return NextResponse.error();
  }
  const {blogId} = params;
  console.log(params.blogId);

  if (!blogId || typeof blogId !== "string") {
    throw new Error("invalid id");
  }

  const updated = await prisma?.blog.update({
    where: {
      id: blogId,
    },
    data: json,
  });

  return NextResponse.json(updated);
}
