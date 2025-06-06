import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const JobForm = ({ onSubmit, initialValues = {}, isUpdate = false }) => {
  const [position, setPosition] = useState(initialValues.position || "");
  const [company, setCompany] = useState(initialValues.company || "");
  const [location, setLocation] = useState(initialValues.location || "");
  const [description, setDescription] = useState(initialValues.description || "");
  const [applyLink,setApplyLink] = useState(initialValues.applyLink || "")

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = {
      position,
      company,
      location,
      description,
      applyLink
    };
    onSubmit(formData);

    if (!isUpdate) {
      setPosition("");
      setCompany("");
      setLocation("");
      setDescription("");
      setApplyLink("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        placeholder="Job Title"
        className="w-full border p-2 rounded"
        value={position}
        onChange={(e) => setPosition(e.target.value)}
      />
      <input
        type="text"
        placeholder="Company"
        className="w-full border p-2 rounded"
        value={company}
        onChange={(e) => setCompany(e.target.value)}
      />
      <input
        type="text"
        placeholder="Location"
        className="w-full border p-2 rounded"
        value={location}
        onChange={(e) => setLocation(e.target.value)}
      />
      <textarea
        placeholder="Job Description"
        className="w-full border p-2 rounded"
        rows={4}
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      <input
        type="text"
        placeholder="job-Link"
        className="w-full border p-2 rounded"
        value={applyLink}
        onChange={(e) => setApplyLink(e.target.value)}
      />
      <Button type="submit">{isUpdate ? "Update Job" : "Create Job"}</Button>
    </form>
  );
};

export default JobForm;
