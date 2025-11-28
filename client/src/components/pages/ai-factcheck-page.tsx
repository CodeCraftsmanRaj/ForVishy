"use client";

import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Bot, Send, CheckCircle, XCircle, AlertTriangle, Clock, 
  MessageSquare, Zap, Target, Database
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';

interface FactCheckResult {
  id: string;
  query: string;
  verdict: 'true' | 'false' | 'mixed' | 'unverified';
  confidence: number;
  sources: string[];
  timestamp: string;
  reasoning: string;
}

// Mock knowledge base to simulate AI responses
const mockKnowledgeBase = [
  {
    reasoning: "Cross-referencing with official Election Commission data shows no record of this event. Image analysis suggests GAN-based manipulation.",
    verdict: "false" as const,
    sources: ["Election Commission API", "Reverse Image Search", "Forensic Tool"]
  },
  {
    reasoning: "Statement verified against recent press releases. Context matches official transcripts from the date specified.",
    verdict: "true" as const,
    sources: ["Official Transcript", "News Archive", "Verified Handle"]
  },
  {
    reasoning: "The event occurred, but the numbers cited are exaggerated by approximately 300% compared to police reports.",
    verdict: "mixed" as const,
    sources: ["Local Police Report", "FactCheck.org", "Live Feed Analysis"]
  },
  {
    reasoning: "Not enough data points to verify conclusively. Source domain registered 2 days ago (Suspicious).",
    verdict: "unverified" as const,
    sources: ["Domain Whois", "TrustRank", "Social Graph"]
  }
];

export function AiFactcheckPage() {
  const [query, setQuery] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [history, setHistory] = useState<FactCheckResult[]>([]);
  
  // Ref for auto-scrolling
  const historyRef = useRef<HTMLDivElement>(null);

  const handleFactCheck = async () => {
    if (!query.trim()) return;
    
    setIsChecking(true);
    
    // Simulate AI Agent Processing Delay
    setTimeout(() => {
      // Pick a random response template
      const randomTemplate = mockKnowledgeBase[Math.floor(Math.random() * mockKnowledgeBase.length)];
      
      const newResult: FactCheckResult = {
        id: Date.now().toString(),
        query: query,
        verdict: randomTemplate.verdict,
        confidence: Math.floor(Math.random() * 25) + 75, // Random confidence between 75-99%
        sources: randomTemplate.sources,
        timestamp: new Date().toLocaleTimeString(),
        reasoning: randomTemplate.reasoning
      };
      
      setHistory([newResult, ...history]);
      setQuery('');
      setIsChecking(false);
    }, 1500);
  };

  const getVerdictIcon = (verdict: string) => {
    switch (verdict) {
      case 'true': return <CheckCircle className="w-4 h-4 text-green-500" />;
      case 'false': return <XCircle className="w-4 h-4 text-red-500" />;
      case 'mixed': return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
      case 'unverified': return <Clock className="w-4 h-4 text-gray-500" />;
      default: return <Clock className="w-4 h-4 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-8 py-6">
        <h1 className="text-3xl font-bold text-text-900 dark:text-text-100 mb-2 flex items-center gap-3">
          <Bot className="w-8 h-8 text-primary-600" />
          AI Fact-Check Agent
        </h1>
        <p className="text-text-600 dark:text-text-400">
          Connected to Vector Database • Retrieval Augmented Generation (RAG) Active
        </p>
      </div>

      <div className="px-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column - Input */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Card className="rounded-xl bg-background/60 backdrop-blur-lg shadow-xl border border-border/20">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <MessageSquare className="w-5 h-5 text-primary-500" />
                  Submit Claim for Verification
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <Textarea
                  placeholder="Paste a tweet, headline, or claim here..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  className="min-h-[100px] bg-background/40 border-border/20 resize-none font-medium"
                />
                <Button 
                  onClick={handleFactCheck}
                  disabled={!query.trim() || isChecking}
                  className="w-full bg-primary-600 hover:bg-primary-700 text-white transition-all"
                >
                  {isChecking ? (
                    <>
                      <Zap className="w-4 h-4 mr-2 animate-pulse" />
                      Agent Processing...
                    </>
                  ) : (
                    <>
                      <Send className="w-4 h-4 mr-2" />
                      Verify Claim
                    </>
                  )}
                </Button>
              </CardContent>
            </Card>
          </motion.div>

          {/* Results Feed */}
          <div className="space-y-4" ref={historyRef}>
            {history.length === 0 && (
              <div className="text-center text-text-500 py-10 opacity-50">
                <Bot className="w-12 h-12 mx-auto mb-2" />
                <p>Agent is ready. Submit a claim to start.</p>
              </div>
            )}
            
            {history.map((result, i) => (
              <motion.div 
                key={result.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.1 }}
              >
                <Card className="bg-background/40 border border-border/20 overflow-hidden">
                  <div className={`h-1 w-full ${
                    result.verdict === 'true' ? 'bg-green-500' : 
                    result.verdict === 'false' ? 'bg-red-500' : 'bg-yellow-500'
                  }`} />
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg text-text-800 dark:text-text-200">
                        &quot;{result.query}&quot;
                      </h3>
                      <Badge variant="outline" className="flex items-center gap-1">
                        {getVerdictIcon(result.verdict)}
                        {result.verdict.toUpperCase()}
                      </Badge>
                    </div>
                    
                    <p className="text-sm text-text-600 dark:text-text-400 mb-3 bg-background/30 p-2 rounded">
                      <span className="font-bold text-primary-500">AI Reasoning:</span> {result.reasoning}
                    </p>

                    <div className="flex items-center justify-between text-xs text-text-500">
                      <div className="flex gap-2">
                        {result.sources.map((s, idx) => (
                          <span key={idx} className="bg-background/50 px-2 py-1 rounded border border-border/10">
                            {s}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-2">
                        <Target className="w-3 h-3" />
                        Confidence: {result.confidence}%
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Right Column - Stats */}
        <div className="space-y-6">
          <Card className="bg-background/60 border border-border/20">
            <CardHeader>
              <CardTitle className="text-sm uppercase tracking-wider text-text-500">Knowledge Graph</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-blue-500" />
                    <span className="text-sm">Indexed Claims</span>
                  </div>
                  <span className="font-mono font-bold">142,892</span>
                </div>
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-yellow-500" />
                    <span className="text-sm">Avg Latency</span>
                  </div>
                  <span className="font-mono font-bold">124ms</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default AiFactcheckPage;