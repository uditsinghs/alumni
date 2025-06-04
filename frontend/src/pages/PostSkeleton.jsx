import React from "react";

const PostSkeleton = () => {
  return (
    <div className="p-4 border rounded-xl shadow animate-pulse space-y-4 mb-4">
      <div className="flex flex-col items-start space-y-2">
        <div className="w-10 h-10 bg-gray-300 rounded-full" />
        <div className="w-1/3 h-4 bg-gray-300 rounded" />
        <div className="w-1/4 h-3 bg-gray-200 rounded" />
      </div>
      <div className="w-full h-4 bg-gray-300 rounded" />
      <div className="w-5/6 h-4 bg-gray-200 rounded" />
      <div className="w-3/4 h-4 bg-gray-300 rounded" />
    </div>
  );
};

export default PostSkeleton;
