/* eslint-disable react-hooks/exhaustive-deps */
import { getAllPosts } from "@/features/post/postService";
import { getPost } from "@/features/post/postSlice";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import Post from "./Post";

const Posts = () => {
  const { posts } = useSelector((state) => state.post);

  
  const dispatch = useDispatch();

  const fetchPosts = async () => {
    const data = await getAllPosts();

    dispatch(getPost(data.posts));
  };
  useEffect(() => {
    fetchPosts();
  }, [dispatch]);

  return (
    <div className="min-h-screen p-4 bg-background text-foreground">
      <h1 className="text-2xl font-bold mb-6 text-center">All Posts</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {posts?.posts?.map((post) => (
          <Post key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
};

export default Posts;
