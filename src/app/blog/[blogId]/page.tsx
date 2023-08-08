import getBlogsById from "@/app/actions/getBlogsById";
import getCurrentUser from "@/app/actions/getCurrentUser";
import BlogId from "../../../../components/blog/BlogId";

interface IParams {
  blogId: string;
}

export default async function NestedBlog({params}: {params: IParams}) {
  console.log(params, "parrams");
  console.log("object");
  const blog = await getBlogsById(params);

  console.log(blog, "blog");

  const currentUser = await getCurrentUser();

  return (
    <div className="">
      <div className="">
        <BlogId
          name={blog?.name}
          description={blog?.description}
          blogId={blog?.id}
          imageSrc={blog?.imageSrc}
        />
      </div>
    </div>
  );
}
