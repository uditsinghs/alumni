import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import {
  commentOnPost,
  deleteCommentOnPost,
  likeAndDislikePost,
} from "@/features/post/postService";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import {
  addComment,
  deleteComment,
  likeAndDislike,
} from "@/features/post/postSlice";

const Post = ({ post }) => {
  const disPatch = useDispatch();
  const { image, content, likes, comments, createdAt } = post;
  
   const truncatedContent =content.length > 60 ?   `${content.slice(0,60)}...` : content
  
  const [comment, setNewComment] = useState("");
  const { user } = useSelector((state) => state.auth);

  const handleAddComment = async () => {
    if (!comment.trim()) return;
    const res = await commentOnPost(post._id, comment);
    if (res?.success) {
      toast.message(res?.message);
      disPatch(addComment(res));
    }

    setNewComment("");
  };

  const handleDeleteComment = async (commentId) => {
    const res = await deleteCommentOnPost(post._id, commentId);
    if (res.success) {
      toast.success(res?.message);
      setNewComment("");
      disPatch(deleteComment({ postId: post._id, commentId }));
    }
  };
  const handleLikeAndDislikePost = async () => {
    const res = await likeAndDislikePost(post._id);
    if (res.success) {
      toast.success(res?.message);
      disPatch(likeAndDislike({ userId: user._id, postId: post._id }));
    }
  };
  return (
    <Card className="w-full max-w-xl mx-auto my-4 shadow-lg">
      <CardContent className="p-4">
        {/* Post Image */}
        {image?.url && (
          <img
            src={image?.url}
            alt="Post"
            className="w-full h-40 object-cover rounded-lg mb-4"
          />
        )}
        {/* Content */}
        <p className="text-lg text-gray-800 mb-2">{truncatedContent}</p>

        {/* Post Stats */}
        <div className="flex items-center gap-6 text-gray-600 text-sm mb-4">
          <div className="flex items-center gap-1 ">
            <button
              onClick={handleLikeAndDislikePost}
              className="cursor-pointer"
            >
              {post.likes.includes(user._id) ? (
                <ThumbsUp size={16} className="text-red-700" />
              ) : (
                <ThumbsUp size={16} />
              )}
            </button>
            <span>{likes?.length}</span>
          </div>

          <div className="flex items-center gap-1">
            <Dialog>
              <DialogTrigger className="flex gap-2 text-sm font-medium hover:underline cursor-pointer">
                <MessageSquare size={16} className="" />
                {comments?.length}
              </DialogTrigger>
              <div>
                <Link to={`/detailpost/${post._id}`}>
                  <Button className="cursor-pointer">View</Button>
                </Link>
              </div>

              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Comments</DialogTitle>
                </DialogHeader>

                {/* Comments List - Scrollable */}
                <div className="max-h-[200px] overflow-y-auto pr-2 space-y-3">
                  {comments.map((cmt) => (
                    <div
                      key={cmt._id}
                      className="flex items-start gap-10 p-2 rounded bg-muted/30"
                    >
                      <div>
                        <Avatar className="h-6 w-6">
                          <AvatarImage src={cmt?.user?.profileImage?.url} />
                          <AvatarFallback>
                            {cmt?.user?.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>
                        <p>{cmt?.user?.name}</p>
                      </div>

                      <div>
                        <p className="text-sm">{cmt.comment}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(cmt.createdAt).toLocaleString()}
                        </p>

                        {/* 👇 Only show for the logged-in user's comment */}
                        {user?._id === cmt.user?._id && (
                          <button
                            onClick={() => handleDeleteComment(cmt._id)}
                            className="text-red-500 hover:text-red-700 ml-2"
                            title="Delete comment"
                          >
                            <Trash2 size={16} />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                {/* Add New Comment */}
                <div className="flex gap-2 mt-4">
                  <Input
                    value={comment}
                    onChange={(e) => setNewComment(e.target.value)}
                    placeholder="Write a comment..."
                    className="flex-1"
                  />
                  <Button onClick={handleAddComment}>Post</Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          <span className="ml-auto text-xs text-muted-foreground">
            {new Date(createdAt).toLocaleString()}
          </span>
        </div>
      </CardContent>
    </Card>
  );
};

export default Post;
