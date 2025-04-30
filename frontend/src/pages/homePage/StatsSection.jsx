import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, CalendarCheck, Activity } from "lucide-react";

const stats = [
  {
    title: "Total Users",
    value: "1,240",
    icon: <Users className="text-blue-600" size={28} />,
  },
  {
    title: "Total Posts",
    value: "980",
    icon: <FileText className="text-green-600" size={28} />,
  },
  {
    title: "Events",
    value: "12",
    icon: <CalendarCheck className="text-yellow-500" size={28} />,
  },
  {
    title: "Active Users",
    value: "768",
    icon: <Activity className="text-purple-600" size={28} />,
  },
];

const StatsSection = () => {
  return (
    <div className="p-6 bg-background text-foreground">
      <h2 className="text-2xl font-bold text-center mb-6">Quick Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-md">
            <CardContent className="p-4 flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.title}</p>
                <p className="text-xl font-bold">{stat.value}</p>
              </div>
              {stat.icon}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default StatsSection;
