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
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { commentOnPost, deleteCommentOnPost } from "@/features/post/postService";
import { updatePostAfterComment } from "@/features/post/postSlice";

const Post = ({ post }) => {
  const { image, content, likes, comments, createdAt } = post;
  const [comment, setComment] = useState("");
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleAddComment = async () => {
    if (!comment.trim()) return;

    const res = await commentOnPost(post._id, comment);
    if (res?.success) {
      dispatch(updatePostAfterComment(res.post));
      toast.success("Comment added");
      setComment("");
    } else {
      toast.error(res?.message || "Failed to add comment");
    }
  };

  const handleDeleteComment = async (commentId) => {
    const res = await deleteCommentOnPost(post._id, commentId);
    if (res?.success) {
      dispatch(updatePostAfterComment(res.post));
      toast.success("Comment deleted");
    } else {
      toast.error(res?.message || "Failed to delete");
    }
  };

  return (
    <Card className="w-full max-w-xl mx-auto my-4 shadow-lg">
      <CardContent className="p-4">
        {image?.url && (
          <img
            src={image.url}
            alt="Post"
            className="w-full h-32 object-contain rounded-lg mb-4"
          />
        )}

        <p className="text-lg text-gray-800 mb-2">{content}</p>

        <div className="flex items-center gap-6 text-gray-600 text-sm mb-4">
          <div className="flex items-center gap-1">
            <ThumbsUp size={16} />
            <span>{likes?.length} Likes</span>
          </div>

          <div className="flex items-center gap-1">
            <Dialog>
              <DialogTrigger className="flex gap-2 text-sm font-medium hover:underline">
                <MessageSquare size={16} />
                {comments?.length} Comments
              </DialogTrigger>

              <DialogContent className="sm:max-w-[500px]">
                <DialogHeader>
                  <DialogTitle>Comments</DialogTitle>
                </DialogHeader>

                <div className="max-h-[200px] overflow-y-auto pr-2 space-y-3">
                  {comments.map((cmt) => (
                    <div
                      key={cmt._id}
                      className="flex items-start gap-2 p-2 rounded bg-muted/30 relative"
                    >
                      <Avatar className="h-8 w-8">
                        {cmt.user?.avatar?.url ? (
                          <AvatarImage src={cmt.user.avatar.url} />
                        ) : (
                          <AvatarFallback>
                            {cmt.user?.name?.charAt(0)?.toUpperCase() || "U"}
                          </AvatarFallback>
                        )}
                      </Avatar>

                      <div>
                        <p className="text-sm font-medium">{cmt.user?.name || "User"}</p>
                        <p className="text-sm">{cmt.comment}</p>
                        <p className="text-xs text-muted-foreground">
                          {new Date(cmt.createdAt).toLocaleString()}
                        </p>
                      </div>

                      {user._id === cmt.user?._id && (
                        <button
                          onClick={() => handleDeleteComment(cmt._id)}
                          className="absolute top-2 right-2 text-destructive hover:text-red-600"
                        >
                          <Trash2 size={16} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>

                <div className="flex gap-2 mt-4">
                  <Input
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
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
