import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "react-router-dom";

const UnverifiedAlumniCard = ({ user, onVerify }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{user?.name}</h3>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>
        <div className="flex gap-2">
          <Link to={`/view/profile/${user?._id}`}>
            <Button variant="outline">View User</Button>
          </Link>
          <Button onClick={() => onVerify(user._id)}>Verify</Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default UnverifiedAlumniCard;
