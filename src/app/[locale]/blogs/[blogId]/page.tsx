import { SingleBlogComponent } from "@/components/blogs/single-blog/SingleBlogComponent";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "المدونة",
};

const SingleBlogPage: React.FC = (): JSX.Element => {
  return <SingleBlogComponent />;
};

export default SingleBlogPage;
