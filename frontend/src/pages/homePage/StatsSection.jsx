import React, { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, CalendarCheck, Activity } from "lucide-react";
import { getStats } from "@/features/auth/authService";

const StatsSection = () => {
  const [stat, setStat] = useState(null);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getStats();
      setStat(data.stats);
    };
    fetchStats();
  }, []);

  const stats = [
    {
      title: "Total Users",
      value: stat?.totalUsers ?? "—",
      icon: <Users className="text-blue-600" size={28} />,
    },
    {
      title: "Total Jobs",
      value: stat?.totalJobs ?? "—",
      icon: <FileText className="text-green-600" size={28} />,
    },
    {
      title: "Total Events",
      value: stat?.totalEvents ?? "—",
      icon: <CalendarCheck className="text-yellow-500" size={28} />,
    },
    {
      title: "Total Alumni",
      value: stat?.totalAlumni ?? "—",
      icon: <Activity className="text-purple-600" size={28} />,
    },
  ];

  return (
    <div className="p-6 bg-background text-foreground">
      <h2 className="text-2xl font-bold text-center mb-6">Quick Stats</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {stats.map((stat, index) => (
          <Card key={index} className="shadow-md h-[120px]">
            <CardContent className="p-4 flex items-center justify-between h-full">
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
