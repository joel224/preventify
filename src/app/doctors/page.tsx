// src/app/doctors/page.tsx
import { Suspense } from 'react';
import dynamic from 'next/dynamic'; // Import dynamic from next/dynamic
import { Loader2 } from 'lucide-react';
import PageHeader from '@/components/PageHeader';

// Crucial: We use next/dynamic with ssr: false.
// This prevents the build server from trying to render the client component,
// avoiding the crash that causes the "missing root layout" error.
const DoctorsPageClient = dynamic(
  () => import('./DoctorsPageClient'),
  { 
    ssr: false,
    loading: () => (
      <div className="flex justify-center items-center h-64">
        <Loader2 className="h-16 w-16 animate-spin text-primary" />
      </div>
    )
  }
);

export const dynamicMode = 'force-dynamic';

export default function DoctorsPage() {
  return (
    <>
      <PageHeader
        title="Our Medical Professionals"
        subtitle="Meet the expert tech-enabled doctors who provide quality care at Preventify"
      />
      {/* We keep the Suspense boundary as a best practice, though dynamic handles the loading state too */}
      <Suspense fallback={<div className="flex justify-center items-center h-screen"><Loader2 className="h-16 w-16 animate-spin text-primary" /></div>}>
        <DoctorsPageClient />
      </Suspense>
    </>
  );
}