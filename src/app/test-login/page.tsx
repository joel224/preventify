
'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PageHeader from '@/components/PageHeader';

export default function TestLoginPage() {
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLoginTest = async () => {
    setIsLoading(true);
    setMessage('');
    try {
      // Use the relative path which will be proxied by Next.js
      const response = await fetch('/api/test-login');
      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || 'An unknown error occurred.');
      }
      setMessage(`Success: ${data.message}`);
    } catch (error: any) {
      setMessage(`Error: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <PageHeader
        title="Eka Care Login Test"
        subtitle="Click the button to test the login credentials."
      />
      <div className="container mx-auto px-4 py-16 text-center">
        <div className="max-w-2xl mx-auto">
          <Button
            onClick={handleLoginTest}
            disabled={isLoading}
            className="mb-8"
            size="lg"
          >
            {isLoading ? 'Testing...' : 'Test Eka Care Login'}
          </Button>
          {message && (
            <Card>
              <CardHeader>
                <CardTitle>API Response</CardTitle>
              </CardHeader>
              <CardContent>
                <p
                  className={`text-lg font-mono ${
                    message.startsWith('Error')
                      ? 'text-red-500'
                      : 'text-green-500'
                  }`}
                >
                  {message}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </>
  );
}
