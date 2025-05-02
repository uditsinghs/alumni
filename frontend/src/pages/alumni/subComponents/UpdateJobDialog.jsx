import React, { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import JobForm from "./JobForm";

const UpdateJobDialog = ({ open, onClose, job, onUpdate }) => {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleFormSubmit = async (updatedJobData) => {
    setIsSubmitting(true);
    await onUpdate(job._id, updatedJobData);
    setIsSubmitting(false);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Update Job</DialogTitle>
        </DialogHeader>
        <JobForm
          onSubmit={handleFormSubmit}
          initialValues={job}
          isUpdate
        />
      </DialogContent>
    </Dialog>
  );
};

export default UpdateJobDialog;
