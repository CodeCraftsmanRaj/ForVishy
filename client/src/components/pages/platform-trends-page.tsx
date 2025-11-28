"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Clock, Search, TrendingUp, AlertCircle } from "lucide-react";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Defined type to replace 'any'
interface NewsTrend {
  id: string;
  title: string;
  source: string;
  time: string;
  risk: "high" | "medium" | "low" | "critical";
}

// Mock Database of news items
const MOCK_NEWS_DB: NewsTrend[] = [
  { id: "1", title: "Election Commission announces new guidelines for digital campaigning", source: "Official Press", time: "2h ago", risk: "low" },
  { id: "2", title: "Viral video claims voting machines in District 9 are malfunctioning", source: "Social Media / Twitter", time: "45m ago", risk: "high" },
  { id: "3", title: "Deepfake detected: Candidate X appearing to endorse opponent", source: "CivicShield Agent", time: "10m ago", risk: "critical" },
  { id: "4", title: "Voter turnout expected to reach record highs in urban areas", source: "News Daily", time: "3h ago", risk: "low" },
  { id: "5", title: "Bot network spreading false polling dates in swing regions", source: "Network Monitor", time: "15m ago", risk: "high" },
  { id: "6", title: "Fact Check: No, the election has not been postponed", source: "Verified Fact Checker", time: "30m ago", risk: "medium" },
];

export default function PlatformTrendsPage() {
  const [query, setQuery] = useState("");
  // Strictly typed state
  const [articles, setArticles] = useState<NewsTrend[]>(MOCK_NEWS_DB);
  const [loading, setLoading] = useState(false);

  // Simulate real-time incoming news
  useEffect(() => {
    const interval = setInterval(() => {
      const newArticle: NewsTrend = {
        id: Date.now().toString(),
        title: `Live Update: Monitoring system detected new activity in sector ${Math.floor(Math.random() * 100)}`,
        source: "System Alert",
        time: "Just now",
        risk: Math.random() > 0.7 ? "high" : "low"
      };
      
      setArticles(prev => [newArticle, ...prev].slice(0, 10)); // Keep last 10
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSearch = () => {
    setLoading(true);
    setTimeout(() => {
      const filtered = MOCK_NEWS_DB.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase())
      );
      setArticles(filtered);
      setLoading(false);
    }, 500);
  };

  return (
    <div className="p-6 space-y-6 min-h-screen">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Platform Trends</h1>
          <p className="text-muted-foreground">
            Live stream of election-related narratives & signals
          </p>
        </div>

        <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-lg border border-primary/20 animate-pulse">
          <Clock size={16} />
          <span>Live Feed Active</span>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-background/60 backdrop-blur-lg border-border/20">
            <CardHeader className="space-y-4">
              <div className="flex gap-2">
                <Input
                  placeholder="Filter trends (e.g. polling, EVM, fraud)..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="bg-background/50"
                />
                <Button onClick={handleSearch}>
                  <Search size={16} />
                </Button>
              </div>
            </CardHeader>

            <CardContent>
              {loading ? (
                <p className="text-center py-10 text-muted-foreground">Scanning sources...</p>
              ) : (
                <ul className="space-y-3">
                  {articles.map((article) => (
                    <motion.li
                      layout
                      key={article.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      className="flex items-start gap-4 bg-background/40 rounded-xl p-4 border border-border/10 hover:bg-background/60 transition-colors"
                    >
                      <div className={`mt-1 p-2 rounded-full ${
                        article.risk === "high" || article.risk === "critical" ? "bg-red-500/20 text-red-500" : "bg-blue-500/20 text-blue-500"
                      }`}>
                        {article.risk === "high" || article.risk === "critical" ? <AlertCircle size={20} /> : <TrendingUp size={20} />}
                      </div>

                      <div className="flex-1">
                        <div className="flex justify-between items-start">
                          <h4 className="font-semibold text-sm md:text-base pr-4">{article.title}</h4>
                          <span className="text-xs text-muted-foreground whitespace-nowrap">{article.time}</span>
                        </div>
                        <div className="flex items-center gap-2 mt-2">
                          <Badge variant="outline" className="text-xs">{article.source}</Badge>
                          {article.risk === "high" && <Badge variant="destructive" className="text-xs">High Risk</Badge>}
                          {article.risk === "critical" && <Badge variant="destructive" className="text-xs animate-pulse">CRITICAL</Badge>}
                        </div>
                      </div>
                    </motion.li>
                  ))}
                </ul>
              )}
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="bg-background/60 backdrop-blur-lg border-border/20">
            <CardHeader>
              <CardTitle>Narrative Analysis</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>EVM Integrity</span>
                  <span className="text-red-500">High Activity</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-red-500 w-[75%]"></div>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span>Voter Suppression</span>
                  <span className="text-yellow-500">Medium</span>
                </div>
                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                  <div className="h-full bg-yellow-500 w-[45%]"></div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}