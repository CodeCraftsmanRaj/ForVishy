"use client";
import { motion } from "framer-motion";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Shield, Users, BarChart3, Map, Activity } from "lucide-react";
import HeatmapMap from "../Heatmap";
import { useEffect, useState } from "react";

export function HomeDashboard() {
  // Simulating live data updates
  const [stats, setStats] = useState({
    threats: 23,
    verified: 156,
    sources: 1247,
    coverage: 98
  });

  const [recentLog, setRecentLog] = useState("System initialized monitoring protocols...");

  useEffect(() => {
    // Randomize stats every 3 seconds to show "Live" activity
    const interval = setInterval(() => {
      setStats(prev => ({
        threats: Math.max(10, prev.threats + (Math.random() > 0.6 ? 1 : Math.random() > 0.8 ? -1 : 0)),
        verified: prev.verified + (Math.random() > 0.5 ? 1 : 0),
        sources: prev.sources + (Math.random() > 0.7 ? 2 : 0),
        coverage: 98 + (Math.random() * 0.5 - 0.25)
      }));

      // Simulate console logs from agents
      const logs = [
        "Text Analysis Agent: Scanned batch #8922 - No anomalies.",
        "Deepfake Detector: Processing video stream from source ID_99.",
        "Network Analyzer: New node cluster identified in Region North.",
        "Fact Check Bot: Cross-referencing claim with verified sources...",
        "System: Database sync completed."
      ];
      if (Math.random() > 0.7) {
        setRecentLog(logs[Math.floor(Math.random() * logs.length)]);
      }
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      {/* Top Stats Cards */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {[
          { title: "Active Threats", value: stats.threats, change: "+12%", icon: AlertTriangle, color: "red" },
          { title: "Verified Claims", value: stats.verified, change: "+8%", icon: Shield, color: "green" },
          { title: "Sources Monitored", value: stats.sources.toLocaleString(), change: "+3%", icon: Users, color: "blue" },
          { title: "Platform Coverage", value: `${stats.coverage.toFixed(1)}%`, change: "+1%", icon: BarChart3, color: "purple" },
        ].map((stat, i) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={i}
              transition={{ duration: 0.2 }}
            >
              <Card className="rounded-none bg-background/60 backdrop-blur-lg shadow-lg border-r-white border-b-white hover:shadow-xl transition-all duration-300">
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-text-600 dark:text-text-400 mb-1">
                        {stat.title}
                      </p>
                      <p className="text-3xl font-bold text-text-900 dark:text-text-100 tabular-nums">
                        {stat.value}
                      </p>
                      <div className="flex items-center gap-2">
                        <p className={`text-sm font-medium ${stat.color === "red" ? "text-red-600" : stat.color === "green" ? "text-green-600" : stat.color === "blue" ? "text-blue-600" : "text-purple-600"}`}>
                          {stat.change}
                        </p>
                        {i === 0 && <span className="flex h-2 w-2 relative">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-red-500"></span>
                        </span>}
                      </div>
                    </div>
                    <div className={`p-3 rounded-full ${stat.color === "red" ? "bg-red-100 dark:bg-red-900/20" : stat.color === "green" ? "bg-green-100 dark:bg-green-900/20" : stat.color === "blue" ? "bg-blue-100 dark:bg-blue-900/20" : "bg-purple-100 dark:bg-purple-900/20"}`}>
                      <Icon className={`w-6 h-6 ${stat.color === "red" ? "text-red-600" : stat.color === "green" ? "text-green-600" : stat.color === "blue" ? "text-blue-600" : "text-purple-600"}`} />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mt-6">
        {/* Left Column - 2/3 width */}
        <div className="lg:col-span-2 space-y-6">
          {/* Heatmap Snapshot */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="rounded-none bg-background/60 backdrop-blur-lg shadow-xl border-b-white border-r-white hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-primary-100 dark:bg-primary-900/20">
                    <Map className="w-5 h-5 text-primary-600" />
                  </div>
                  <div>
                    <CardTitle className="text-text-800 text-2xl dark:text-text-200">Misinformation Heatmap</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent >
                <div className="h-80 bg-gradient-to-br from-primary-50 to-accent-50 dark:from-primary-950/50 dark:to-accent-950/50 flex items-center justify-center border border-border/10">
                  <HeatmapMap/>
                </div>
              </CardContent>
            </Card>
          </motion.div>

          {/* Live Agent Logs */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Card className="rounded-none bg-background/60 backdrop-blur-lg shadow-xl border-b-white border-r-white hover:shadow-2xl transition-all duration-300">
              <CardHeader className="pb-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 rounded-lg bg-secondary-100 dark:bg-secondary-900/20">
                    <Activity className="w-5 h-5 text-secondary-600" />
                  </div>
                  <div>
                    <CardTitle className="text-text-800 dark:text-text-200">Live Agent Activity</CardTitle>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-6">
                <div className="h-12 flex items-center bg-black/5 dark:bg-white/5 rounded px-4 font-mono text-sm text-green-600 dark:text-green-400">
                  <span className="mr-2 animate-pulse">➜</span> {recentLog}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* Right Column - 1/3 width */}
        <div className="space-y-6">
          {/* Top Election Hoaxes */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card className="rounded-none bg-background/60 backdrop-blur-lg shadow-xl border-b-white border-r-white hover:shadow-2xl transition-all duration-300">
              <CardHeader>
                <CardTitle className="text-text-800 dark:text-text-200 flex items-center gap-2 text-2xl">
                  <AlertTriangle className="w-7 h-7 text-amber-500" />
                  Live Hoax Tracking
                </CardTitle>
              </CardHeader>
              <CardContent className="pb-10.75">
                <div className="space-y-2.5">
                  {[
                    { claim: "Fake Ballot Boxes in City X", status: "True", color: "green" },
                    { claim: "Candidate Y Withdraws", status: "Unverified", color: "yellow" },
                    { claim: "Foreign Interference Confirmed", status: "False", color: "red" },
                    { claim: "Voting Machines Hacked", status: "True", color: "green" },
                    { claim: "Election Delayed", status: "Unverified", color: "yellow" },
                  ].map((item, i) => (
                    <motion.div 
                      key={i}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 + 0.3 }}
                      className="flex flex-col p-3 bg-background/30 hover:bg-background/50 transition-colors border border-border/10"
                    >
                      <div className="flex items-start justify-between">
                        <p className="text-sm text-text-700 dark:text-text-300 font-medium leading-relaxed w-3/4">
                          {item.claim}
                        </p>
                        <Badge
                          variant={item.color === "green" ? "success" : item.color === "yellow" ? "warning" : "destructive"}
                          className="w-fit text-xs"
                        >
                          {item.status}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </div>
  );
}