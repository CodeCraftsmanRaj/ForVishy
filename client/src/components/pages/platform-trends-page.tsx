"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { 
  PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip, Legend 
} from "recharts";
import { Clock, Search, TrendingUp, AlertCircle, MessageCircle, Share2, Eye } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface NewsTrend {
  id: string;
  title: string;
  source: string;
  time: string;
  risk: "high" | "medium" | "low" | "critical";
  engagement: number;
}

const MOCK_NEWS_DB: NewsTrend[] = [
  { id: "1", title: "Election Commission announces new guidelines", source: "Official Press", time: "2h ago", risk: "low", engagement: 1540 },
  { id: "2", title: "Viral video claims voting machines malfunction", source: "Twitter / X", time: "45m ago", risk: "high", engagement: 45200 },
  { id: "3", title: "Deepfake: Candidate X appearing to endorse opponent", source: "CivicShield AI", time: "10m ago", risk: "critical", engagement: 1200 },
  { id: "4", title: "Voter turnout expected to reach record highs", source: "News Daily", time: "3h ago", risk: "low", engagement: 8900 },
  { id: "5", title: "Bot network spreading false polling dates", source: "Network Monitor", time: "15m ago", risk: "high", engagement: 23000 },
];

const PIE_DATA = [
  { name: 'EVM Integrity', value: 400, color: '#ef4444' }, // Red
  { name: 'Voter Fraud', value: 300, color: '#f97316' },   // Orange
  { name: 'Political Ads', value: 300, color: '#3b82f6' }, // Blue
  { name: 'Policy', value: 200, color: '#22c55e' },       // Green
];

export default function PlatformTrendsPage() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState<NewsTrend[]>(MOCK_NEWS_DB);
  
  // Real-time chart data simulation
  const [chartData, setChartData] = useState(PIE_DATA);

  useEffect(() => {
    const interval = setInterval(() => {
      // Rotate chart data slightly to make it look live
      setChartData(prev => prev.map(item => ({
        ...item,
        value: item.value + Math.floor(Math.random() * 20 - 5)
      })));

      // Add new article rarely
      if (Math.random() > 0.8) {
        const newArticle: NewsTrend = {
          id: Date.now().toString(),
          title: `ALERT: New narrative spike detected in Sector ${Math.floor(Math.random() * 5)}`,
          source: "AI Monitor",
          time: "Just now",
          risk: Math.random() > 0.5 ? "high" : "medium",
          engagement: Math.floor(Math.random() * 5000)
        };
        setArticles(prev => [newArticle, ...prev].slice(0, 10));
      }
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="p-2 space-y-6 min-h-screen">
      
      {/* Header Area */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-purple-500">Platform Trends</h1>
          <p className="text-muted-foreground">Real-time narrative tracking across social graph.</p>
        </div>
        <div className="flex gap-2">
           <Input 
             placeholder="Search narratives..." 
             className="w-full md:w-64 bg-background/50 backdrop-blur-sm"
             value={query}
             onChange={(e) => setQuery(e.target.value)}
           />
           <Button variant="outline"><Search size={18} /></Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left: Feed */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-background/40 backdrop-blur-xl border-border/40">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="text-blue-500" /> Live Feed
              </CardTitle>
              <CardDescription>Streaming election signals from 12+ platforms</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {articles.map((article, i) => (
                  <motion.div
                    layout
                    key={article.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 }}
                    className="group flex flex-col sm:flex-row gap-4 p-4 rounded-xl border border-border/20 bg-background/30 hover:bg-background/50 transition-all hover:border-primary/20 hover:shadow-md"
                  >
                    <div className={`shrink-0 mt-1 p-3 rounded-full h-fit w-fit ${
                      article.risk === 'critical' ? 'bg-red-500/20 text-red-500 animate-pulse' : 
                      article.risk === 'high' ? 'bg-orange-500/20 text-orange-500' : 'bg-blue-500/20 text-blue-500'
                    }`}>
                      {article.risk === 'critical' || article.risk === 'high' ? <AlertCircle size={24} /> : <MessageCircle size={24} />}
                    </div>
                    
                    <div className="flex-1 space-y-2">
                      <div className="flex justify-between items-start">
                        <h3 className="font-semibold text-base leading-tight group-hover:text-primary transition-colors">{article.title}</h3>
                        <span className="text-xs text-muted-foreground whitespace-nowrap flex items-center gap-1">
                          <Clock size={12} /> {article.time}
                        </span>
                      </div>
                      
                      <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <Badge variant="outline" className="bg-background/50">{article.source}</Badge>
                        <span className="flex items-center gap-1"><Eye size={12} /> {article.engagement.toLocaleString()}</span>
                        <span className="flex items-center gap-1"><Share2 size={12} /> {(article.engagement * 0.4).toFixed(0)}</span>
                        
                        {article.risk === 'critical' && <Badge variant="destructive">CRITICAL</Badge>}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Right: Analytics */}
        <div className="space-y-6">
          
          {/* Narrative Distribution Chart */}
          <Card className="bg-background/40 backdrop-blur-xl border-border/40">
            <CardHeader>
              <CardTitle>Topic Distribution</CardTitle>
              <CardDescription>Current narrative dominance</CardDescription>
            </CardHeader>
            <CardContent className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={chartData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {chartData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} stroke="none" />
                    ))}
                  </Pie>
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#1a1a1a', border: 'none', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Legend verticalAlign="bottom" height={36}/>
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          {/* Quick Stats */}
          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-blue-500/10 border-blue-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-blue-500">84%</div>
                <div className="text-xs text-blue-400/80">Sentiment Negative</div>
              </CardContent>
            </Card>
            <Card className="bg-purple-500/10 border-purple-500/20">
              <CardContent className="p-4 text-center">
                <div className="text-2xl font-bold text-purple-500">12k</div>
                <div className="text-xs text-purple-400/80">Bot Accounts</div>
              </CardContent>
            </Card>
          </div>

        </div>
      </div>
    </div>
  );
}