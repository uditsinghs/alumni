import React, { useEffect, useState } from "react";
import PostForm from "./subComponents/PostForm";
import PostCard from "./subComponents/PostCard";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  createPost,
  deletePost,
  updatePost,
  getAllPosts,
} from "@/features/post/postService";
import { getPost } from "@/features/post/postSlice";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogClose,
} from "@/components/ui/dialog";

const ManagePosts = () => {
  const { posts } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [selectedPost, setSelectedPost] = useState(null);

  const fetchPosts = async () => {
    try {
      const res = await getAllPosts();
      dispatch(getPost(res));
    } catch (error) {
      console.error("Error fetching posts", error);
    }
  };

  const handleDelete = async (postId) => {
    const res = await deletePost(postId);
    if (res.success) {
      toast.success(res.message);
      fetchPosts();
    } else {
      toast.error("Failed to delete post.");
    }
  };

  const handleSubmit = async (formData) => {
    try {
      const res = await createPost(formData);
      toast.success(res?.message);
      fetchPosts();
    } catch (error) {
      toast.error("Failed to create post.", error);
    }
  };

  const handleUpdate = (post) => {
    setSelectedPost(post);
    setOpen(true);
  };

  const handleUpdateSubmit = async (formData) => {
    try {
      const res = await updatePost(selectedPost._id, formData);
      if (res.success) {
        toast.success(res.message);
        setOpen(false);
        fetchPosts();
      } else {
        toast.error("Failed to update post.");
      }
    } catch (err) {
      toast.error("Update error",err);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-8">
      <h2 className="text-2xl font-semibold">Create Post</h2>
      <PostForm onSubmit={handleSubmit} />

      <h2 className="text-2xl font-semibold">All Posts</h2>
      <div className="space-y-4">
        {posts.length === 0 ? (
          <p className="text-gray-500">No posts found.</p>
        ) : (
          posts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              onDelete={() => handleDelete(post._id)}
              onUpdate={() => handleUpdate(post)}
            />
          ))
        )}
      </div>

      {/* Dialog for Updating */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Update Post</DialogTitle>
          </DialogHeader>
          <PostForm
            onSubmit={handleUpdateSubmit}
            initialValues={{
              content: selectedPost?.content || "",
              image: selectedPost?.image || "",
            }}
            isUpdate
          />
          <DialogClose asChild>
            <button className="mt-4 text-sm underline text-gray-600">Cancel</button>
          </DialogClose>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ManagePosts;
