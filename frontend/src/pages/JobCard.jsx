import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const JobCard = ({ job }) => {
  console.log(job);

  return (
    <Card className="w-full max-w-xl mx-auto my-4 shadow-md">
      <CardContent className="p-6 space-y-3">
        <h2 className="text-xl font-semibold">{job.position}</h2>
        <p className="text-sm text-muted-foreground">
          {job.company} — {job.location}
        </p>
        <p className="text-sm">{job.description}</p>
        <div className="text-sm">
          <p>
            <strong>Posted By:</strong> {job.postedBy.name} (
            {job.postedBy.email})
          </p>
        </div>
        <div className="flex justify-between items-center">
          <div>
            <a href={job.applyLink} target="_blank" rel="noopener noreferrer">
              <Button className="mt-2">Apply Now</Button>
            </a>
          </div>

          <div>
            <Link to={`/jobdetail/${job._id}`}>
              <Button className="mt-2">View</Button>
            </Link>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default JobCard;
