import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import type { PatientProfile } from '@/lib/types';
import { Separator } from './ui/separator';

interface PatientProfileCardProps {
  patient: PatientProfile;
}

const ProfileDetail = ({ label, value }: { label: string, value: string }) => (
  <div>
    <p className="text-xs text-muted-foreground">{label}</p>
    <p className="font-semibold">{value}</p>
  </div>
)

export default function PatientProfileCard({ patient }: PatientProfileCardProps) {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="flex flex-col items-center text-center">
            <Image
              src="/tg.png"
              alt="Patient Photo"
              width={100}
              height={100}
              className="rounded-full object-cover"
              data-ai-hint="person face"
            />
            <h2 className="text-xl font-bold mt-4">{patient.name}</h2>
            <p className="text-muted-foreground">{patient.email}</p>
            <Button variant="outline" size="sm" className="mt-4">Edit Profile</Button>
          </div>
          <Separator orientation="vertical" className="h-auto mx-4 hidden md:block" />
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-x-8 gap-y-6 flex-1 w-full">
            <ProfileDetail label="Sex" value={patient.sex} />
            <ProfileDetail label="Age" value={patient.age.toString()} />
            <ProfileDetail label="Blood" value={patient.bloodType} />
            <ProfileDetail label="Status" value={patient.status} />
            <ProfileDetail label="Department" value={patient.department} />
            <ProfileDetail label="Registered Date" value={patient.registeredDate} />
            <ProfileDetail label="Appointment" value={patient.appointment.toString()} />
            <ProfileDetail label="Bed Number" value={patient.bedNumber} />
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
