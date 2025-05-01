import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AllUsersCard = ({ user, onChangeRole, onDelete }) => {
  return (
    <Card className="w-full">
      <CardContent className="p-4 flex justify-between items-center">
        <div>
          <h3 className="font-bold text-lg">{user?.name}</h3>
          <p className="text-sm text-muted-foreground">{user?.email}</p>
        </div>

        <div className="flex items-center gap-3">
          <select
            className="border rounded px-2 py-1"
            value={user?.role}
            onChange={(e) => onChangeRole(e.target.value)} 
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
            <option value="alumni">Alumni</option>
          </select>

          <Button variant="destructive" onClick={() => onDelete(user._id)}>
            Delete
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AllUsersCard;
