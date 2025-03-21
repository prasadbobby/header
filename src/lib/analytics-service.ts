// src/lib/analytics-service.ts
export async function trackEvent(data: {
    eventType: 'message' | 'session' | 'booking' | 'image_analysis';
    agentType: 'clinical' | 'literature' | 'symptom' | 'drug' | 'image' | 'general';
    sessionId?: string;
    metadata?: any;
  }) {
    try {
      const response = await fetch('/api/analytics/track', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      
      if (!response.ok) {
        console.error('Error tracking analytics:', response.status);
      }
      
      return response.ok;
    } catch (error) {
      console.error('Failed to track analytics:', error);
      return false;
    }
  }
  
  export async function getAnalyticsSummary() {
    try {
      const response = await fetch('/api/analytics/track', {
        method: 'GET',
        cache: 'no-store'
      });
      
      if (!response.ok) {
        throw new Error(`Error fetching analytics: ${response.status}`);
      }
      
      const data = await response.json();
      return data.data;
    } catch (error) {
      console.error('Failed to fetch analytics summary:', error);
      return {
        totalSessions: 0,
        messagesByAgent: {
          clinical: 0,
          literature: 0,
          symptom: 0,
          drug: 0,
          image: 0,
          general: 0
        },
        bookings: 0,
        imageAnalyses: 0
      };
    }
  }