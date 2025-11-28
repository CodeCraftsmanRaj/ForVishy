import React, { useState, ChangeEvent, useEffect } from "react";
import { Upload, Shield, AlertTriangle, CheckCircle, Eye, Camera, FileVideo, Download, RefreshCw, Filter, Scan, Binary } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

// Define interfaces for type safety
interface DetectionDetails {
  faceSwap?: number;
  lipSync?: number;
  audioVisual?: number;
  temporal?: number;
  faceAnalysis?: number;
  metadata?: number;
  pixelAnalysis?: number;
}

interface DetectionResult {
  id: number;
  filename: string;
  uploadTime: string;
  status: "authentic" | "suspicious" | "deepfake";
  confidence: number;
  type: "video" | "image";
  details: DetectionDetails;
  flags: string[];
}

const DeepfakePage = () => {
  const [analyzing, setAnalyzing] = useState(false);
  const [results, setResults] = useState<DetectionResult | null>(null);
  const [scanLinePosition, setScanLinePosition] = useState(0);

  // Scanline animation effect
  useEffect(() => {
    if (analyzing) {
      const interval = setInterval(() => {
        setScanLinePosition(prev => (prev + 5) % 100);
      }, 50);
      return () => clearInterval(interval);
    }
  }, [analyzing]);

  const generateRandomAnalysis = (filename: string): DetectionResult => {
    const isVideo = filename.match(/\.(mp4|avi|mov)$/i);
    const rand = Math.random();
    
    let status: "authentic" | "suspicious" | "deepfake";
    if (rand > 0.6) status = "deepfake";
    else if (rand > 0.3) status = "suspicious";
    else status = "authentic";

    const confidence = status === "authentic" 
      ? 85 + Math.random() * 14 
      : 75 + Math.random() * 24;

    const flagsList = [
      "Facial landmarks inconsistency", 
      "Irregular blinking patterns", 
      "Audio-visual sync mismatch", 
      "Metadata manipulation detected",
      "GAN generated texture artifacts",
      "Unnatural head movement",
      "Lighting inconsistency on face"
    ];

    const flags = status !== "authentic" 
      ? flagsList.sort(() => 0.5 - Math.random()).slice(0, Math.floor(Math.random() * 3) + 1)
      : [];

    return {
      id: Date.now(),
      filename: filename,
      uploadTime: new Date().toLocaleString(),
      status: status,
      confidence: parseFloat(confidence.toFixed(1)),
      type: isVideo ? "video" : "image",
      details: {
        faceSwap: Math.floor(Math.random() * 30) + 60,
        lipSync: Math.floor(Math.random() * 30) + 60,
        audioVisual: Math.floor(Math.random() * 30) + 60,
        temporal: Math.floor(Math.random() * 30) + 60,
        faceAnalysis: Math.floor(Math.random() * 30) + 60,
        metadata: Math.floor(Math.random() * 30) + 60,
        pixelAnalysis: Math.floor(Math.random() * 30) + 60,
      },
      flags: flags
    };
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAnalyzing(true);
      setResults(null);
      setTimeout(() => {
        setAnalyzing(false);
        setResults(generateRandomAnalysis(file.name)); 
      }, 3000);
    }
  };

  // Helper function to return text color class (Used in UI)
  const getStatusColor = (status: DetectionResult["status"]) => {
    switch (status) {
      case "authentic": return "text-green-500";
      case "suspicious": return "text-yellow-500";
      case "deepfake": return "text-red-500";
      default: return "text-gray-500";
    }
  };

  // Helper function to return icon component (Used in UI)
  const getStatusIcon = (status: DetectionResult["status"]) => {
    switch (status) {
      case "authentic": return <CheckCircle className="w-4 h-4" />;
      case "suspicious": return <AlertTriangle className="w-4 h-4" />;
      case "deepfake": return <Shield className="w-4 h-4" />;
      default: return <Eye className="w-4 h-4" />;
    }
  };

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <Scan className="text-primary" /> Deepfake Forensics
          </h1>
          <p className="text-muted-foreground">Advanced media analysis using DeepFace Ensemble v4</p>
        </div>
        <div className="flex gap-2">
          <Badge variant="outline" className="h-8 px-3 gap-2 bg-background/50">
            <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
            Engine Ready
          </Badge>
          <button className="flex items-center gap-2 px-3 py-1 bg-background/60 border border-border/20 text-xs rounded hover:bg-background/80 transition-colors">
            <RefreshCw className="w-3 h-3" /> Reset
          </button>
          <button className="flex items-center gap-2 px-3 py-1 bg-background/60 border border-border/20 text-xs rounded hover:bg-background/80 transition-colors">
            <Filter className="w-3 h-3" /> Filter
          </button>
          <button className="flex items-center gap-2 px-3 py-1 bg-background/60 border border-border/20 text-xs rounded hover:bg-background/80 transition-colors">
            <Download className="w-3 h-3" /> Export
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Main Analysis Area */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-black/40 backdrop-blur-xl border-dashed border-2 border-border/40 min-h-[400px] flex flex-col items-center justify-center relative overflow-hidden group hover:border-primary/50 transition-colors">
            
            {/* Background Grid Animation */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:24px_24px]"></div>

            <input
              type="file"
              accept="image/*,video/*"
              onChange={handleFileUpload}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-20"
            />

            {!analyzing && !results && (
              <div className="text-center z-10 space-y-4">
                <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto group-hover:scale-110 transition-transform duration-500">
                  <Upload className="w-10 h-10 text-primary" />
                </div>
                <div>
                  <h3 className="text-xl font-semibold">Drop Media Evidence Here</h3>
                  <p className="text-muted-foreground text-sm mt-2">Supports MP4, AVI, JPG, PNG (Max 500MB)</p>
                </div>
              </div>
            )}

            {analyzing && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/80 z-20">
                <div className="w-64 h-64 border border-primary/30 relative rounded-lg overflow-hidden mb-4">
                  {/* Scan Line */}
                  <div 
                    className="absolute w-full h-1 bg-primary/50 shadow-[0_0_15px_rgba(var(--primary),0.5)] z-10"
                    style={{ top: `${scanLinePosition}%` }}
                  />
                  <Binary className="w-full h-full text-primary/10 p-8" />
                </div>
                <div className="space-y-2 text-center">
                  <h3 className="text-xl font-mono text-primary animate-pulse">ANALYZING ARTIFACTS...</h3>
                  <p className="text-xs text-muted-foreground font-mono">Frame Extraction • Spectrum Analysis • GAN Detection</p>
                </div>
              </div>
            )}

            {results && !analyzing && (
              <div className="absolute inset-0 bg-background/95 p-8 z-10 flex flex-col w-full">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-xl font-bold">{results.filename}</h3>
                    <p className="text-sm text-muted-foreground">{results.type.toUpperCase()} • {results.uploadTime}</p>
                  </div>
                  {/* Using getStatusColor here to prevent unused variable error */}
                  <div className={`px-4 py-2 rounded-lg border flex items-center gap-2 ${
                    results.status === "deepfake" ? "bg-red-500/10 border-red-500" :
                    results.status === "suspicious" ? "bg-yellow-500/10 border-yellow-500" :
                    "bg-green-500/10 border-green-500"
                  } ${getStatusColor(results.status)}`}>
                    {/* Using getStatusIcon here to prevent missing name error */}
                    {getStatusIcon(results.status)}
                    <span className="font-bold tracking-wider">{results.status.toUpperCase()}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-6">
                  {Object.entries(results.details).map(([key, value]) => (
                    <div key={key} className="space-y-1">
                      <div className="flex justify-between text-xs uppercase text-muted-foreground">
                        <span>{key.replace(/([A-Z])/g, " $1")}</span>
                        <span>{value}%</span>
                      </div>
                      <div className="h-1.5 bg-secondary rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full ${value! > 80 ? "bg-red-500" : "bg-primary"}`} 
                          style={{ width: `${value}%` }}
                        />
                      </div>
                    </div>
                  ))}
                </div>

                <div className="mt-auto">
                  <h4 className="text-sm font-semibold mb-2">Detection Flags</h4>
                  <div className="flex flex-wrap gap-2">
                    {results.flags.length > 0 ? results.flags.map((flag, i) => (
                      <Badge key={i} variant="destructive" className="bg-red-500/10 text-red-500 border-red-500/20 hover:bg-red-500/20">
                        {flag}
                      </Badge>
                    )) : (
                      <Badge variant="outline" className="text-green-500 border-green-500/20">No Anomalies Detected</Badge>
                    )}
                  </div>
                </div>
              </div>
            )}
          </Card>
        </div>

        {/* Right Sidebar: History & Stats */}
        <div className="space-y-6">
          <Card className="bg-background/40 backdrop-blur-xl border-border/40 p-6">
            <h3 className="font-semibold mb-4 flex items-center gap-2">
              <Eye size={16} /> Live Detection Feed
            </h3>
            <div className="space-y-4">
              {[1,2,3].map((_, i) => (
                <div key={i} className="flex gap-3 items-center p-3 rounded-lg bg-background/50 border border-border/20">
                  <div className={`w-2 h-2 rounded-full ${i === 0 ? "bg-red-500" : "bg-green-500"}`} />
                  <div className="flex-1 overflow-hidden">
                    <p className="text-sm font-medium truncate">vid_evidence_{2492 + i}.mp4</p>
                    <p className="text-xs text-muted-foreground">{i === 0 ? "Deepfake (98%)" : "Authentic"}</p>
                  </div>
                  <span className="text-xs text-muted-foreground">{i * 5}m ago</span>
                </div>
              ))}
            </div>
          </Card>

          <div className="grid grid-cols-2 gap-4">
            <Card className="bg-background/40 border-border/40 p-4 text-center">
              <div className="text-2xl font-bold text-primary">1.2s</div>
              <div className="text-xs text-muted-foreground">Avg Latency</div>
            </Card>
            <Card className="bg-background/40 border-border/40 p-4 text-center">
              <div className="text-2xl font-bold text-primary">99.4%</div>
              <div className="text-xs text-muted-foreground">Accuracy</div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepfakePage;