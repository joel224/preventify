
import { Suspense } from 'react';
import DoctorsPageClient from './DoctorsPageClient';
import { Loader2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

// This is now a Server Component
export default function DoctorsPage() {
  return (
    <>
      <PageHeader
        title="Our Medical Professionals"
        subtitle="Meet the expert tech-enabled doctors who provide quality care at Preventify"
      />
      <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>}>
        <DoctorsPageClient />
      </Suspense>
    </>
  );
}
