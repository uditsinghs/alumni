import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const JobCard = ({ job, onDelete, onUpdate }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4 space-y-2">
        <h3 className="text-xl font-bold">{job?.position}</h3>
        <p className="text-sm text-gray-600">{job?.company} – {job?.location}</p>
        <p className="text-gray-700">{job?.description}</p>
        <div className="flex justify-end gap-2 pt-2">
          <Button variant="secondary" onClick={() => onUpdate?.(job)}>Update</Button>
          <Button variant="destructive" onClick={() => onDelete(job?._id)}>Delete</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
