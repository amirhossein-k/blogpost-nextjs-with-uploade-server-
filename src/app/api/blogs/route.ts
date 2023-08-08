import {NextResponse} from "next/server";
import prisma from "../../lib/prismadb";

import getCurrentUser from "@/app/actions/getCurrentUser";

export async function POST(req: Request) {
  const currentUser = await getCurrentUser();

  console.log(currentUser, "currentUser");

  if (!currentUser) {
    return null;
  }

  const body = await req.json();

  const {name, description, imageSrc} = body;

  const jsonImage = JSON.stringify(imageSrc);

  const blog = await prisma.blog.create({
    data: {
      name,
      imageSrc: jsonImage,
      description,
      userId: currentUser.id,
    },
  });

  return NextResponse.json(blog);
}
