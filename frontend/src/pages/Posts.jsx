import { getAllPosts } from "@/features/post/postService";
import { getPost } from "@/features/post/postSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";

const Posts = () => {
  const dispatch = useDispatch();
  const { posts } = useSelector((state) => state.post);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchPosts = async () => {
      const data = await getAllPosts();
      console.log("ffee", data);
      dispatch(getPost(data));
    };
    fetchPosts();
  }, [dispatch,user]);

  return (
    <div className="min-h-screen p-4 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-6 text-center">All Posts</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 gap-4">
        {posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
