// src/lib/initialize-analytics.ts
import fs from 'fs';
import path from 'path';

export function initializeAnalyticsFile() {
  const dataDir = path.join(process.cwd(), 'data');
  const analyticsFile = path.join(dataDir, 'analytics.csv');
  
  // Create data directory if it doesn't exist
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
  
  // Create analytics file with headers if it doesn't exist
  if (!fs.existsSync(analyticsFile)) {
    const headers = ['timestamp', 'eventType', 'agentType', 'userId', 'sessionId', 'metadata'];
    fs.writeFileSync(analyticsFile, headers.join(',') + '\n');
    console.log('Initialized analytics file');
  }
}