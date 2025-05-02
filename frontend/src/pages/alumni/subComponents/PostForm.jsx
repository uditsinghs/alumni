import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";

const PostForm = ({ onSubmit, initialValues = {}, isUpdate = false }) => {
  const [content, setContent] = useState("");
  const [image, setImage] = useState(null);

  useEffect(() => {
    if (isUpdate && initialValues) {
      setContent(initialValues.content || "");
    }
  }, [initialValues, isUpdate]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("content", content);
    if (image) formData.append("image", image);
    onSubmit(formData);
    if (!isUpdate) {
      setContent("");
      setImage(null);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Write your post..."
        className="w-full border p-2 rounded"
        rows={4}
      />
      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImage(e.target.files[0])}
        className="w-full"
      />
      <Button type="submit">{isUpdate ? "Update" : "Create"} Post</Button>
    </form>
  );
};

export default PostForm;
