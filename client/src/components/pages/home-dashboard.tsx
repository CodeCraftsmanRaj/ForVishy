"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar 
} from "recharts";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  AlertTriangle, Shield, Users, Activity, 
  Cpu, Zap, Radio, Globe, Terminal 
} from "lucide-react";
import HeatmapMap from "../Heatmap";

// --- Mock Data Generators ---
const generateChartData = () => {
  return Array.from({ length: 15 }, (_, i) => ({
    time: `${i + 10}:00`,
    threats: Math.floor(Math.random() * 50) + 20,
    verified: Math.floor(Math.random() * 30) + 10,
  }));
};

export function HomeDashboard() {
  const [data, setData] = useState(generateChartData());
  const [cpuLoad, setCpuLoad] = useState(45);
  const [memoryLoad, setMemoryLoad] = useState(32);
  const [activeNodes, setActiveNodes] = useState(842);
  
  // Real-time simulation effect
  useEffect(() => {
    const interval = setInterval(() => {
      // Shift chart data
      setData(current => {
        const newData = [...current.slice(1)];
        newData.push({
          time: new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }),
          threats: Math.floor(Math.random() * 60) + 15,
          verified: Math.floor(Math.random() * 40) + 10,
        });
        return newData;
      });

      // Update System Stats
      setCpuLoad(prev => Math.min(100, Math.max(10, prev + (Math.random() * 10 - 5))));
      setMemoryLoad(prev => Math.min(100, Math.max(20, prev + (Math.random() * 5 - 2))));
      setActiveNodes(prev => prev + (Math.random() > 0.5 ? 1 : -1));

    }, 2000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-6 p-2">
      {/* 1. HERO STATS ROW - High Tech Look */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        {[
          { label: "Active Threats", val: "CRITICAL", sub: "23 Detected", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-500/10", border: "border-red-500/20" },
          { label: "System Health", val: "OPTIMAL", sub: "99.9% Uptime", icon: Activity, color: "text-green-500", bg: "bg-green-500/10", border: "border-green-500/20" },
          { label: "Agents Online", val: "5/5", sub: "All Systems Go", icon: Cpu, color: "text-blue-500", bg: "bg-blue-500/10", border: "border-blue-500/20" },
          { label: "Global Sources", val: activeNodes.toLocaleString(), sub: "Live Monitoring", icon: Globe, color: "text-purple-500", bg: "bg-purple-500/10", border: "border-purple-500/20" },
        ].map((stat, i) => (
          <motion.div 
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
          >
            <Card className={`bg-background/40 backdrop-blur-xl border ${stat.border} shadow-lg`}>
              <CardContent className="p-6 flex items-center justify-between">
                <div>
                  <p className="text-xs font-mono uppercase text-muted-foreground tracking-wider">{stat.label}</p>
                  <h3 className={`text-2xl font-bold mt-1 ${stat.color} font-mono`}>{stat.val}</h3>
                  <p className="text-xs text-muted-foreground mt-1">{stat.sub}</p>
                </div>
                <div className={`p-3 rounded-xl ${stat.bg} ${stat.color} animate-pulse`}>
                  <stat.icon size={24} />
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* 2. MAIN ANALYTICS GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Interactive Map (Keep existing but wrapped nicely) */}
        <motion.div 
          className="lg:col-span-2"
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
        >
          <Card className="bg-background/40 backdrop-blur-xl border-border/40 shadow-xl h-full flex flex-col">
            <CardHeader className="border-b border-border/10 pb-4">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Globe className="w-5 h-5 text-primary" />
                  <CardTitle>Geospatial Threat Matrix</CardTitle>
                </div>
                <Badge variant="outline" className="animate-pulse border-red-500 text-red-500 bg-red-500/10">LIVE FEED</Badge>
              </div>
            </CardHeader>
            <CardContent className="p-0 flex-1 relative min-h-[400px]">
              <div className="absolute inset-0 p-4">
                <HeatmapMap />
              </div>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right: Real-time System Load & Logs */}
        <div className="space-y-6">
          
          {/* Agent Status */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}>
            <Card className="bg-background/40 backdrop-blur-xl border-border/40">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm uppercase tracking-widest text-muted-foreground flex items-center gap-2">
                  <Zap size={16} /> Agent Load
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                {[
                  { name: "Deepfake Detector", load: cpuLoad, color: "bg-red-500" },
                  { name: "NLP Analysis", load: memoryLoad, color: "bg-blue-500" },
                  { name: "Network Graph", load: cpuLoad - 10, color: "bg-purple-500" },
                ].map((agent, i) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between text-xs font-mono">
                      <span>{agent.name}</span>
                      <span>{agent.load.toFixed(1)}%</span>
                    </div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <motion.div 
                        className={`h-full ${agent.color}`} 
                        initial={{ width: 0 }}
                        animate={{ width: `${agent.load}%` }}
                        transition={{ type: "spring", stiffness: 50 }}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </motion.div>

          {/* Terminal Log */}
          <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.4 }}>
            <Card className="bg-black/80 border-border/20 font-mono text-xs h-[250px] overflow-hidden flex flex-col">
              <CardHeader className="pb-2 bg-white/5 border-b border-white/10">
                <div className="flex items-center gap-2 text-green-400">
                  <Terminal size={14} />
                  <span>System Logs</span>
                </div>
              </CardHeader>
              <CardContent className="p-4 space-y-2 overflow-y-auto flex-1 text-green-500/80">
                <p> <span className="text-blue-400">INFO</span> [10:42:01] Connecting to Vector DB...</p>
                <p> <span className="text-blue-400">INFO</span> [10:42:02] Connection established (42ms)</p>
                <p> <span className="text-yellow-400">WARN</span> [10:42:05] High latency in node IN-MUM-01</p>
                <p> <span className="text-blue-400">INFO</span> [10:42:08] Processing Batch #8922</p>
                <p> <span className="text-red-400">ALRT</span> [10:42:15] Deepfake detected (Conf: 98.2%)</p>
                <p> <span className="text-blue-400">INFO</span> [10:42:18] Auto-scaling agents...</p>
                <motion.p 
                  initial={{ opacity: 0 }} 
                  animate={{ opacity: 1 }} 
                  className="animate-pulse"
                >
                  _
                </motion.p>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>

      {/* 3. TREND CHART ROW */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }} 
        animate={{ opacity: 1, y: 0 }} 
        transition={{ delay: 0.5 }}
      >
        <Card className="bg-background/40 backdrop-blur-xl border-border/40">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <Radio className="w-5 h-5 text-blue-500" />
                Live Narrative Velocity
              </CardTitle>
              <div className="flex gap-2">
                <Badge variant="secondary">Incoming</Badge>
                <Badge variant="secondary">Verified</Badge>
              </div>
            </div>
          </CardHeader>
          <CardContent className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorThreats" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#ef4444" stopOpacity={0}/>
                  </linearGradient>
                  <linearGradient id="colorVerified" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#22c55e" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#22c55e" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                <XAxis dataKey="time" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: '1px solid #333', borderRadius: '8px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area 
                  type="monotone" 
                  dataKey="threats" 
                  stroke="#ef4444" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorThreats)" 
                  animationDuration={1000}
                />
                <Area 
                  type="monotone" 
                  dataKey="verified" 
                  stroke="#22c55e" 
                  strokeWidth={2}
                  fillOpacity={1} 
                  fill="url(#colorVerified)" 
                  animationDuration={1000}
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}