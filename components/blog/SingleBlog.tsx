"use client";

import Image from "next/image";
import {SafeUser, SafeBlogs} from "../../types";
import {Blog} from "@prisma/client";
import {RiDeleteBin5Line} from "react-icons/ri";
import {BsFillPencilFill} from "react-icons/bs";
import {useRouter} from "next/navigation";
import axios from "axios";

interface BlogProps {
  key?: string | null;
  data: Blog | any;
  currentUser?: SafeUser | null;
}

interface ImageSrc {
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: string;
  fileKey: string;
}

export default function SingleBlog({data, key, currentUser}: BlogProps) {
  const router = useRouter();
  const j = JSON.parse(data.imageSrc);

  const onDelete = () => {
    axios
      .delete(`/api/blogs/${data.id}`)
      .then(() => {
        router.refresh();
      })
      .catch((err) => {
        throw new Error(err);
      })
      .finally(() => {
        router.push("/");
      });
  };

  return (
    <div className="w-[1100px] border-2 p-4">
      <div className="">
        <div className="flex gap-2 justify-center items-center">
          <Image src={j.filePath} width={400} height={300} alt="Blog Image" />

          <div className="w-[530px] flex  flex-col gap-4 leading[1.5]">
            <h1>{data.name}</h1>
            <p>{data.description}</p>
          </div>
        </div>

        {data.userId === currentUser?.id && (
          <div className="">
            <RiDeleteBin5Line
              onClick={onDelete}
              style={{cursor: "pointer", fontSize: 24}}
            />
            <BsFillPencilFill
              onClick={() => router.push(`/blog/${data.id}`)}
              style={{cursor: "pointer", fontSize: 24}}
            />
          </div>
        )}
      </div>
    </div>
  );
}
