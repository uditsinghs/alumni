import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const AlumniCard = ({ story }) => {
  const { name, batch, photo, currentPosition, storyText } = story;

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg">
      <CardContent className="p-4 space-y-3">
        <div className="flex items-center gap-4">
          <Avatar className="h-14 w-14">
            <AvatarImage src={photo} alt={name} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{name}</p>
            <p className="text-sm text-muted-foreground">{batch} Batch</p>
            <p className="text-sm text-muted-foreground">{currentPosition}</p>
          </div>
        </div>
        <p className="text-sm text-gray-700">{storyText}</p>
      </CardContent>
    </Card>
  );
};

export default AlumniCard;
