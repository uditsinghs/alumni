import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { MessageSquare, ThumbsUp } from "lucide-react";

import { Button } from "@/components/ui/button";
import { getSinglePost } from "@/features/post/postService";

const DetailPost = () => {
  const navigate = useNavigate();
  const { pid } = useParams();
  const [post, setPost] = useState({});

  useEffect(() => {
    const fetchSinglePost = async () => {
      const data = await getSinglePost(pid);
      setPost(data);
    };
    fetchSinglePost();
  }, [pid]);

  return (
    <div className="max-w-2xl mx-auto p-4">
      <Button variant="outline" className="mb-4" onClick={() => navigate(-1)}>
        ⬅ Back
      </Button>

      <Card className="shadow-lg">
        <CardContent className="p-4 space-y-4">
          {post?.image?.url && (
            <img
              src={post?.image.url}
              alt="Post"
              className="w-full h-60 object-contain rounded-lg"
            />
          )}

          <p className="text-lg text-gray-800">{post?.content}</p>

          <div className="flex items-center gap-2 text-gray-600">
            <ThumbsUp size={16} />
            <span>{post?.likes?.length} Likes</span>
            <div className="flex gap-2 items-center">
              <MessageSquare size={16} />
              {post?.comments?.length} Comments
            </div>

            <span className="ml-auto text-xs text-muted-foreground">
              {new Date(post?.createdAt).toLocaleString()}
            </span>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default DetailPost;
