import PageContainer from '@/components/layout/page-container';

export const metadata = {
  title: 'Healthcare Dashboard - How to Use'
};

export default function HelpPage() {
  return (
    <PageContainer>
      <div className='space-y-4'>
        <h2 className='text-3xl font-bold tracking-tight'>How to Use</h2>
        <p className='text-muted-foreground'>
          Learn how to use the Healthcare Dashboard features effectively
        </p>
        <div className="mt-6 space-y-6">
          <div className="border rounded-lg p-6">
            <h3 className="text-xl font-semibold mb-3">Getting Started</h3>
            <p>This dashboard provides AI-powered healthcare analytics and assistance. Here's how to get started:</p>
            <ul className="list-disc pl-5 mt-3 space-y-2">
              <li>Use the <strong>Dashboard</strong> to view analytics and statistics</li>
              <li>The <strong>AI Assistant</strong> can help with clinical cases, medical literature, symptoms, and drug interactions</li>
              <li>Upload medical images for analysis in the Image Analysis section</li>
              <li>Generate personalized diet plans based on patient profiles</li>
            </ul>
          </div>
        </div>
      </div>
    </PageContainer>
  );
}