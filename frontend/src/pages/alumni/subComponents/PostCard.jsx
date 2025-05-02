import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const PostCard = ({ post, onDelete, onUpdate }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-2">
        <p className="text-gray-800">{post?.content}</p>

        {post?.image && (
          <img
            src={post.image?.url}
            alt="Post"
            className="w-full h-64 object-cover rounded"
          />
        )}

        <div className="flex justify-end gap-2 pt-4">
          <Button variant="outline" onClick={onUpdate}>
            Update
          </Button>
          <Button variant="destructive" onClick={onDelete}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PostCard;
