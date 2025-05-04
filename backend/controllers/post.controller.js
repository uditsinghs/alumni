import { Post } from "../models/post.model.js";
import { uploadImageOnCloudinary } from "../utils/cloudinary.js";

export const createPost = async (req, res) => {
  try {
    const user = req.user.id;
    const { content } = req.body;
    const image = req.file;

    if (!content) {
      return res.status(400).json({ message: "Please write some content for the post", success: false });
    }

    const newPostData = {
      content,
      createdBy: user,
    };

    if (image) {
      const cloudinaryResponse = await uploadImageOnCloudinary(image.path);

      newPostData.image = {
        url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      };
    }

    const newPost = await Post.create(newPostData);

    return res.status(201).json({
      message: "Post created successfully",
      post: newPost,
      success: true,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error
    });
  }
};
export const deletepost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(404).json({ message: "postId not found", success: false })
    }

    await Post.findByIdAndDelete(postId)
    return res.status(200).json({ message: "Post deleted successfully", success: true })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error
    });
  }
};

export const editPost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(404).json({ message: "postId not found", success: false })
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "post not found", success: false })
    }
    const { content } = req.body;
    const image = req.file;

    if (content) {
      post.content = content
    }

    if (image) {
      const cloudinaryResponse = await uploadImageOnCloudinary(image.path);
      post.image.url = cloudinaryResponse.secure_url
      post.image.public_id = cloudinaryResponse.public_id
    }
    await post.save();
    return res.status(200).json({ message: "Post updated successfully", success: true })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error
    });
  }
};


export const getPosts = async (req, res) => {
  try {
    const allPosts = await Post.find({}).populate("comments.user", "name profileImage")
    if (allPosts.length === 0) {
      return res.status(400).json({ message: "post not found", success: false })
    }
    return res.status(200).json({ allPosts, success: true })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error
    });
  }
};
export const getAlumniPosts = async (req, res) => {
  try {
    const user = req.user.id;
    const allPosts = await Post.find({ createdBy: user })
    if (allPosts.length === 0) {
      return res.status(400).json({ message: "post not found", success: false })
    }
    return res.status(200).json({ allPosts, success: true })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error
    });
  }
};


export const getSinglePost = async (req, res) => {
  try {
    const { postId } = req.params;
    if (!postId) {
      return res.status(404).json({ message: "postId not found", success: false })
    }
    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "post not found", success: false })
    }
    return res.status(200).json({ post, success: true })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error
    });
  }
};



export const likeAndDislikePost = async (req, res) => {
  try {
    const userId = req.user.id;
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required", success: false });
    }

    const post = await Post.findById(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    const isLiked = post.likes.includes(userId);

    if (isLiked) {
      // Dislike (remove userId from likes array)
      await Post.findByIdAndUpdate(postId, { $pull: { likes: userId } });
      return res.status(200).json({ message: "Post disliked successfully", success: true });
    } else {
      // Like (add userId to likes array)
      await Post.findByIdAndUpdate(postId, { $push: { likes: userId } });
      return res.status(200).json({ message: "Post liked successfully", success: true });
    }

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error,
    });
  }
};


export const commentPost = async (req, res) => {
  try {
    const { comment } = req.body;
    const userId = req.user.id;
    const { postId } = req.params;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    const commentObj = {
      comment,
      user: userId,
    };

    post.comments.push(commentObj);
    await post.save();
    await post.populate("comments.user", "name profileImage"); // Populate after push

    res.status(200).json({ success: true, message: "Comment posted", post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};




export const deleteComment = async (req, res) => {
  try {
    const { postId, commentId } = req.params;
    const userId = req.user.id;

    const post = await Post.findById(postId);
    if (!post) return res.status(404).json({ success: false, message: "Post not found" });

    const comment = post.comments.id(commentId);
    if (!comment) return res.status(404).json({ success: false, message: "Comment not found" });

    if (comment.user.toString() !== userId) {
      return res.status(403).json({ success: false, message: "Unauthorized" });
    }

    post.comments.pull(commentId);

    await post.save();
    await post.populate("comments.user", "name profileImage");

    res.status(200).json({ success: true, message: "Comment deleted", post });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};






export const getAllComment = async (req, res) => {
  try {
    const { postId } = req.params;

    const post = await Post.findById(postId)
      .populate("comments.user", "name email")
      .select("comments");

    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    if (post.comments.length === 0) {
      return res.status(200).json({ message: "No comments found on this post", success: true, comments: [] });
    }

    return res.status(200).json({
      message: "Comments fetched successfully",
      success: true,
      comments: post.comments,
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error,
    });
  }
};

export const getLikesCount = async (req, res) => {
  try {
    const { postId } = req.params;

    if (!postId) {
      return res.status(400).json({ message: "Post ID is required", success: false });
    }

    const post = await Post.findById(postId).select("likes");

    if (!post) {
      return res.status(404).json({ message: "Post not found", success: false });
    }

    const likesCount = post.likes.length;

    return res.status(200).json({
      likesCount,
      success: true,
      message: "Likes count fetched successfully",
    });

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error,
    });
  }
};


