import { Job } from "../models/job.model.js";


export const createJob = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(404).json({
        message: "User ID not found",
        success: false,
      });
    }

    const { company, position, location, description, applyLink } = req.body;

    if (!company || !position || !location || !description) {
      return res.status(400).json({
        message: "Please provide all required job details",
        success: false,
      });
    }

    const newJob = await Job.create({
      company,
      position,
      location,
      description,
      applyLink,
      postedBy: userId,
    });

    return res.status(201).json({
      success: true,
      message: "Job created successfully",
      job: newJob,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: error.message || "Internal Server Error",
      success: false,
      error,
    });
  }
};

export const getJobs = async (req, res) => {
  try {
    const allJobs = await Job.find({}).populate("postedBy","name email")
    if (allJobs.length === 0) {
      return res.status(400).json({
        message: "No jobs available..!",
        success: false,
      });
    }
    return res.status(200).json({
      success: true,
      allJobs,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message || "Internal server error", success: false, error })

  }
}

export const getJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(404).json({
        message: "jobId not found",
        success: false,
      });
    }
    const job = await Job.findById(jobId).populate("postedBy","name email")
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }

    return res.status(200).json({ success: true, job })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message || "Internal server error", success: false, error })

  }
}

export const updateJob = async (req, res) => {
  try {

    const { jobId } = req.params;

    if (!jobId) {
      return res.status(404).json({
        message: "jobId not found",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    const { company, position, location, description, applyLink } = req.body;

    if (company) job.company = company
    if (position) job.position = position
    if (location) job.location = location
    if (description) job.description = description
    if (applyLink) job.applyLink = applyLink
    await job.save();
    return res.status(200).json({ message: "Job post updated successfully", success: true, job })
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message || "Internal server error", success: false, error })

  }
}

export const deleteJob = async (req, res) => {
  try {
    const { jobId } = req.params;

    if (!jobId) {
      return res.status(404).json({
        message: "jobId not found",
        success: false,
      });
    }
    const job = await Job.findById(jobId);
    if (!job) {
      return res.status(404).json({
        message: "job not found",
        success: false,
      });
    }
    job.deleteOne();
    await job.save();
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: error.message || "Internal server error", success: false, error })

  }
}

