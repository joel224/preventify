
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';

export default function TestLoginPage() {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTest = async () => {
    setIsLoading(true);
    setData(null);
    setError('');
    try {
      // Use the relative path which will be proxied by Next.js
      const response = await fetch('/api/doctors-and-clinics');
      const responseData = await response.json();
      if (!response.ok) {
        throw new Error(responseData.error || 'An unknown error occurred.');
      }
      setData(responseData);
    } catch (error: any) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Eka Care API Test"
        subtitle="Click the button to fetch doctors and clinics."
      />
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={handleTest}
            disabled={isLoading}
            className="mb-8"
            size="lg"
          >
            {isLoading ? 'Fetching Data...' : 'Fetch Doctors & Clinics'}
          </Button>
          {error && (
            <Card>
              <CardHeader>
                <CardTitle>API Error</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-mono text-red-500">
                  {error}
                </p>
              </CardContent>
            </Card>
          )}
          {data && (
            <Card>
              <CardHeader>
                <CardTitle>API Response</CardTitle>
              </CardHeader>
              <CardContent className="text-left">
                <pre className="p-4 bg-gray-100 rounded-md overflow-x-auto text-sm">
                  {JSON.stringify(data, null, 2)}
                </pre>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
