import { User } from "../models/user.model.js";
import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { uploadImageOnCloudinary } from "../utils/cloudinary.js";
import { Job } from "../models/job.model.js";
import { Event } from "../models/event.model.js";
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, batch, branch, role } = req.body;
    if (!name || !email || !password || !batch || !branch || !role) {
      return res.status(400).json({ message: "Please provide all details", success: false })
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ message: "user already exist. please login", success: false })
    }
    // hash password
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await User.create({
      name, email, password: hashedPassword, batch, branch, role
    })
    return res.status(201).json({ message: "User registered successfully", success: true, newUser })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error
    })

  }
}
export const loginUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "Please provide all details", success: false });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({ message: "User not found. Please register", success: false });
    }

    // If user is alumni and not verified, show a message
    if (user.role === "alumni" && !user.isVarified) {
      return res.status(403).json({ message: "Wait for verification ☹", success: false });
    }

    // Compare password
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordMatch) {
      return res.status(401).json({ message: "Invalid credentials", success: false });
    }

    // Check JWT_SECRET existence
    if (!process.env.JWT_SECRET) {
      throw new Error("JWT_SECRET is not defined in environment variables");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    const isProduction = process.env.NODE_ENV === "production";

    res.cookie("token", token, {
      httpOnly: true,
      maxAge: 2 * 24 * 60 * 60 * 1000,
      secure: isProduction, 
      sameSite: isProduction ? "strict" : "lax",
    });

    return res.status(200).json({
      message: "Login successful",
      success: true,
      user: {
        name: user.name,
        email: user.email,
        role: user.role,
        branch: user.branch,
        batch: user.batch,
        isVarified: user.isVarified,
        _id: user._id,
        bio: user.bio || "",
        currentCompany: user.currentCompany || "",
        location: user.location || "",
        jobTitle: user.jobTitle || "",
      }
    });

  } catch (error) {
    if (process.env.NODE_ENV !== "production") {
      console.error("Login Error:", error);
    }
    return res.status(500).json({
      message: "Internal server error",
      success: false,
      error: process.env.NODE_ENV !== "production" ? error.message : undefined,
    });
  }
};

export const getLoggedinUser = async (req, res) => {
  try {
    const userId = req.user.id;
    if (!userId) {
      return res.status(400).json({ message: "userId not found", success: false });
    }
    const user = await User.findById(userId).select("-password")
    if (!user) {
      return res.status(400).json({ message: "user not found", success: false });
    }
    return res.status(200).json({
      user,
      success: true,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error
    })

  }
}

export const getAllAlumni = async (req, res) => {
  try {
    const alumnies = await User.find({ role: "alumni", isVarified: true }).select("-password");

    if (alumnies.length === 0) {
      return res.status(400).json({ message: "No alumni found", success: false });
    }

    return res.status(200).json({
      alumnies,
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
export const getUnVerifiedAlumnies = async (req, res) => {
  try {
    const unVerifiedAlumnies = await User.find({
      role: "alumni",
      isVarified: false
    }).select("-password").lean();

    if (unVerifiedAlumnies.length === 0) {
      return res.status(404).json({ message: "No unverified alumni found", success: false });
    }

    return res.status(200).json({
      unVerifiedAlumnies,
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




// need to update this controller i will do this later
export const updateProfile = async (req, res) => {
  try {
    const userId = req.user.id;
    const { currentCompany, jobTitle, location, bio } = req.body;
    const profileImage = req.file; // multer file

    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found", success: false });
    }

    // Initialize missing fields
    if (user.currentCompany === undefined) user.currentCompany = "";
    if (user.jobTitle === undefined) user.jobTitle = "";
    if (user.location === undefined) user.location = "";
    if (user.bio === undefined) user.bio = "";
    if (user.profileImage.url === undefined && user.profileImage.public_id === undefined) user.profileImage.url = ""

    if (profileImage) {

      const cloudinaryResponse = await uploadImageOnCloudinary(profileImage.path)
      if (!cloudinaryResponse) {
        return res.status(400).json({ message: "Error uploading image on cloudinary", success: false });
      }

      user.profileImage = {
        url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id
      }
    }
    // Now update
    user.currentCompany = currentCompany || user.currentCompany;
    user.jobTitle = jobTitle || user.jobTitle;
    user.location = location || user.location;
    user.bio = bio || user.bio;


    await user.save();

    return res.status(200).json({
      message: "Profile updated successfully",
      user,
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
export const getSingleAlumni = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {

      return res.status(400).json({ message: "UserId not found", success: false });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found", success: false });
    }
    return res.status(200).json({
      user,
      success: true
    })

  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error
    });
  }
};

export const LogoutUser = async (req, res) => {
  try {
    res.cookie("token", "", {
      httpOnly: true,
      expires: new Date(0),
    }).status(200).json({ message: "Logout successful", success: true });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error,
    });
  }
};



// admin controllers
export const verifiedAlumni = async (req, res) => {
  try {
    const { userId } = req.params;
    if (!userId) {
      return res.status(400).json({ message: "userId not found", success: false })
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "user not found", success: false })
    }
    if (user.role == "alumni") {
      user.isVarified = true;
    }
    await user.save();
    return res.status(200).json({ message: "user verified successfully", success: true })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error
    })

  }
}


export const getallusers = async (req, res) => {
  try {
    const allusers = await User.find().select("-password");

    if (allusers.length === 0) {
      return res.status(400).json({ message: "No user found", success: false });
    }

    return res.status(200).json({
      allusers,
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

export const deleteUser = async (req, res) => {
  try {

    const { userId } = req.params;
    if (!userId) {

      return res.status(400).json({ message: "UserId not found", success: false });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found", success: false });
    }

    await user.deleteOne();
    return res.status(200).json({ message: "user deleted successfully", success: true })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error
    });
  }
};
export const changeUserRole = async (req, res) => {
  try {
    const { userId } = req.params;
    const { role } = req.body;
    console.log(role);

    if (!role) {
      return res.status(400).json({ message: "role not found", success: false });
    }
    if (!userId) {

      return res.status(400).json({ message: "userId not found", success: false });
    }
    const user = await User.findById(userId);
    if (!user) {
      return res.status(400).json({ message: "User not found", success: false });
    }
    user.role = role;
    await user.save();

    return res.status(200).json({ message: "user role change successfully", success: true })
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: error.message || "Internal server error",
      success: false,
      error
    });
  }
};



export const getStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalAlumni = await User.countDocuments({ role: "alumni" });
    const totalJobs = await Job.countDocuments();
    const totalEvents = await Event.countDocuments();

    res.status(200).json({
      success: true,
      stats: {
        totalUsers,
        totalJobs,
        totalEvents,
        totalAlumni
      },
    });
  } catch (error) {
    console.error("Stats error:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch statistics",
    });
  }
};
