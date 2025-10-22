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
      const response = await fetch('/api/doctors-and-clinics');
      const responseData = await response.json();
      
      // This is the critical fix:
      // We only throw an error if the entire response failed (e.g., 500 error from the server).
      // If the response is OK but contains an error message inside (e.g. from one failed doctor),
      // we can still display the data that was successfully fetched.
      if (!response.ok) {
        // The message will be in responseData.message if the backend sent a structured error
        throw new Error(responseData.message || `HTTP error! status: ${response.status}`);
      }

      // If the backend sends an error property even on a 200 response, handle it here.
      if (responseData.error) {
        setError(responseData.error);
      }
      
      // Always set the data so we can see what was successfully processed.
      setData(responseData);

    } catch (error: any) {
      setError(error.message);
      // Clear data if the whole request fails
      setData(null);
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
            <Card className="mb-8 border-red-500">
              <CardHeader>
                <CardTitle className="text-red-600">API Error</CardTitle>
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
                <CardTitle>API Response (Successfully Fetched Data)</CardTitle>
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
