import apiRoutes from "@/lib/apiRoutes";
import axiosInstance from "@/lib/axios";
import { useQuery } from "@tanstack/react-query";
import { ApiResponse } from "../_types/Api";

export type BlogPost = {
  id: number;
  title: string;
  slug: string;
  seo_title: string | null;
  seo_description: string | null;
  image: {
    url: string;
  };
  category: {
    id: number;
    name: string;
  };
};

const useGetBlogs = () => {
  return useQuery({
    queryKey: [apiRoutes.posts],
    queryFn: async () => {
      const response = await axiosInstance.get<ApiResponse<BlogPost[]>>(apiRoutes.posts);
      return response.data.data;
    },
    staleTime: Infinity,
    refetchOnMount: false,
  });
};

export default useGetBlogs;
