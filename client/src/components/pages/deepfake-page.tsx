import React, { useState, ChangeEvent } from "react";
import { Upload, Shield, AlertTriangle, CheckCircle, Eye, Camera, FileVideo, Download, RefreshCw, Filter } from "lucide-react";

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

  // Helper to generate random analysis to simulate the agent
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

    // Pick random flags if not authentic
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
      },
      flags: flags
    };
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setAnalyzing(true);
      setResults(null);
      // Simulate network latency and processing
      setTimeout(() => {
        setAnalyzing(false);
        setResults(generateRandomAnalysis(file.name)); 
      }, 2500);
    }
  };

  const getStatusColor = (status: DetectionResult["status"]) => {
    switch (status) {
      case "authentic": return "text-green-500 dark:text-green-400";
      case "suspicious": return "text-yellow-500 dark:text-yellow-400";
      case "deepfake": return "text-red-500 dark:text-red-400";
      default: return "text-text-500 dark:text-text-400";
    }
  };

  const getStatusBg = (status: DetectionResult["status"]) => {
    switch (status) {
      case "authentic": return "bg-green-500/20 dark:bg-green-500/20";
      case "suspicious": return "bg-yellow-500/20 dark:bg-yellow-500/20";
      case "deepfake": return "bg-red-500/20 dark:bg-red-500/20";
      default: return "bg-background/20 dark:bg-background/20";
    }
  };

  const getStatusIcon = (status: DetectionResult["status"]) => {
    switch (status) {
      case "authentic": return <CheckCircle className="w-3 h-3" />;
      case "suspicious": return <AlertTriangle className="w-3 h-3" />;
      case "deepfake": return <Shield className="w-3 h-3" />;
      default: return <Eye className="w-3 h-3" />;
    }
  };

  const getConfidenceBarColor = (confidence: number) => {
    if (confidence > 90) return "bg-red-500";
    if (confidence > 70) return "bg-yellow-500";
    return "bg-green-500";
  };

  return (
    <div className="min-h-screen">
      {/* Header */}
      <div className="px-8 py-4">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-text-900 dark:text-text-100 mb-1 mt-3">Deepfake Detector Agent</h1>
            <p className="text-text-600 dark:text-text-400 text-sm">
              Live Connection: <span className="text-green-500 font-mono">ONLINE</span> • Model: DeepFace-Ensemble-v4
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-lg shadow-xl border border-border/20 text-sm text-text-700 dark:text-text-300 rounded-lg hover:bg-background/80 transition-colors">
              <RefreshCw className="w-4 h-4" />
              Reset Agent
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-lg shadow-xl border border-border/20 text-sm text-text-700 dark:text-text-300 rounded-lg hover:bg-background/80 transition-colors">
              <Filter className="w-4 h-4" />
              Filter
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-background/60 backdrop-blur-lg shadow-xl border border-border/20 text-sm text-text-700 dark:text-text-300 rounded-lg hover:bg-background/80 transition-colors">
              <Download className="w-4 h-4" />
              Export
            </button>
          </div>
        </div>
      </div>

      <div className="px-8 pb-6">
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">
          {/* Upload & Analysis Section */}
          <div className="xl:col-span-2">
            <div className="bg-background/60 backdrop-blur-lg rounded-lg border border-border/20 p-5">
              <div className="flex items-center gap-2 mb-3">
                <Upload className="w-5 h-5 text-text-900 dark:text-text-100" />
                <h2 className="text-lg font-medium text-text-900 dark:text-text-100">Media Upload & Analysis</h2>
              </div>
              <p className="text-sm text-text-600 dark:text-text-400 mb-4">Upload content to trigger the Deepfake Detection Agent</p>
              
              <div className="border-2 border-dashed border-border/20 rounded-lg p-8 text-center hover:border-primary-600 transition-colors mb-4 cursor-pointer relative">
                <input
                  type="file"
                  accept="image/*,video/*"
                  onChange={handleFileUpload}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                  id="file-upload"
                />
                <div className="flex flex-col items-center gap-3 pointer-events-none">
                  {analyzing ? (
                    <RefreshCw className="w-10 h-10 text-primary-600 animate-spin" />
                  ) : (
                    <>
                      <Camera className="w-10 h-10 text-text-500 dark:text-text-400" />
                      <div>
                        <p className="text-text-900 dark:text-text-100 font-medium mb-1">
                          Click to upload or drag and drop
                        </p>
                        <p className="text-text-600 dark:text-text-400 text-sm">
                          Images: JPG, PNG • Videos: MP4, AVI
                        </p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              {analyzing && (
                <div className="p-4 bg-background/60 backdrop-blur-lg border border-border/20 rounded-lg mb-4 space-y-2">
                  <div className="flex items-center gap-3">
                    <RefreshCw className="w-4 h-4 animate-spin text-primary-600" />
                    <p className="font-medium text-text-900 dark:text-text-100 text-sm">Agent is analyzing content...</p>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-1.5 dark:bg-gray-700">
                    <div className="bg-primary-600 h-1.5 rounded-full animate-progress" style={{width: "60%"}}></div>
                  </div>
                  <p className="text-xs font-mono text-text-500">
                    {">"} Extracting frames... <br/>
                    {">"} Running Convolutional Neural Network... <br/>
                    {">"} Checking audio spectrum...
                  </p>
                </div>
              )}

              {results && (
                <div className="border border-border/20 rounded-lg p-4 bg-background/60 backdrop-blur-lg animate-in fade-in slide-in-from-bottom-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      {results.type === "video" ? <FileVideo className="w-4 h-4" /> : <Camera className="w-4 h-4" />}
                      <span className="font-medium text-text-900 dark:text-text-100 text-sm">{results.filename}</span>
                    </div>
                    <div className={`px-2 py-1 rounded text-xs font-medium flex items-center gap-1 ${getStatusColor(results.status)} ${getStatusBg(results.status)}`}>
                      {getStatusIcon(results.status)}
                      {results.status.toUpperCase()}
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <p className="text-xs text-text-600 dark:text-text-400 mb-1">AI Confidence</p>
                      <div className="flex items-center gap-2">
                        <div className="text-lg font-semibold text-text-900 dark:text-text-100">{results.confidence}%</div>
                        <div className="flex-1 bg-border/40 rounded-full h-1.5">
                          <div 
                            className={`h-1.5 rounded-full ${getConfidenceBarColor(results.confidence)}`}
                            style={{ width: `${results.confidence}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                    <div>
                      <p className="text-xs text-text-600 dark:text-text-400 mb-1">Upload Time</p>
                      <p className="text-xs text-text-900 dark:text-text-100">{results.uploadTime}</p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <p className="text-xs text-text-600 dark:text-text-400 mb-2">Vector Analysis Details</p>
                    <div className="grid grid-cols-2 gap-2">
                      {Object.entries(results.details).map(([key, value]) => (
                        <div key={key} className="bg-background/40 p-2 rounded border border-border/10">
                          <div className="flex justify-between items-center mb-1">
                            <span className="text-xs text-text-600 dark:text-text-400 capitalize">{key.replace(/([A-Z])/g, " $1")}</span>
                            <span className="text-xs font-medium text-text-900 dark:text-text-100">{value}%</span>
                          </div>
                          <div className="w-full bg-border/40 rounded-full h-1">
                            <div 
                              className={`h-1 rounded-full ${value && value > 90 ? "bg-red-500" : value && value > 70 ? "bg-yellow-500" : "bg-green-500"}`}
                              style={{ width: `${value}%` }}
                            ></div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {results.flags.length > 0 && (
                    <div>
                      <p className="text-xs text-text-600 dark:text-text-400 mb-2">Agent Flags</p>
                      <div className="space-y-1">
                        {results.flags.map((flag, index) => (
                          <div key={index} className="flex items-center gap-2 text-xs bg-red-500/10 text-red-500 dark:text-red-400 p-2 rounded border border-red-500/20">
                            <AlertTriangle className="w-3 h-3" />
                            {flag}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* Detection Stats */}
          <div className="xl:col-span-1">
            <div className="bg-background/60 backdrop-blur-lg rounded-lg border border-border/20 p-5 mb-5">
              <h2 className="text-lg font-medium text-text-900 dark:text-text-100 mb-4">Live Agent Stats</h2>
              
              <div className="space-y-3">
                <div className="p-3 bg-background/40 rounded border border-border/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-text-900 dark:text-text-100 font-medium text-sm">Queue Status</span>
                    <span className="text-xs text-green-500 animate-pulse">Processing</span>
                  </div>
                  <div className="text-xs text-text-500">3 files pending analysis</div>
                </div>

                <div className="p-3 bg-background/60 backdrop-blur-lg rounded border border-border/20">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-text-900 dark:text-text-100 font-medium text-sm">Total Deepfakes</span>
                    <span className="text-xl font-semibold text-text-900 dark:text-text-100">24</span>
                  </div>
                  <div className="text-xs text-red-500">+1 detected just now</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeepfakePage;