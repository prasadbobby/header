// src/app/api/analytics/track/route.ts
import { NextRequest, NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import { parse, stringify } from 'csv/sync';

// Define analytics data structure
export interface AnalyticsEvent {
  timestamp: string;
  eventType: 'message' | 'session' | 'booking' | 'image_analysis';
  agentType: 'clinical' | 'literature' | 'symptom' | 'drug' | 'image' | 'general';
  userId?: string;
  sessionId?: string;
  metadata?: string;
}

// Path for analytics CSV
const ANALYTICS_FILE = path.join(process.cwd(), 'data', 'analytics.csv');

// Ensure directory exists
const ensureDirectoryExists = () => {
  const dir = path.dirname(ANALYTICS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

// Initialize file if needed
const initializeFile = () => {
  if (!fs.existsSync(ANALYTICS_FILE)) {
    const headers = ['timestamp', 'eventType', 'agentType', 'userId', 'sessionId', 'metadata'];
    fs.writeFileSync(ANALYTICS_FILE, headers.join(',') + '\n');
  }
}

export async function POST(req: NextRequest) {
  try {
    // Parse request
    const data = await req.json();
    
    // Validate required fields
    if (!data.eventType || !data.agentType) {
      return NextResponse.json(
        { status: 'error', message: 'Missing required fields: eventType and agentType' },
        { status: 400 }
      );
    }
    
    // Prepare event record
    const event: AnalyticsEvent = {
      timestamp: new Date().toISOString(),
      eventType: data.eventType,
      agentType: data.agentType,
      userId: data.userId || 'anonymous',
      sessionId: data.sessionId || '',
      metadata: data.metadata ? JSON.stringify(data.metadata) : ''
    };
    
    // Ensure directory and file exist
    ensureDirectoryExists();
    initializeFile();
    
    // Append to CSV
    const csvLine = [
      event.timestamp,
      event.eventType,
      event.agentType,
      event.userId,
      event.sessionId,
      event.metadata
    ].join(',') + '\n';
    
    fs.appendFileSync(ANALYTICS_FILE, csvLine);
    
    return NextResponse.json({ status: 'success' });
  } catch (error: any) {
    console.error('Error tracking analytics:', error);
    return NextResponse.json(
      { status: 'error', message: error.message || 'Failed to track analytics' },
      { status: 500 }
    );
  }
}

// GET endpoint to retrieve analytics summary
export async function GET(req: NextRequest) {
  try {
    // Check if file exists
    if (!fs.existsSync(ANALYTICS_FILE)) {
      return NextResponse.json({ 
        status: 'success',
        data: {
          totalSessions: 0,
          messagesByAgent: {},
          bookings: 0,
          imageAnalyses: 0
        }
      });
    }
    
    // Read file
    const fileContent = fs.readFileSync(ANALYTICS_FILE, 'utf-8');
    const records = parse(fileContent, { columns: true });
    
    // Aggregate data
    const totalSessions = records.filter((r: any) => r.eventType === 'session').length;
    const bookings = records.filter((r: any) => r.eventType === 'booking').length;
    const imageAnalyses = records.filter((r: any) => r.eventType === 'image_analysis').length;
    
    // Count messages by agent type
    const messagesByAgent: Record<string, number> = {};
    records.filter((r: any) => r.eventType === 'message').forEach((record: any) => {
      const agent = record.agentType;
      messagesByAgent[agent] = (messagesByAgent[agent] || 0) + 1;
    });
    
    return NextResponse.json({
      status: 'success',
      data: {
        totalSessions,
        messagesByAgent,
        bookings,
        imageAnalyses
      }
    });
  } catch (error: any) {
    console.error('Error fetching analytics:', error);
    return NextResponse.json(
      { status: 'error', message: error.message || 'Failed to fetch analytics' },
      { status: 500 }
    );
  }
}