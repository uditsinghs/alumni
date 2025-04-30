import React from "react";
import { Link } from "react-router-dom";

const Message = () => {
  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 max-w-md text-center">
        <h1 className="text-2xl font-semibold text-green-600 mb-4">
          🎉 Registration Successful!
        </h1>
        <p className="text-gray-700">
          Thank you for registering as an <strong>Alumni</strong>.
        </p>
        <p className="text-gray-700 mt-2">
          You can log in <span className="font-medium">30 minutes</span> after
          admin approval.
        </p>
        <div className="mt-6">
          <Link
            to="/login"
            className="inline-block bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition"
          >
            Go to Login
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Message;
