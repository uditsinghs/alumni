import React, { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, ThumbsUp } from "lucide-react";
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

const Post = ({ post }) => {
  const { image, content, likes, comments, createdAt } = post;
  const [newComment, setNewComment] = useState("");
  const [allComments, setAllComments] = useState(comments);

  const handleAddComment = () => {
    if (!newComment.trim()) return;

    const newCmt = {
      _id: Date.now().toString(),
      user: "currentUser",
      comment: newComment,
      createdAt: new Date().toISOString(),
    };

    setAllComments([newCmt, ...allComments]);
    setNewComment("");
  };

  return (
    <Link to={`/detailpost/${post._id}`}>
      <Card className="w-full max-w-xl mx-auto my-4 shadow-lg">
        <CardContent className="p-4">
          {/* Post Image */}
          {image?.url && (
            <img
              src={image.url}
              alt="Post"
              className="w-full h-32 object-contain rounded-lg mb-4"
            />
          )}

          {/* Content */}
          <p className="text-lg text-gray-800 mb-2">{content}</p>

          {/* Post Stats */}
          <div className="flex items-center gap-6 text-gray-600 text-sm mb-4">
            <div className="flex items-center gap-1">
              <ThumbsUp size={16} />
              <span>{likes?.length} Likes</span>
            </div>

            <div className="flex items-center gap-1">
              <Dialog>
                <DialogTrigger className="flex gap-2 text-sm font-medium hover:underline">
                  <MessageSquare size={16} />
                  {allComments?.length} Comments
                </DialogTrigger>

                <DialogContent className="sm:max-w-[500px]">
                  <DialogHeader>
                    <DialogTitle>Comments</DialogTitle>
                  </DialogHeader>

                  {/* Comments List - Scrollable */}
                  <div className="max-h-[200px] overflow-y-auto pr-2 space-y-3">
                    {allComments.map((cmt) => (
                      <div
                        key={cmt._id}
                        className="flex items-start gap-2 p-2 rounded bg-muted/30"
                      >
                        <Avatar className="h-6 w-6">
                          <AvatarFallback>U</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="text-sm">{cmt.comment}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(cmt.createdAt).toLocaleString()}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Add New Comment */}
                  <div className="flex gap-2 mt-4">
                    <Input
                      value={newComment}
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
    </Link>
  );
};

export default Post;
